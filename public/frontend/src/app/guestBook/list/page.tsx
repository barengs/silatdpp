import DefaultLayout from '@/components/Layouts/DefaultLayout'
import GuestBook from '@/components/pages/GuestBook/page'
import React from 'react'



const GuestBookPage: React.FC = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`, { cache: 'no-store' })
  const data = await res.json()

  return (
    <DefaultLayout>
      <GuestBook data={data.data.data} />
    </DefaultLayout>
  );
};



export default GuestBookPage
