"use client"

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useUpdateNewsMutation } from "@/services/news";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const Page: React.FC = () => {
    const store = useStore()
    const authState = store.getState().auth
    
    const [isPending, fetchCaller] = useFetch()
    const [updateNews] = useUpdateNewsMutation()
    const [errors, setErrors] = useState({})
    const router = useRouter()

     const schema = z.object({
            judul: z.string().min(1, "Judul tidak boleh kosong!"),
            isi: z.string().min(1, "Isi tidak boleh kosong!"),
            gambar: z.string().min(1, "Gambar tidak boleh kosong!"),
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
            <Breadcrumb pageName="Tambah Berita" />
            <form onSubmit={handlePostData} className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Judul Berita" name="judul" error={errors.judul ? errors.judul[0] : ""}/>
                <TextFields title="Isi Berita" name="isi" error={errors.isi ? errors.isi[0] : ""}/>
                <InputFields title="Gambar" name="gambar"error={errors.gambar ? errors.gambar[0] : ""} />
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
                        <>Tambahkan Berita</>
                    )}
                </button>
            </form>
        </DefaultLayout>
    )
}

export default Page;