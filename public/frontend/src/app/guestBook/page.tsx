import DefaultLayout from '@/components/Layouts/DefaultLayout'
import GuestBook from '@/pages/GuestBook/page'
import React from 'react'



export const dynamic = 'force-dynamic'

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`)
  const data = await res.json()

  if (!data) {
    return {
      data: {
        data: null
      }
    }
  }

  return data

}


const GuestBookPage: React.FC = () => {

  const data = getData()


  return (
    <DefaultLayout>
      <GuestBook data={data.data.data} />
    </DefaultLayout>
  );
};



export default GuestBookPage
