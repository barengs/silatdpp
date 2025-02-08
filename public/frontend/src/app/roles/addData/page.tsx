"use client"

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { headers } from "next/headers";
import { FormEvent } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";


const Page: React.FC = () => {
    const state = useStore().getState();
    const authState = state.auth;
    const servicesState = state.services;
    const [isPending, fetchCaller] = useFetch()

    const handlePost = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = new FormData(event.currentTarget)

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
            <Breadcrumb pageName="Manajemen Role / Tambah Role" />
            <form onSubmit={handlePost} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Nama Role" />
                
            </form>
        </DefaultLayout>
    )
}


export default Page;