"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchUsers } from "@/services/common";
import { setUsers } from "@/store/servicesSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

const Page: React.FC = () => {
    const dispatch = useDispatch();
    const store = useStore();
    const serviceState = store.getState().services;

    const columns = [
        {
            name: "Nama Karyawan",
            selector: (row) => row.user.name,
            sortable: true,
        },
        {
            name: "Role Karyawan",
            selector: (row) => row.role[0],
            sortable: true,
        },
        {
            name: "Email Karyawan",
            selector: (row) => row.user.email,
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
    ];

    useEffect(() => {

        console.log(serviceState.users)

        const syncUserData = async () => {
            dispatch(setUsers(await fetchUsers()));
        };

        syncUserData();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Daftar Karyawan" />
            <Table
                column={columns}
                data={serviceState.users}
                addButtonName="Tambah Karyawan"
                addButtonLink="/register"
            />
        </DefaultLayout>
    );
};

export default Page;
