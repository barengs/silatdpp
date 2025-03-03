"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

export default function InstitutionAddData() {
    const [isPending, fetchCaller] = useFetch();
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const store = useStore();
    const authState = store.getState().auth;

    const schema = z.object({
        nama: z.string().min(1, "Nama tidak boleh kosong!"),
        alamat: z.string().min(1, "Alamat tidak boleh kosong!"),
        kontak: z.string({ invalid_type_error: "Kontak tidak valid" }).min(1, "Kontak tidak boleh kosong!"),
    });

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = event.currentTarget;

        const data = new FormData(formData);

        const res = schema
            .safeParse({ nama: data.get("nama"), alamat: data.get("alamat"), kontak: data.get("kontak")})
            
        if (!res.success) {
            toast.error("Data tidak valid", { position: "top-right"})
            setErrors(res.error?.flatten().fieldErrors)
            return
        }


        await fetchCaller("institusi", {
            method: "POST",
            headers: {
                Authorization: authState.token,
            },
            body: data,
        })
            .then(() => {
                toast.success("Data institusi berhasil ditambahkan!", {
                    position: "top-right",
                });
                router.push("/institution");
            })
            .catch(() => console.log("Error saat menambah data"));
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Institusi" />

            <form
                onSubmit={handlePostData}
                className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Institusi" name="nama" error={errors.nama ? errors.nama[0] : ""}/>
                <InputFields title="Alamat Institusi" name="alamat" error={errors.alamat ? errors.alamat[0] : ""}/>
                <InputFields title="kontak Institusi" name="kontak" error={errors.kontak ? errors.kontak[0] : ""}/>
                <button
                    className="flex w-max columns-2 items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-75"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Menambahkan Data
                        </>
                    ) : (
                        <>Tambahkan Institusi</>
                    )}
                </button>
            </form>
        </DefaultLayout>
    );
}
