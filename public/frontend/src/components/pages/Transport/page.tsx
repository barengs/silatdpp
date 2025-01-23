"use client"

import Table from "@/components/Table";
import { fetchTransportation } from "@/services/common";
import { setTransportation } from "@/store/servicesSlice";
import { TransportPropsType } from "@/types/pages/transports";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const TransportPage: React.FC<TransportPropsType> = ({ data }) => {

    const dispatch = useDispatch()
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

    useEffect(() => {
        const setTransportData = async () => {
            dispatch(setTransportation(await fetchTransportation()))
        }

        setTransportData()
    }, [])

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