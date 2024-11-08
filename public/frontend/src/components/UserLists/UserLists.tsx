import Link from 'next/link';
import React from 'react'

interface UserListsProps {
    name: string,
    position: string,
    role: string
}

const UserLists: React.FC<UserListsProps> = ({
    name,
    position,
    role
}) => {
  return (
    <tr>
        <td className='text-center py-4'>{name}</td>
        <td className='text-center py-4'>{position}</td>
        <td className='text-center py-4'>{role}</td>
        <td className='text-center py-4'>
          <Link href="youtube.com" className='text-blue-500 underline'>Edit</Link>
        </td>
    </tr>
  )
}


export default UserLists;