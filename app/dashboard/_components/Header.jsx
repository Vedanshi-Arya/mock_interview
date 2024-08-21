"use client"
import React from 'react'
import Image from 'next/image'
 import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

    const path=usePathname();
  return (

        <div className='w-full h-12 p-4 flex items-center justify-between bg-secondary shadow-md'>
            <Image src={'/next.svg'} width={160} height={100} alt="logo"></Image>
            <div className=' hidden md:flex gap-6'>
                <Link className={`hover:text-primary hover:font-bold  transition-all cursor-pointer ${path=='/dashboard '&&'text-primary font-bold'}`} href="4">Dashboard</Link>
                <Link className={`hover:text-primary hover:font-bold  transition-all cursor-pointer ${path=='/questions'&&'text-primary font-bold'}`}  href="4">Questions</Link>
                <Link className={`hover:text-primary hover:font-bold  transition-all cursor-pointer ${path=='/upgrade '&&'text-primary font-bold'}`} href="4">Upgrade</Link>
                <Link  className={`hover:text-primary hover:font-bold  transition-all cursor-pointer ${path=='/how '&&'text-primary font-bold'}`} href="4">How it Works?</Link>
            </div>
            <UserButton/>
        </div>
         
  )
}

export default Header