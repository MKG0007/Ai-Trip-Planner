'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const menuOptions = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact us', path: '/contact' },
]

function Header() {
  const { isSignedIn } = useUser()
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src="/logo.svg" alt="WayQuest Logo" width={30} height={30} />
          <h2 className="font-bold text-xl md:text-2xl">WayQuest</h2>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2
                className={`text-lg transition-all ${
                  path === menu.path
                    ? 'text-primary font-semibold'
                    : 'hover:text-primary hover:scale-105'
                }`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex gap-3 items-center">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button>Get Started</Button>
            </SignInButton>
          ) : (
            <>
              {path === '/create-new-trip' ? (
                <Link href={'/my-trip'}>
                  <Button>Create New Trip</Button>
                </Link>
              ) : (
                <Link href={'/create-new-trip'}>
                  <Button>Create New Trip</Button>
                </Link>
              )}
              {/* Profile avatar visible only on desktop */}
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t flex flex-col gap-4 px-6 py-4">
          {menuOptions.map((menu, index) => (
            <Link
              href={menu.path}
              key={index}
              onClick={() => setMenuOpen(false)}
            >
              <h2
                className={`text-lg ${
                  path === menu.path
                    ? 'text-primary font-semibold'
                    : 'hover:text-primary'
                }`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}

          {/* Mobile Auth Section */}
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button className="w-full">Get Started</Button>
            </SignInButton>
          ) : (
            <>
              {path === '/create-new-trip' ? (
                <Link href={'/my-trip'} onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">My Trips</Button>
                </Link>
              ) : (
                <Link href={'/create-new-trip'} onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Create New Trip</Button>
                </Link>
              )}

              {/* Profile avatar visible only on mobile */}
              <div className="flex justify-center pt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
