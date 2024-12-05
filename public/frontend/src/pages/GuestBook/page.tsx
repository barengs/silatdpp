"use client"

import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Table from '@/components/Table/page'
import Link from 'next/link'
import { GuestBookProps } from '@/types/pages/guest'



const GuestBook: React.FC<GuestBookProps> = ({data}) => {

  if (!data) {
    return <h1>Not Available</h1>
  }


  const columns = [
    {
      name: "Nama Tamu",
      selector: (row: Record<string, string>) => row.nama_tamu,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row: Record<string, string>) => row.alamat,
      sortable: true,
    },
    {
      name: "No Telpon",
      selector: (row: Record<string, string>) => row.no_telpon,
      sortable: true,
    },
    {
      name: "Keperluan",
      selector: (row: Record<string, string>) => row.keperluan,
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
      <Breadcrumb pageName='Buku Tamu' />
      <Table addButtonLink='/guestBook/addData' name='Daftar Tamu' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/guestBook"}}   />
    </>
  )
}


export default GuestBook;
