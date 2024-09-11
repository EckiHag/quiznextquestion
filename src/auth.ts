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

    async jwt({ token, user }) {
      // Wenn der Benutzer existiert, Rolle aus der Datenbank abfragen und dem Token hinzufügen
      if (user) {
        const userFromDb = await prisma.user.findUnique({
          where: { id: user.id },
        })
        token.role = userFromDb?.role || "user" // Standard auf "user" setzen, wenn keine Rolle vorhanden ist
      }
      return token
    },
  
    async session({ token, session }) {
      // Füge die Rolle zur Session hinzu
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as string // Typ-Assertion, um sicherzustellen, dass role ein string ist
      }
      console.log("session: ", session)
      return session
    },



  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
 