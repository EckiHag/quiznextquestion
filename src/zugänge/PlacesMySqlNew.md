[Installation - Tailwind CSS](https://tailwindcss.com/docs/installation)

Hier dokumentiere ich die npm von placesmysqlnew:

- npm install -D tailwindcss
- npx tailwindcss init
- leeren global.css
- ersetzen von page.js:

  ```js
  import Tmp from "@/components/Tmp"

  const HomePage = () => {
    return (
      <div>
        <div className="m-12 text-lg font-bold bg-amber-500">HomePage</div>
        <Tmp />
      </div>
    )
  }

  export default HomePage
  ```

Installieren mit DaisyUi

- npm install -D tailwindcss
  npx tailwindcss init
- npm i @tailwindcss/typography
- npm i -D daisyui@latest
- plugins: [require('@tailwindcss/typography'), require('daisyui')]
- Beautiful toasts siehe SmilgaTasks
- npm i react-icons
- npx shadcn-ui@latest add form
- npx shadcn-ui@latest add input
- npm install bcrypt --save / bcryptjs
- npm install -D @types/bcrypt / bcryptjs :das ist für types, wenn sie gebraucht werden für typescript / -D bedeutet: für devDependencies
- npm i -D prisma
- npm i @prisma/client
- npx prisma init
- npx prisma generate
- npx prisma db push
- npx prisma studio
- homepage auth: go to authjs (https://authjs.dev/getting-started/introduction) not nextauthjs: man braucht von dieser Seite einen Databaseadapter für prisma, dieser wird installiert über:
- npm install @prisma/client @auth/prisma-adapter
- npm install next-auth oder muss es noch next-auth@beta sein? beta habe ich für placesmysqlnew installiert
- prisma doesn't support the edge, was heißt das?
- unter dieser Adresse kann man die Credentials sehen: http://localhost:3000/api/auth/providers
- AUTH_SECRET:
- https://authjs.dev/getting-started/deployment#environment-variables
- you can also use a tool like http://generate-secret.vercel.app to generate a random value.
- [...next-auth] = "catchall" folders and subfolders? in authjs look for "edge compability" - prisma does not work on the edge, deshalb benötigt man auth.config.ts - d.h. die middleware kann nicht mit prisma arbeiten weil sie on the edge arbeitet, aber mit sie kann mit auth.config arbeiten und das ist die Lösung für das Problem.
- ca. 40:48 im Film über auth wird auch der error angezeigt

#### Shadcnui

https://ui.shadcn.com/

#### Textgrößen

- sp className="text-xs">Kleiner Text</p>
- p className="text-base">Normaler Text</p>
- p className="text-lg">Großer Text</p>
- p className="text-8xl">Extrem großer Text
- p className="text-3xl">Sehr großer Text
- p className="text-lg md:text-xl lg:text-2xl">Großer Text auf Desktop, mittel auf Tablet und klein auf Handy</p>

Text fett

```js
<p class="font-light ...">The quick brown fox ...</p>
<p class="font-normal ...">The quick brown fox ...</p>
<p class="font-medium ...">The quick brown fox ...</p>
<p class="font-semibold ...">The quick brown fox ...</p>
<p class="font-bold ...">The quick brown fox ...</p>
```

#### Link / Button

```js
<Link href="/texte">
  <button className="ml-8 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Texte</button>
</Link>
```
