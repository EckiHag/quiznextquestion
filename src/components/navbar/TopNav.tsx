

import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Link from "next/link"
import React from "react"
import { GiMatchTip } from "react-icons/gi"
import NavLink from "./NavLink"
import { auth } from "@/auth"
import UserMenu from "./UserMenu"
import SchuleMenu from "./SchuleMenu"
import GemeindeMenu from "./GemeindeMenu"

export default async function TopNav() {
  const session = await auth()
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-gray-400 to-gray-700"
      classNames={{
        item: ["text-xl", "text-white", "uppercase", "data-[active=true]:text-yellow-200"],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-200" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Quiz</span>
          <span className="text-gray-200">by EckiHag</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/thesomat" label="Thesomat" />
        <NavLink href="/provakomat" label="Provakomat" />
        <SchuleMenu />
        <GemeindeMenu />
      </NavbarContent>
      <NavbarContent justify="end">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <>
            <Button as={Link} href="/login" variant="bordered" className="text-white">
              Login
            </Button>
            <Button as={Link} href="/register" variant="bordered" className="text-white">
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
