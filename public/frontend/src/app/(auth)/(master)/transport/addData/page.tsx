"use client"

import Breadcrumb from "@/components/Breadcrumb"
import InputFields from "@/components/Fields/InputFields"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import useFetch from "@/hooks/useFetch"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"
import { useStore } from "react-redux"
import { toast } from "react-toastify"
import { z } from "zod"

const TransportAddPage: React.FC = () => {
    const [isPending, fetchCaller] = useFetch();
    const [errors, setErrors] = useState({})
    const state = useStore().getState()
    const router = useRouter()



    const formSchema = z.object({
        nama: z.string().min(1, "Harap mengisi nama"),        
        jenis: z.string().min(1, "Harap mengisi jenis"),        
    })

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const form = new FormData(event.currentTarget)

        const validationRes = formSchema.safeParse({
            nama: form.get("nama"),
            jenis: form.get("jenis")
        })


        if (!validationRes.success) {

            setErrors(validationRes.error.flatten().fieldErrors)

            return
        }

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
                <InputFields name="nama" title="Nama Transportasi" error={errors.nama ? errors.nama[0] : ""} />
                <InputFields name="jenis" title="Jenis Transportasi" error={errors.jenis ? errors.jenis[0] : ""} />
                <button
                    type="submite"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 w-max"
                >
                    {isPending ? (
                        <div className="flex gap-x-4">
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Menambahkan
                        </div>
                    ) : (
                        <> Tambah Transportasi</>
                    )}
                </button>
            </form>
        </DefaultLayout>
    )
}


export default TransportAddPage