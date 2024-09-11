import React from "react"
import { Button } from "@nextui-org/button"
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar"
import Link from "next/link"
import { auth } from "@/auth"

export default async function NavbarQuiz() {
  const session = await auth()

  return (
<nav className="bg-gray-800 p-4">
  <div className="container mx-auto flex justify-between items-center">
    <a href="/" className="text-white font-bold text-xl">
      Navbar
    </a>
    <a href="/showlogin" className="text-white font-semibold text-small">
    {session ? `${session.user.email} as ${session.user.role}` : "Not logged in"}
    </a>
    <div className="flex items-center space-x-4">
      <a href="/kirchenjahr" className="text-gray-300 hover:text-white">
        Kirchenjahr
      </a>
      <a href="/thesomat" className="text-gray-300 hover:text-white">
        Thesomat
      </a>
      <div className="flex items-center space-x-3"> {/* Abstand von 12px (space-x-3 entspricht 0.75rem oder 12px) */}
        <Button as={Link} href="/login" variant="bordered" className="text-white">
          Login
        </Button>
        <Button as={Link} href="/register" variant="bordered" className="text-white">
          Register
        </Button>
      </div>
    </div>
  </div>
</nav>

  )
}
