import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import Sidebar from './_components/Sidebar'

interface RouteLayoutProps{
    children:React.ReactNode
}

const RouteLayout = ({children}:RouteLayoutProps) => {
  return (
    <main className='flex min-h-screen w-full bg-white lg:flex-row'>
        <Sidebar/>
        MobileMenu

        <div className='flex-1 overflow-auto lg:max-h-screen py-8'>
            <div className='max-w-5xl mx-auto px-5 w-full p-16'>
            {children}
            </div>
        </div>

        <Toaster  />


        
    </main>
  )
}

export default RouteLayout