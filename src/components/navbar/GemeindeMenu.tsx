"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";

import Link from "next/link";
import React from "react";

export default function SchuleMenu() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="transition-transform duration-300 hover:scale-105 hover:text-blue-500">Gemeinde</DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
            Gemeinde
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/quiz/allgemeinwissen">
          Allgemeinwissen
        </DropdownItem>
        <DropdownItem as={Link} href="/quiz/kirchenjahr">
          Kirchenjahr
        </DropdownItem>
        <DropdownItem as={Link} href="/quiz/spanien">
          Spanien
        </DropdownItem>
        <DropdownItem as={Link} href="/quiz/tansania">
          Tansania
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
