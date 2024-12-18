"use client"

import Table from "@/components/Table"
import { SppdDataType, SppdPropsType } from "@/types/pages/sppd"
import React from "react"
import { getDateTime } from "../../../utils/data"
import Link from "next/link"

const SppdPage: React.FC<SppdPropsType> = ({ data }) => {

    if (!data) {
        return <h1>Not Available</h1>
      }
    


    const columns = [
        {
            name: "Nama Kegiatan",
            selector: (row: SppdDataType) => row.nama_kegiatan,
            sortable: true,
        },
        {
            name: "Nama Pegawai",
            selector: (row: SppdDataType) => row.user.name,
            sortable: true,
        },
        {
            name: "Tempat Kegiatan",
            selector: (row: SppdDataType) => row.tempat_kegiatan,
            sortable: true,
        },
        {
            name: "Tanggal Kegiatan",
            selector: (row: SppdDataType) => getDateTime(row.tanggal_kegiatan),
            sortable: true,
        },
        {
            name: "Status Persetujuan",
            selector: (row: SppdDataType) => row.approval ? 'Disetujui' : 'Sedang Menunggu',
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <Link className="text-blue-500 hover:underline" href={`/sppd/${row.id}`}>Detail</Link>
            )
        },
    ]

    return (
        <>
            <Table addButtonName='Tambah SPPD' addButtonLink='/sppd/addData' name='Daftar Pengajuan SPPD' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/sppd"}}   />
        </>
    )
}


export default SppdPage