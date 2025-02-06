"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";


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
        router.replace("/users")
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Pengguna" />

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
