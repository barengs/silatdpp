"use client"

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import useFetch from "@/hooks/useFetch";
import { RecomendationType } from "@/types/pages/recomendation";
import { DEFAULT_RECOMENDATION_DATA } from "@/utils/constans";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page: React.FC = () => {

    const [_, fetchCaller] = useFetch()
    const [data, setData] = useState([DEFAULT_RECOMENDATION_DATA])


    const columns = [
        {
            name: "No Registrasi",
            selector: (row: RecomendationType) => row.noreg,
            sortable: true,
          },
        {
            name: "Nama Pejabat",
            selector: (row: RecomendationType) => row.nama_pejabat,
            sortable: true,
          },
        {
            name: "Nama Pejabat Pengganti",
            selector: (row: RecomendationType) => row.nama_pejabat_pengganti,
            sortable: true,
          },
        {
                    name: "Status Persetujuan",
                    cell: (row: RecomendationType) => (
                        <div className={`${row.status == "disetujui" ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'} p-2 text-xs font-semibold rounded-md`}>
                            {row.status == "disetujui" ? 'Surat disetujui' : 'Sedang Menunggu'}
                        </div>
                    )
                },
          {
            name: "Aksi",
            cell: (row: RecomendationType) => (
                <Link
                    className="text-blue-500 hover:underline"
                    href={`/guestBook/${row.id}`}
                >
                    Edit
                </Link>
            ),
        },
    ]


    useEffect(() => {
        const getData = async() => {
            await fetchCaller('rekom')
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }

                    toast.error("Galat saat mengambil data Rekom", {
                        position: 'top-right'
                    })
                    console.log(res)
                })
                .then(data => data ? setData(data.data.data) : [DEFAULT_RECOMENDATION_DATA])
        }

        getData()
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Daftar Surat Rekom" />
            <Table name="Data Surat Rekomendasi" data={data} column={columns} addButtonLink="/recomendation" addButtonName="Ajukan Permohonan"/>
        </DefaultLayout>
    )
}

export default Page;