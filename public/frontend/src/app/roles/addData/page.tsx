"use client"

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";


const Page: React.FC = () => {
    const state = useStore().getState();
    const authState = state.auth;
    const [, fetchCaller] = useFetch()

    const [errors, setErrors] = useState()

    const schema = z.object({
        nama: z.string().min(1, "Role wajib diisi")
    })

    const handlePost = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = new FormData(event.currentTarget)

        const res = schema
            .safeParse({ nama: data.get("nama") })
            .error?.flatten().fieldErrors;

        if (Object.keys(res).length >= 1) {
            setErrors(res);
            return;
        }

        await fetchCaller('tugas', {
            method: 'post',
            headers: {
                Authorization: authState.token
            },
            body: form
        })
            .then(() => {
                toast.success("Berhasil menambahkan data role", {
                    position: 'top-right'
                })
            })
            .catch(() => {
                toast.error("Gagal saat menambahkan data role", {
                    position: 'top-right'
                })
            })
        
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Manajemen Tugas / Tambah Tugas" />
            <form onSubmit={handlePost} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Nama Role" name="nama" />
            </form>
        </DefaultLayout>
    )
}


export default Page;