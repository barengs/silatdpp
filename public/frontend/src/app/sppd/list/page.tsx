"use client"

import Table from "@/components/Table"
import { SppdDataType } from "@/types/pages/sppd"
import React, { useEffect, useState } from "react"
import { getDateTime } from "@/utils/data"
import Link from "next/link"
import { DEFAULT_SPPD_DATA } from "@/utils/constans"
import useFetch from "@/hooks/useFetch"
import { toast } from "react-toastify"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumb"


const SppdPage: React.FC = () => {

    const [_, fetchCaller] = useFetch()
    const [data, setData] = useState([DEFAULT_SPPD_DATA])


    const columns = [
        {
            name: "Nama Pegawai",
            selector: (row: SppdDataType) => row.user.name,
            sortable: true,
        },
        {
            name: "Tempat Tujuan",
            selector: (row: SppdDataType) => row.tempat_tujuan,
            sortable: true,
        },
        {
            name: "Tanggal Kegiatan",
            selector: (row: SppdDataType) => getDateTime(row.tanggal_kegiatan),
            sortable: true,
        },
        {
            name: "Status Persetujuan",
            cell: (row: SppdDataType) => (
                <div className={`${row.approval ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'} p-2 text-xs font-semibold rounded-md`}>
                    {row.approval ? 'Surat disetujui' : 'Sedang Menunggu'}
                </div>
            )
        },
        {
            name: "Aksi",
            cell: (row: SppdDataType) => (
                <Link className="text-blue-500 hover:underline" href={`/sppd/${row.id}`}>Detail</Link>
            )
        },
    ]


    useEffect(() => {
        const getData = async() => {
            await fetchCaller('sppd')
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }

                    toast.error("Galat saat mengambil data sppd")
                    console.log(res)
                })
                .then(data => data ? setData(data.data.data) : [DEFAULT_SPPD_DATA])
        }

        getData()
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Histori SPPD" />
            <Table addButtonName='Tambah SPPD' addButtonLink='/sppd' name='Daftar Pengajuan SPPD' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/sppd"}}   />
        </DefaultLayout>
    )
}


export default SppdPage