"use client"

import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Table from '../Table/page'
import { cleanColumnName, extractDataColumnName } from '../../../utils/data'

// FOR DEVELOPMENT PURPOSE
const DUMMY_DATA = [
  {
    id: "1",
    name: "Alvin Setya Pranata",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Mengubah Data Ijazah",
    position: "CEO",
    contact: "+6285334277450",
  },
  {
    id: "2",
    name: "Rovi Ariev",
    institution_name: "PT. Sejahtera",
    institution_address: "Jl. Nyalabu Permai",
    needs: "Pengajuan Pengubahan",
    position: "Director",
    contact: "+6285334277451",
  },
  {
    id: "3",
    name: "Lina Mardiana",
    institution_name: "TechnoArt",
    institution_address: "Jl. Kartini Raya",
    needs: "Perbaikan Alamat",
    position: "Manager",
    contact: "+6285334277452",
  },
  {
    id: "4",
    name: "Budi Santoso",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Validasi Dokumen",
    position: "Staff",
    contact: "+6285334277453",
  },
  {
    id: "5",
    name: "Siti Fatimah",
    institution_name: "PT. Sejahtera",
    institution_address: "Jl. Nyalabu Permai",
    needs: "Pembaruan Data",
    position: "HR",
    contact: "+6285334277454",
  },
  {
    id: "6",
    name: "Rian Perdana",
    institution_name: "Innovasia",
    institution_address: "Jl. Pahlawan",
    needs: "Pengubahan Nomor",
    position: "Technician",
    contact: "+6285334277455",
  },
  {
    id: "7",
    name: "Maria Felicia",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Mengubah Data Ijazah",
    position: "CEO",
    contact: "+6285334277456",
  },
  {
    id: "8",
    name: "Ardi Saputra",
    institution_name: "PT. Sejahtera",
    institution_address: "Jl. Nyalabu Permai",
    needs: "Pengajuan Pengubahan",
    position: "Director",
    contact: "+6285334277457",
  },
  {
    id: "9",
    name: "Sulaiman Akbar",
    institution_name: "TechnoArt",
    institution_address: "Jl. Kartini Raya",
    needs: "Perbaikan Alamat",
    position: "Staff",
    contact: "+6285334277458",
  },
  {
    id: "10",
    name: "Dewi Anggraini",
    institution_name: "Innovasia",
    institution_address: "Jl. Pahlawan",
    needs: "Pengubahan Nomor",
    position: "Manager",
    contact: "+6285334277459",
  },
  {
    id: "11",
    name: "Hadi Prakoso",
    institution_name: "BlizbyteCo",
    institution_address: "Jl. Jembatan Baru",
    needs: "Validasi Dokumen",
    position: "HR",
    contact: "+6285334277460",
  },
  {
    id: "12",
    name: "Farah Qistina",
    institution_name: "PT. Sejahtera",
    institution_address: "Jl. Nyalabu Permai",
    needs: "Pembaruan Data",
    position: "Technician",
    contact: "+6285334277461",
  },
  {
    id: "13",
    name: "Andre Wirawan",
    institution_name: "TechnoArt",
    institution_address: "Jl. Kartini Raya",
    needs: "Pengubahan Data",
    position: "Manager",
    contact: "+6285334277462",
  },
  {
    id: "14",
    name: "Eka Novita",
    institution_name: "Innovasia",
    institution_address: "Jl. Pahlawan",
    needs: "Validasi Dokumen",
    position: "Staff",
    contact: "+6285334277463",
  },
  {
    id: "15",
    name: "Rifki Maulana",
    institution_name: "PT. Sejahtera",
    institution_address: "Jl. Nyalabu Permai",
    needs: "Pengajuan Pengubahan",
    position: "Director",
    contact: "+6285334277464",
  },
];



const GuestBook: React.FC = () => {

  const columns = [
    {
      name: "ID",
      selector: (row: { id: string }) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
      sortable: true,
    },
    {
      name: "Institution Name",
      selector: (row: { institution_name: string }) => row.institution_name,
      sortable: true,
    },
    {
      name: "Institution Address",
      selector: (row: { institution_address: string }) => row.institution_address,
      sortable: true,
    },
    {
      name: "Needs",
      selector: (row: { needs: string }) => row.needs,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row: { position: string }) => row.position,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row: { contact: string }) => row.contact,
      sortable: true,
    },
  ];

  

  // DEVELOPMENT PURPOSE

  return (
    <>
      <Breadcrumb pageName='Buku Tamu' />
      <Table addButtonLink='/guestBook/addData' addButtonName='Tambah Tamu' name='Daftar Tamu' column={columns} data={DUMMY_DATA} detailLink={{name: "Pengaturan", to: "/guestBook"}}   />
    </>
  )
}


export default GuestBook;
