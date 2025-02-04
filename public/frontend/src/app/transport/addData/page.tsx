"use client"

import Breadcrumb from "@/components/Breadcrumb"
import InputFields from "@/components/Fields/InputFields"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/navigation"
import React, { FormEvent } from "react"
import { useStore } from "react-redux"
import { toast } from "react-toastify"

const TransportAddPage: React.FC = () => {
    const [isPending, fetchCaller] = useFetch();
    const state = useStore().getState()
    const router = useRouter()

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const form = new FormData(event.currentTarget)

        await fetchCaller('transportasi', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.token}`
            },
            body: form,
        })
            .then(res => {

                if (!res.ok) {
                    toast.error("Gagal Saaat menambahkan data!", {
                        position: "top-right",
                    })
                    return   
                };

                toast.success("Data transportas berhasil ditambahkan!", {
                    position: "top-right",
                });
                router.push("/transport")
            })
           
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Transportasi" />
            <form onSubmit={handlePostData} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields name="nama" title="Nama Transportasi" />
                <InputFields name="jenis" title="Jenis Transportasi" />
                <button
                    type="submite"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 col-span-2"
                >
                    Tambahkan transportasi
                </button>
            </form>
        </DefaultLayout>
    )
}


export default TransportAddPage