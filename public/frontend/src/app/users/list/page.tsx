"use client"

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { useState } from "react";

const Page: React.FC = () => {

    const [data, setData] = useState([])

    const columns = [
        {
            name: "Nama",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: Record<string, string>) => row.email,
            sortable: true,
        },
    ]

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Pengguna" />
            <Table columns={columns} data={data} name="Data Pengguna" />
        </DefaultLayout>
    )
}


export default Page;