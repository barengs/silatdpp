import Breadcrumb from '@/components/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import SppdPage from '@/pages/Sppd/page'
import Link from 'next/link'
import React from 'react'

 const Sppd: React.FC = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sppd`, { cache: 'no-store'})
  const data = await res.json()

  return (
    <DefaultLayout>
        <Link href="/sppd" className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </Link>
        <Breadcrumb pageName='Histori SPPD' />
        <SppdPage data={data.data.data} />
    </DefaultLayout>
  )
}


export default Sppd