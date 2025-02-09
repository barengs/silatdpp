"use client"

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchTransportation } from "@/services/common";
import { setTransportation } from "@/store/servicesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";




const Page: React.FC = () => {

    const store = useStore()
    const dispatch = useDispatch()

    const [data, setData] = useState(store.getState().services.transportation)

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
                dispatch(setTransportation(await fetchTransportation()));
                setData(store.getState().services.transportation);
            }
    
            setTransportData()
        }, [])
    
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Transportasi" />
            <Table data={data} column={columns} name="Data Trasportasi" addButtonLink="/transport/addData" addButtonName="Tambah Transportasi" />
        </DefaultLayout>
    )
}

export default Page