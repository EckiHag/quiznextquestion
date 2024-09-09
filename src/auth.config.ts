// auth.config.ts
import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./lib/schemas/loginSchema"
import { getUserByEmail } from "./app/actions/authActions"
import { compare } from "bcryptjs"

export default {
    providers: [
      Credentials({
        name: "credentials",
        async authorize(creds) {
          const validated = loginSchema.safeParse(creds)
  
          if (validated.success) {
            const { email, password } = validated.data
  
            const user = await getUserByEmail(email)
  
            if (!user || !(await compare(password, user.passwordHash ?? ""))) return null
            // if (!user || !(await compare(password, user.passwordHash))) return null
  
    // // Überprüfen, ob user.passwordHash ein String ist, bevor es an compare übergeben wird
    // if (!user || !user.passwordHash || typeof user.passwordHash !== "string") return null


            return user
          }
  
          return null
        },
      }),
    ],
  } satisfies NextAuthConfig
  