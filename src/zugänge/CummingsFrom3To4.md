### Section 4: Building the UI

https://github.com/TryCatchLearn/next-match/tree/4c406bad7d1d4e6c0a93532973d919442e6338d7

# Ergänzung des prisma Schemas lt. Datei

npx prisma generate
npx prisma db push
npx prisma studio

Hier ist das alte Schema:

```js
//  EofSection3
// model User {
//   id            String          @id @default(cuid())
//   name          String?
//   username      String?         @unique
//   email         String?         @unique
//   emailVerified DateTime?
//   passwordHash  String
//   image         String?
//   accounts      Account[]

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// model Account {
//   id                       String  @id @default(cuid())
//   userId                   String  @unique
//   type                     String
//   provider                 String
//   providerAccountId        String
//   refresh_token            String? @db.Text
//   access_token             String? @db.Text
//   expires_at               Int?
//   token_type               String?
//   scope                    String?
//   id_token                 String? @db.Text
//   session_state            String?
//   refresh_token_expires_in Int?
//   user                     User?   @relation(fields: [userId], references: [id])

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@unique([provider, providerAccountId])
//   @@index([userId])
// }

//  EofSection4
```

# Seeding the data

Zwei neue Dateien werden erzeugt in prisma/:
membersData.ts
seed.ts
dann aufrufen:
npm i -D ts-node

npx prisma db seed

# Fetching Data from the database using serveractions

memberActions.ts wird in /actions erstellt
members/page.tsx wird modifiziert
Und die Namen werden ausgegeben.

# Update auf dem Server

assets wurde über /assets in .gitignore ausgeschlossen
Löschen der Seed-Dateien.
Löschen in package.json: "prisma": {
"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
Auf dem Server musste "npx prisma generate" ausgeführt werden.
"trustHost: true" ist auth.ts noch enthalten.

# Memberscard

Erstellen des Code in /member

Einfügen von

```js
  theme: {
    extend: {
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
      }
    },
  },
```

in tailwind.config.ts

npm install date-fns // für die Errechnung des aktuellen Alters
Erstellen von util.ts in lib

```js
import { differenceInYears } from "date-fns"

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob)
}
```

tailwind ist responsive first, deshalb:

```js
return <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">{members && members.map((member) => <MemberCard member={member} key={member.id} />)}</div>
```

# Dynamic routes sidebar (45-47)

siehe Dateien in /members

# Creating the member detailed content (photos, chat) (48)

# Adding loading indicators (49)

loading.tsx

# Adding a custom error-page error-handling (50)

error.tsx
Eine error.tsx wird auf der Ebene von loading.tsx, layout.tsx und page.tsx erstellt.
Darin wird der Code von
https://nextjs.org/docs/app/building-your-application/routing/error-handling
übernommen und modifiziert.

```js

```
