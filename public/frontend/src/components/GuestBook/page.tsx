"use client"

import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Table from '../Table/page'
import { cleanColumnName, extractDataColumnName } from '../../../utils/data'

// FOR DEVELOPMENT PURPOSE
const DUMMY_DATA = [
  {
    name: "Alvin Setya Pranata",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Mengubah Data Ijazah",
    position: "CEO",
    contact: "+6285334277450"
  }
]


const GuestBook: React.FC = () => {

  // DEVELOPMENT PURPOSE
  const {columns, value} = extractDataColumnName(DUMMY_DATA)

  return (
    <>
    
      <Breadcrumb pageName='Buku Tamu' />
      <div className="flex justify-end">
        <button className='px-2 py-3 bg-blue-500 text-white rounded-md mt-2 mb-4'>Tambah Tamu</button>
      </div>
      <Table column={cleanColumnName(columns)} data={value}   />
    </>
  )
}


export default GuestBook;
