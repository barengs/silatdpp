"use client"

import Table from "@/components/Table";
import Link from "next/link";
import React from "react";


const PartnerPage = ({data}) => {

    const columns = [
        {
          name: "Nama Rekan",
          selector: (row: Record<string, string>) => row.nama,
          sortable: true,
        },
        {
          name: "Alamat",
          selector: (row: Record<string, string>) => row.alamat,
          sortable: true,
        },
        {
          name: "Kota",
          selector: (row: Record<string, string>) => row.kota,
          sortable: true,
        },
        {
          name: "Aksi",
          cell: (row: Record<string, string>) => (
            <Link className='text-blue-500 hover:underline' href={`/guestBook/${row.id}`}>Edit</Link>
          ),
        },
      ];

    return (
        <>
            <Table name="Data Rekanan"  column={columns} data={data} addButtonName="Tambah Rekan" addButtonLink="/partners/addData" />
        </>
    )
}


export default PartnerPage;