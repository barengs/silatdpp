"use client"

import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Table from '@/components/Table';
import { fetchInsitution } from '@/services/common';
import { setInstitution } from '@/store/servicesSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from 'react-redux';


const Institution: React.FC = () => {
  const dispatch = useDispatch()
  const store = useStore();
  const [data, setData] = useState(store.getState().services.institutions) 

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
      name: "Kontak Institusi",
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

   useEffect(() => {
          const syncInstitutionData = async () => {
              dispatch(setInstitution(await fetchInsitution()));
              setData(store.getState().services.institutions)
          };
  
          syncInstitutionData();
      }, []);


  return (
    <DefaultLayout>
      <Table addButtonName='Tambah Institusi' addButtonLink='/institution/addData' name='Daftar Institusi' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/institution"}}   />
    </DefaultLayout>
  );
};



export default Institution
