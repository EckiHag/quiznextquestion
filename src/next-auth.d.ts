import NextAuth from "next-auth"
import { DefaultSession, DefaultUser } from "next-auth"

// Erweiterung des `Session`-Objekts, um die Rolle hinzuzufügen
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string // Rolle explizit als string deklarieren
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: string // Rolle explizit als string deklarieren
  }
}
