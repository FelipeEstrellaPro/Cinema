"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/terror", label: "💀 Terror" },
  { href: "/romance", label: "🌹 Romance" },
  { href: "/comedia", label: "🎭 Comedia" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="cinema-nav">
      <Link href="/" className="cinema-logo">
        ⭐ CineMax
      </Link>
      <div className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
