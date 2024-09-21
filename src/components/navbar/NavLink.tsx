'use client';

// import { NavbarItem } from '@nextui-org/react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation';
// import React from 'react'

// type Props = {
//     href: string;
//     label: string;
// }

// export default function NavLink({href, label}: Props) {
//     const pathname = usePathname();
//     return (
//         <NavbarItem isActive={pathname === href} as={Link} href={href}>{label}</NavbarItem>
//     )
// }

import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void; // Optional: für das Schließen des Menüs
}

export default function NavLink({ href, label, onClick }: NavLinkProps) {
  return (
    <Link href={href} onClick={onClick} className="text-white hover:underline">
      {label}
    </Link>
  );
}
