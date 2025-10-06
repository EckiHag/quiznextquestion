import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiMatchTip } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import SchuleMenu from "./SchuleMenu";
import GemeindeMenu from "./GemeindeMenu";
import MobileMenu from "./MobileMenu"; // Client-Komponente für das Hamburger-Menü

export default async function TopNav() {
  const session = await auth();

  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-gray-400 to-gray-700"
      classNames={{
        item: ["text-xl", "text-white", "uppercase", "data-[active=true]:text-yellow-200"],
      }}
    >
      <NavbarBrand as={Link} href="/" className="min-w-[200px] sm:min-w-[300px]">
        <GiMatchTip size={30} className="text-gray-200 sm:size-40" /> {/* Verkleinere das Icon auf kleineren Bildschirmen */}
        <div className="font-bold text-xl sm:text-3xl flex">
          {" "}
          {/* Verkleinere den Text auf kleineren Bildschirmen */}
          <span className="text-gray-900">Quiz</span>
          <span className="text-gray-200">by EckiHag</span>
        </div>
      </NavbarBrand>

      {/* Mobile Menu for small screens */}
      <div className="md:hidden">
        <MobileMenu session={session} />
      </div>

      {/* Normal Navbar content for larger screens */}
      <div className="hidden w-full md:flex items-center">
        <NavbarContent justify="center">
          <NavLink href="/thesomat" label="Thesomat" />
          <NavLink href="/provakomat" label="Provakomat" />
          <NavLink href="/moralomat" label="Moralomat" />
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
      </div>
    </Navbar>
  );
}
