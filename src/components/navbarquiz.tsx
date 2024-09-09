import React from "react"
import { Button } from "@nextui-org/button"
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar"
import Link from "next/link"

export default function NavbarQuiz() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white font-bold text-xl">
          Navbar
        </a>
        <div className="space-x-4">
          <a href="/kirchenjahr" className="text-gray-300 hover:text-white">
            Kirchenjahr
          </a>
          <a href="/thesomat" className="text-gray-300 hover:text-white">
            Thesomat
          </a>
          <>
            //{" "}
            <Button as={Link} href="/login" variant="bordered" className="text-white">
              Login
            </Button>
            <Button as={Link} href="/register" variant="bordered" className="text-white">
              Register
            </Button>
          </>
        </div>
      </div>
    </nav>
  )
}
