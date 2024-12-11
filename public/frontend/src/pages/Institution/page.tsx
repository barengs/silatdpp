"use client"

import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Table from '@/components/Table/page'
import Link from 'next/link'
import { InstitutionsDataTypes } from '@/types/pages/institution'



const InstutionsPage: React.FC<InstitutionsDataTypes> = ({data}) => {

  if (!data) {
    return <h1>Not Available</h1>
  }


  const columns = [
    {
      name: "Nama Institusi",
      selector: (row: Record<string, string>) => row.nama,
      sortable: true,
    },
    {
      name: "Alamat Institusi",
      selector: (row: Record<string, string>) => row.alamat,
      sortable: true,
    },
    {
      name: "No Telepon Institusi",
      selector: (row: Record<string, string>) => row.kontak,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row: Record<string, string>) => (
        <Link className='text-blue-500 hover:underline' href={`/guestBook/${row.id}`}>Edit</Link>
      ),
    },
  ];
  

  // DEVELOPMENT PURPOSE

  return (
    <>
      <Breadcrumb pageName='Buku Institusi' />
      <Table addButtonName='Tambah Institusi' addButtonLink='/institution/addData' name='Daftar Institusi' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/institution"}}   />
    </>
  )
}


export default InstutionsPage;
