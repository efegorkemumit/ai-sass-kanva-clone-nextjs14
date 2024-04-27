import React from 'react'


interface AuthLayoutProps{
    children:React.ReactNode;
}
const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <main className='flex items-center justify-center
    min-h-screen w-full bg-purple-300'>

{children}

    </main>
  )
}

export default AuthLayout