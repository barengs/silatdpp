"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const Page: React.FC = () => {

     const [isPending, fetchCaller] = useFetch();
     const router = useRouter()
     const store = useStore();
     const authState = store.getState().auth;

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
                const formData = event.currentTarget;
        
                const data = new FormData(formData);
        
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
                className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Divisi" name="nama" />
                <button
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
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
