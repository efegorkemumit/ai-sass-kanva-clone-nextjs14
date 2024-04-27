import { Toaster } from '@/components/ui/toaster'
import React from 'react'

interface RouteLayoutProps{
    children:React.ReactNode
}

const RouteLayout = ({children}:RouteLayoutProps) => {
  return (
    <main>
        Sidebar
        MobileMenu

        <div className='container'>
            <div className=''>
            {children}
            </div>
        </div>

        <Toaster  />


        
    </main>
  )
}

export default RouteLayout