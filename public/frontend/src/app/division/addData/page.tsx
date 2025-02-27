"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const Page: React.FC = () => {

     const [isPending, fetchCaller] = useFetch();
     const [errors, setErrors] = useState({})
     const router = useRouter()
     const store = useStore();
     const authState = store.getState().auth;

     const schema = z.object({
        nama: z.string().min(1, "Nama divisi tidak boleh kosong!")
     })

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {

        
        
        event.preventDefault();
        
        const formData = event.currentTarget;
        const data = new FormData(formData);        

        const res = schema.safeParse({ nama: data.get("nama") }).error?.flatten().fieldErrors

        setErrors(Object.keys(res).length >= 1 ? res : {})

        return
        
        await fetchCaller("divisi", {
            method: "POST",
            headers: {
                Authorization: authState.token,
            },
            body: data,
        })
            .then(() => {
                toast.success("Data divisi berhasil ditambahkan!", {
                    position: "top-right"
                });
                router.push("/division");
            })
            .catch(() => console.log("Error saat menambah data"));
        
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Divisi" />
            <form
                onSubmit={handlePostData}
                className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Divisi" name="nama" error={errors.nama ? errors.nama[0] : ""}/>
                <button
                    className="flex w-max justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 text-sm col-span-2"
                    type="submit"
                >
                    {isPending ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Menambahkan Data
                        </>
                    ) : (
                        <>Tambahkan Divisi</>
                    )}
                </button>
            </form>
        </DefaultLayout>
    );
};

export default Page;
