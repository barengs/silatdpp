"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const options = [
    {
        name: "Admin",
        value: "admin",
    },

    {
        name: "Kepala Sekolah",
        value: "principal",
    },
    {
        name: "Admin Sekolah",
        value: "school_admin",
    },
];

const UserDetail: React.FC = () => {

    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = new FormData(event.currentTarget)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/register`, {
            method: 'post',
            body: form
        })

        if (!res.ok) {
            alert("Galat saat menambahkan data")
            return
        }


        alert("Berhasil menambahkan data")
        router.push("/users")
    }

    return (
        <DefaultLayout>
            <Link href="/users">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </Link>
            <Breadcrumb pageName="Detail Pengguna" />

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields
                    title="Nama"
                    name="name"
                />
                <InputFields
                    title="Email"
                    name="email"
                />
                <InputFields
                    title="Password"
                    name="password"
                />
                <InputFields
                    title="Konfirmasi Password"
                    name="password_confirmation"
                />
                <button type="submit" className="col-span-2 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Tambah Pengguna
                </button>
            </form>
        </DefaultLayout>
    );
};

export default UserDetail;
