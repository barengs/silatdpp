"use client"

import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Table from '@/components/Table/page'
import Link from 'next/link'
import { GuestBookGetInstance } from '@/types/pages/guest'




const GuestBook: React.FC<GuestBookGetInstance> = (data) => {

  const columns = [
    {
      name: "Nama Tamu",
      selector: (row: { nama_tamu: string }) => row.nama_tamu,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row: { alamat: string }) => row.alamat,
      sortable: true,
    },
    {
      name: "No Telpon",
      selector: (row: { no_telpon: string }) => row.no_telpon,
      sortable: true,
    },
    {
      name: "Keperluan",
      selector: (row: { keperluan: string }) => row.keperluan,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row: GuestBookGetInstance) => (
        <Link className='text-blue-500 hover:underline' href={`/guestBook/${row.id}`}>Edit</Link>
      ),
    },
  ];

  

  // DEVELOPMENT PURPOSE

  return (
    <>
      <Breadcrumb pageName='Buku Tamu' />
      <Table addButtonLink='/guestBook/addData' addButtonName='Tambah Tamu' name='Daftar Tamu' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/guestBook"}}   />
    </>
  )
}


export default GuestBook;
