"use client"

import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Table from "@/components/Table";
import { fetchRoles } from "@/services/common";
import { setRoles } from "@/store/servicesSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

const Page: React.FC = () => {

    const dispatch = useDispatch();
    const store = useStore();
    const serviceState = store.getState().services;

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
        };

        syncRoleData();
    }, [])


    return(
        <DefaultLayout>
            <Breadcrumb  pageName="Manajemen Role"/>
            <Table name="Data Role" addButtonLink="/roles/addData" addButtonName="Tambah Role" column={columns} data={serviceState.roles} />
        </DefaultLayout>
    )
}


export default Page;