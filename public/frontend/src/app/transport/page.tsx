"use client"

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchTransportation } from "@/services/common";
import { setTransportation } from "@/store/servicesSlice";
import React, { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";




const Page: React.FC = () => {

    const store = useStore()
    const serviceState = store.getState().services
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
        <DefaultLayout>
            <Breadcrumb pageName="Data Transportasi" />
            <Table data={serviceState.transportation} column={columns} name="Data Trasportasi" addButtonLink="/transport/addData" addButtonName="Tambah Transportasi" />
        </DefaultLayout>
    )
}

export default Page