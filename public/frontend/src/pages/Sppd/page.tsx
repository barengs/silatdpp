"use client"

import Table from "@/components/Table/page"
import { SppdDataType, SppdPropsType } from "@/types/pages/sppd"
import React from "react"
import { getDateTime } from "../../../utils/data"

const SppdPage: React.FC<SppdPropsType> = ({ data }) => {
    const columns = [
        {
            name: "Nama Kegiatan",
            selector: (row: SppdDataType) => row.nama_kegiatan,
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
    ]

    return (
        <>
            <Table addButtonName='Tambah SPPD' addButtonLink='/sppd/addData' name='Daftar Pengajuan SPPD' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/sppd"}}   />
        </>
    )
}


export default SppdPage