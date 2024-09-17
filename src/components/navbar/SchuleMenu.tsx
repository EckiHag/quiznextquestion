"use client"

import { signOutUser } from "@/app/actions/authActions"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react"
import { Session } from "next-auth"
import Link from "next/link"
import React from "react"

export default function SchuleMenu() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="transition-transform duration-300 hover:scale-105 hover:text-blue-500">
        Schule
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
            Schule
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/quiz/klasse5verschiedene">
        Klasse 5 Verschiedene
      </DropdownItem>
      <DropdownItem as={Link} href="/quiz/klasse7verschiedene">
        Klasse 7 Verschiedene
      </DropdownItem>
      <DropdownItem as={Link} href="/quiz/klasse9verschiedene">
        Klasse 9 Verschiedene
      </DropdownItem>
      <DropdownItem as={Link} href="/quiz/klasse10verschiedene">
        Klasse 10 Verschiedene
      </DropdownItem>
      <DropdownItem as={Link} href="/quiz/klasse11q1verschiedene">
        Klasse 11 / Q1 Verschiedene
      </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
