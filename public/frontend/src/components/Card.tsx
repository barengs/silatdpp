import Link from 'next/link'
import React from 'react'

interface CardProps {
    title: string,
    link: string,
    icon?: React.ReactElement<any, any>,
    desc?: string
}


const Card: React.FC<CardProps> = ({title, link, icon, desc}) => {
  return (
    <Link href={link} className='rounded-md bg-white p-4 flex gap-x-6 items-center'>
        {icon}
        <div className='flex flex-col'>
          <h3 className='text-black font-bold text-lg'>{title}</h3>
          <p className='text-xs'>{desc}</p>
        </div>
    </Link>
  )
}


export default Card