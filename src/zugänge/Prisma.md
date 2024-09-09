# Datenbankzugriff in placesmysqlnew auf netcup:

```js
# .env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# DATABASE_URL="mysql://root:@localhost:/placesmysqlnew"
# DATABASE_URL="mysql://k175781_eckihag:maa6N610$@202.61.232.62:3306/k175781_testingnetcups"
DATABASE_URL="mysql://k175781_bnplaces:bC3904%fc@202.61.232.62/k175781_placesmysqlnew"
# Scheinbar geht das auch ohne Port 3306!!!
# Die Adresse 10.35.232.62:3306 gilt nur intern, die obige Adresse ist dem Hauptprodukt entnommen."
AUTH_SECRET="00ff2d3b5c0395f3ce9c8c2fa526020f"
# AUTH_SECRET:
# https://authjs.dev/getting-started/deployment#environment-variables
# you can also use a tool like http://generate-secret.vercel.app to generate a random value.

```

```js
# lib/db.ts

import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

```

```js
# schema.prisma

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

enum UserRole {
  ADMIN
  USER
  NEWBIE
}


model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  created       DateTime    @default(now())
  role          UserRole @default(NEWBIE)
  // isTwoFactorEnabled Boolean @default(false)
  // twoFactorConfirmation TwoFactorConfirmation?
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  @@unique([provider, providerAccountId])
}




// Subject model
model Subjects {
  id              String         @id @default(cuid())
  title           String
  image           String
  description     String     @db.Text
  creator         String         // Assuming creator is the ID of the User
  created         DateTime    @default(now())
  ord             DateTime    @default(now())
  group           String
}



// Place model
model Places {
  id              String       @id @default(cuid())
  title           String
  description     String     @db.Text
  image           String
  address         String
  location_lat    Float
  location_lng    Float
  creator         String      // Assuming creator is the ID of the User
  creatorsubject  String      // Assuming creatorsubject is the ID of the Subject
  created         DateTime    @default(now())
}

model Pics {
  id              String         @id @default(cuid())
  copyright       String?
  title           String?
  description     String?     @db.Text
  image           String
  belongstoid     String         // Assuming belongstoid is the ID of the Place
  created         DateTime    @default(now())
  ord             Int         @default(0)
  video           Boolean     @default(false)
}






```

# Prisma aus Datenbanken.md

Prisma docs: https://www.prisma.io/docs

AuthJs Prisma Schema: https://authjs.dev/reference/adapter/prisma

AuhJs Prisma MySql: https://www.prisma.io/docs/orm/overview/databases/mysql

npx prisma generate

npx prisma db push

npm i @auth/prisma-adapter

npm i bcrypt

npm i -D @types/bcrypt

- alternativ:

npm i bcryptjs

npm install -D @types/bcryptjs

npm install next-auth @beta

On the edge prisma-adapter cannot be used in the middleware.ts.

Dehalb braucht es eine auth.config.ts

npx prisma studio

- nach Änderung des Schemas:

npx prisma generate

npx prisma migrate reset

npx prisma db push
