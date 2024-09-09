Cumming bei github:
https://github.com/TryCatchLearn/next-match

# React hook form

nextui creating a theme:
https://nextui.org/docs/customization/create-theme

npm i react-hook-form zod @hookform/resolvers

react-hook-form
https://www.react-hook-form.com/get-started#Registerfields

zod
https://zod.dev/

# NextAuth v5

https://authjs.dev/getting-started/installation
npm install next-auth@beta

danach richtet sich Cummings nach:
https://www.authjs.cn/guides/upgrade-to-v5
Erstellen von auth.ts in src/ und einfügen von:

```js
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const {
handlers: { GET, POST },
auth,
} = NextAuth({
providers: [GitHub],
})

Erstellen von api/auth/[...nextauth]/route.ts in app und einfügen von:
export { GET, POST } from "./auth"
```

Jetzt gehts zum Adaptr für Prisma:
https://authjs.dev/getting-started/adapters/prisma
Installieren:
npm install @prisma/client @auth/prisma-adapter
wegen edge compatibility
https://authjs.dev/guides/edge-compatibility
erstelle und füge ein:

```js
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub],
} satisfies NextAuthConfig
```

Der Code von auth.ts wird dann überschrieben mit:

```js
import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
```

Die Zeile mit den handler in auth.ts wird überschrieben mit

```js
export const { handlers: { GET, POST }, auth } = NextAuth({
```

Dann wird prisma weiter initiialisiert:
npx prisma init

Nach Fertigstellung werden folgende Infos gegeben:
✔ Your Prisma schema was created at prisma/schema.prisma

# Prisma ORM

in lib wird die Datei prisma.ts erstellt. Dies geschieht für den dev-mode, damit nicht

anschließende muss auth.ts modifziziert werden:
statt:

```js
import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

const prisma = new PrismaClient()

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
```

heißt es jetzt:

```js
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
```

in prisma/schema.prisma wird folgender Code eingefügt:

```js
datasource db ...
```

Achtung: passwordHash String wurde zum von Auth/PrismaAdapter vorgegebenen Schema hinzugefügt

npx prisma generate

npx prisma db push

Läuft es? Installiere:
npx prisma studio
Prisma Studio is up on http://localhost:5555

Register the first:
in app/ wird eine ordner actions und darin die Datei authActions.ts angelegt:
actions/authActions.ts

Dann wird bcrypt installiert:
npm install bcryptjs
dazu die Typen:
npm install -D @types/bcryptjs

In authActions.ts kommt zunächst folgender Code:

```js
"use server"

import { prisma } from "@/lib/prisma"
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema"
import bcrypt from "bcryptjs"

export async function registerUser(data: RegisterSchema) {
  const validated = registerSchema.safeParse(data)

  if (!validated.success) {
    return { error: validated.error.errors }
  }

  const { name, email, password } = validated.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) return { error: "User already exists!" }

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  })
}
```

# Error handling

Erstellen von types/index.d.ts
Der Typ lautet:

```js

```

Dann muss so register User geändert werden, dass es dem Typ entspricht:

```js
export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
// User kommt von prisma.client
// und alle returns müssen der Form entsprechen:
  if (!validated.success) {
    return { status: 'error', error: validated.error.errors }
  }
```

In der Ausgabe werden noch Veränderungen vorgenommen:

```js
            {errors.root?.serverError && <p className="text-danger text-sm">{errors.root.serverError.message}</p>}
            <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color="secondary" type="submit">
              Register
            </Button>

            // und im Aufruf:

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })
```

# login / logout

Jetzt wird der Login anvisiert:

- ein Tostifiy Funktion wird installiert:
  nmp install react-tostify

Toastify wird gewrappt:

```js
"use client"

import { NextUIProvider } from "@nextui-org/react"
import React, { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar className="z-50" />
      {children}
    </NextUIProvider>
  )
}
```

In authAction.ts werden Funtionen hinzugefügt:

```js
"use server"

import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { LoginSchema } from "@/lib/schemas/loginSchema"
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema"
import { ActionResult } from "@/types"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    console.log(result)

    return { status: "success", data: "Logged in" }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" }
        default:
          return { status: "error", error: "Something went wrong" }
      }
    } else {
      return { status: "error", error: "Something else went wrong" }
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" })
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data)

    if (!validated.success) {
      return { status: "error", error: validated.error.errors }
    }

    const { name, email, password } = validated.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) return { status: "error", error: "User already exists" }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    })

    return { status: "success", data: user }
  } catch (error) {
    console.log(error)
    return { status: "error", error: "Something went wrong" }
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}
```

Außerdem wird ein Zugriff auf die session über auth auf home gegeben:

```js
import { auth, signOut } from "@/auth"
import { Button } from "@nextui-org/react"
import { FaRegSmile } from "react-icons/fa"

export default async function Home() {
  const session = await auth()

  return (
    <div>
      <h1 className="text-3xl">Hello app!</h1>

      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              "use server"

              await signOut()
            }}
          >
            <Button type="submit" color="primary" variant="bordered" startContent={<FaRegSmile size={20} />}>
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  )
}
```

# Using NexAuth Callbacks

Nr. 33 ggf. noch mal gucken, soweit ich mich erinnere gab es hier die Möglichkeit UserRoles einzurichten

```js
// auth.ts

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true, // Füge diesen Parameter hinzu
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      console.log(session)
      console.log(token)

      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
```

# DropDownmenu mit Avatar, Logout Function und SignedIn Person

# Middleware
