import Breadcrumb from '@/components/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import SppdPage from '@/pages/Sppd/page'
import React from 'react'

 const Sppd: React.FC = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sppd`, { cache: 'no-store'})
  const data = await res.json()

  return (
    <DefaultLayout>
        <Breadcrumb pageName='Pengajuan SPPD' />
        <SppdPage data={data.data.data} />
    </DefaultLayout>
  )
}


export default Sppd