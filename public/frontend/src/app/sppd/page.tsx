import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import SppdPage from '@/pages/Sppd/page'
import React from 'react'

export default function Sppd() {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Pengajuan SPPD' />
        <SppdPage />
    </DefaultLayout>
  )
}
