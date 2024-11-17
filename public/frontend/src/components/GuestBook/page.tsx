"use client"

import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Table from '../Table/page'
import { cleanColumnName, extractDataColumnName } from '../../../utils/data'

// FOR DEVELOPMENT PURPOSE
const DUMMY_DATA = [
  {
    id: "2",
    name: "Alvin Setya Pranata",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Mengubah Data Ijazah",
    position: "CEO",
    contact: "+6285334277450"
  },
  {
    id: "2",
    name: "Alvin Setya Pranata",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Mengubah Data Ijazah",
    position: "CEO",
    contact: "+6285334277450"
  },
  {
    id: "3",
    name: "Alvin Setya Pranata",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Mengubah Data Ijazah",
    position: "CEO",
    contact: "+6285334277450"
  },
]


const GuestBook: React.FC = () => {

  // DEVELOPMENT PURPOSE
  const {columns, value} = extractDataColumnName(DUMMY_DATA)

  return (
    <>
      <Breadcrumb pageName='Buku Tamu' />
      <Table addButtonLink='/guestBook/addData' addButtonName='Tambah Tamu' name='Daftar Tamu' column={cleanColumnName(columns)} data={value} detailLink={{name: "Pengaturan", to: "/guestBook"}}   />
    </>
  )
}


export default GuestBook;
