"use client"

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FormEvent } from "react";

const Page: React.FC = () => {

    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Karyawan" />
            <form
                onSubmit={handlePost}
                className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Karyawan" name="name" />
                <InputFields title="Email Karyawan" name="email" />
                <InputFields title="Password" name="name" type="password"/>
                <InputFields title="Konfirmasi Password" name="name" type="password"/>
                <button
                    type="submit"
                    className="col-span-2 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Tambah Karyawan
                </button>
            </form>
        </DefaultLayout>
    )
}


export default Page;