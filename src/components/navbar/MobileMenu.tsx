"use client";

import { useState } from "react";
import { Button, NavbarContent } from "@nextui-org/react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import SchuleMenu from "./SchuleMenu";
import GemeindeMenu from "./GemeindeMenu";
import { Session } from "next-auth"; // Importiere den Session-Typ

interface MobileMenuProps {
  session: Session | null; // Definiere den Typ für die Session-Prop
}

export default function MobileMenu({ session }: MobileMenuProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      {/* Hamburger Menu Button for mobile */}
      <Button onClick={toggleMenu} className="text-white bg-transparent border-none">
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </Button>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeMenu} // Overlay schließt das Menü, wenn man außerhalb klickt
        ></div>
      )}

      {/* Sidebar (off-canvas menu) */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 z-50 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out w-64`}
      >
        <div className="flex flex-col items-start p-4 space-y-4 text-white bg-zinc-700">
          <NavLink href="/thesomat" label="Thesomat" onClick={closeMenu} />
          <NavLink href="/provakomat" label="Provakomat" onClick={closeMenu} />
          <NavLink href="/moralomat" label="Moralomat" onClick={closeMenu} />
          <SchuleMenu />
          <GemeindeMenu />
          <div className="mt-auto">
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <>
                <Button as={Link} href="/login" variant="bordered" className="text-white" onClick={closeMenu}>
                  Login
                </Button>
                <Button as={Link} href="/register" variant="bordered" className="text-white" onClick={closeMenu}>
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
