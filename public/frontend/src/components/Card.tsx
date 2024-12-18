import Link from 'next/link'
import React from 'react'

interface CardProps {
    title: string,
    link: string
}


const Card: React.FC<CardProps> = ({title, link}) => {
  return (
    <div className='rounded-md bg-white p-4'>
        <h3 className='text-black font-bold text-lg mb-4'>{title}</h3>
        <Link href={link} className='text-sm hover:underline'>To page</Link>
    </div>
  )
}


export default Card