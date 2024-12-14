"use client"

import Table from "@/components/Table/page"
import React from "react"


const SppdPage: React.FC = () => {
    const columns = [
        {
            name: "Nama Kegiatan",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        }
    ]


    const data = [
        {
            nama: "Kegiatan Bersih-Bersih"
        }
    ]

    return (
        <>
            <Table addButtonName='Tambah SPPD' addButtonLink='/sppd/addData' name='Daftar SPPD' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/sppd"}}   />
        </>
    )
}


export default SppdPage