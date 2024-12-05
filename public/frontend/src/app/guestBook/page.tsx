import GuestBook from '@/components/GuestBook/page'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'


interface GuestBookProps {

}

const GuestBookPage: React.FC<GuestBookProps> = ({}) => {
  return (
    <DefaultLayout>
        <GuestBook />
    </DefaultLayout>
  )
}



export default GuestBookPage
