'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { SignInButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const menuOptions = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact us', path: '/contact' },
]

function Header() {
    const {user} = useUser();
    const path = usePathname();

  return (
    <div className="flex justify-between items-center p-4">
      {/* Logo + Name */}
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="WayQuest Logo" width={30} height={30} />
        <h2 className="font-bold text-2xl">WayQuest</h2>
      </div>

      {/* Menu options */}
      <div className="flex gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Auth Button */}
      {!user?<SignInButton mode="modal">
        <Button>Get Started</Button>
      </SignInButton> :
      path=='/create-new-trip'?
      <Link href={'/my-trip'}>
      <Button>My Trips</Button>
      </Link>:
      <Link href={'/create-new-trip'}>
      <Button>Create New Trip</Button>
      </Link>}
    </div>
  )
}

export default Header
