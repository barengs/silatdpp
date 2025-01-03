"use client"

import Table from "@/components/Table";
import { TransportPropsType } from "@/types/pages/transports";
import Link from "next/link";
import React from "react";

const TransportPage: React.FC<TransportPropsType> = ({ data }) => {

    const columns = [
        {
            name: "Nama Transportasi",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Jenis Transportasi",
            selector: (row: Record<string, string>) => row.jenis,
            sortable: true,
        },
    ]
    return (
        <>
            <div className="flex justify-end">
                <Link href="/transport/addData" className="bg-primary py-3 px-4 rounded-md text-white text-sm">Tambah Transportasi</Link>
            </div>
            <Table data={data} column={columns} name="Data Trasportasi" addButtonLink="/transport/add" addButtonName="Tambah Transportasi" />
        </>
    )
}


export default TransportPage;