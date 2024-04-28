import React from 'react'

interface HeaderLabelProps{
    title:string;
    subtitle?:string;
}

const HeaderLabel = ({title,subtitle}:HeaderLabelProps) => {
  return (
  <>
    <h2 className='font-semibold text-5xl text-slate-900'>{title}</h2>
    {subtitle && <p className='text-lg mt-4 mb-8'>{subtitle}</p>}
  
  </>
  )
}

export default HeaderLabel