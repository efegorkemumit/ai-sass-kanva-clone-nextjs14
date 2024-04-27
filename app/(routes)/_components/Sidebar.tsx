'use client'

import { navLinks } from '@/constans';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const pathname = usePathname();
  return (
    <aside className='hidden lg:flex h-screen w-72 bg-white p-5 shadow-md'>
        <div className='flex flex-col gap-4'>
            <Link href="/">
            <Image alt='logo'  src="/logo.png"  width={180} height={30}/>
            </Link>

            <nav className='h-full flex-col justify-between md:flex gap-3 mt-8'>
                <ul className='hidden md:flex w-full flex-col items-start gap-4'>
                    {navLinks.slice(0,6).map((link)=>{
                        const isActive= link.route===pathname;
                        const IconComponent = link.icon;

                        return(
                            <li key={link.route}
                            className={cn("flex items-center font-semibold  w-full rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner group ",
                                isActive ? "bg-purple-800 text-white  hover:bg-purple-800" : 'text-gray-700'
                            )}>
                                <Link className='p-4 font-semibold flex gap-4' href={link.route}>
                                    <IconComponent className='text-2xl text-slate-400 mr-2'/>
                                    {link.label}
                                
                                </Link>


                            </li>

                        )
                        




                    })}

                </ul>

                <ul className='hidden md:flex w-full flex-col items-start gap-4'>
                    {navLinks.slice(6).map((link)=>{
                        const isActive= link.route===pathname;
                        const IconComponent = link.icon;

                        return(
                            <li key={link.route}
                            className={cn("flex items-center font-semibold  w-full rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner group ",
                                isActive ? "bg-purple-800 text-white  hover:bg-purple-800" : 'text-gray-700'
                            )}>
                                <Link className='p-4 font-semibold flex gap-4' href={link.route}>
                                    <IconComponent className='text-2xl text-slate-400 mr-2'/>
                                    {link.label}
                                
                                </Link>


                            </li>

                        )
                        




                    })}

                </ul>
            </nav>
        </div>
    </aside>
  )
}

export default Sidebar