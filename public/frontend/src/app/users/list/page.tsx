"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchUsers } from "@/services/common";
import { setUsers } from "@/store/servicesSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

const Page: React.FC = () => {
    const dispatch = useDispatch();
    const store = useStore();
    const [data, setData] = useState(store.getState().services.users)

    const columns = [
        {
            name: "Nama Karyawan",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Role Karyawan",
            selector: (row) => row.roles[0] ? row.roles[0].name : "Belum ditugaskan",
            sortable: true,
        },
        {
            name: "Email Karyawan",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <Link
                    className="text-blue-500 hover:underline"
                    href={`/users/`}
                >
                    Edit
                </Link>
            ),
        },
    ];

    useEffect(() => {

        const syncUserData = async () => {
            dispatch(setUsers(await fetchUsers()));
            setData(store.getState().services.users)
        };

        syncUserData();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Daftar Karyawan" />
            <Table
                name="List karyawan"
                column={columns}
                data={data}
                addButtonName="Tambah Karyawan"
                addButtonLink="/register"
            />
        </DefaultLayout>
    );
};

export default Page;
