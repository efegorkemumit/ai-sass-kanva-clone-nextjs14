'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { navLinks } from '@/constans'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const MobileMenu = () => {

    const pathname = usePathname();

  return (
    <header className='flex p-3 justify-between items-center fixed w-full h-20 border-b
    
    shadow-md bg-white lg:hidden'>

        <Link href="/">
            <Image alt='logo'  src="/logo.png"  width={180} height={30}/>
            </Link>

            <nav className='flex gap-3'>

            <SignedIn>
            <UserButton afterSignOutUrl='/'  />

            <Sheet>
            <SheetTrigger>
                <MenuIcon/>
            </SheetTrigger>
            <SheetContent>
            <Link href="/">
            <Image alt='logo'  src="/logo.png"  width={180} height={30}/>
            </Link>

            <ul className='md:flex w-full flex-col items-start gap-4 mt-5'>
                    {navLinks.map((link)=>{
                        const isActive= link.route===pathname;
                        const IconComponent = link.icon;

                        return(
                            <li key={link.route}
                            className={cn("flex items-center font-semibold  w-full rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner group ",
                                isActive ? "text-purple-600  hover:text-purple-600" : 'text-gray-700'
                            )}>
                                <Link className='p-4 font-semibold flex gap-4' href={link.route}>
                                    <IconComponent className={cn("text-2xl text-slate-400 mr-2",
                                        isActive ? "text-purple-600  hover:text-purple-600" : 'text-gray-400'
                                    )}/>
                                    {link.label}
                                
                                </Link>


                            </li>

                        )
                        




                    })}

                </ul>

               

            </SheetContent>
            </Sheet>


            
            </SignedIn>


            <SignedOut>
                <Button>
                    <Link href="/sign-in">Login</Link>
                </Button>

                
            </SignedOut>


            </nav>
        



    </header>
  )
}

export default MobileMenu