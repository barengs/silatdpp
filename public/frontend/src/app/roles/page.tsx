"use client"

import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Table from "@/components/Table";
import { fetchRoles } from "@/services/common";
import { setRoles } from "@/store/servicesSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

const Page: React.FC = () => {

    const dispatch = useDispatch();
    const store = useStore();
    

    const [data, setData] = useState(store.getState().services.roles)

    const columns = [
        {
            name: "Nama Role",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <Link
                    className="text-blue-500 hover:underline"
                    href={`/users/${row.id}`}
                >
                    Edit
                </Link>
            ),
        },
    ]


    useEffect(() => {
        const syncRoleData = async () => {
            dispatch(setRoles(await fetchRoles()));
            setData(store.getState().services.roles);
        };

        syncRoleData();
    }, [])


    return(
        <DefaultLayout>
            <Breadcrumb  pageName="Manajemen Tugas"/>
            <Table name="Data Tugas" addButtonLink="/roles/addData" addButtonName="Tambah Tugas" column={columns} data={data} />
        </DefaultLayout>
    )
}


export default Page;