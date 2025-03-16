"use client"

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
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

    const [file, setFile] = useState<File[]>([])
    
    const [isPending, fetchCaller] = useFetch()
    const [updateNews] = useUpdateNewsMutation()
    const [errors, setErrors] = useState({})
    const router = useRouter()

     const schema = z.object({
            judul: z.string().min(1, "Judul tidak boleh kosong!"),
            isi: z.string().min(1, "Isi tidak boleh kosong!"),
            gambar: z.instanceof(File),
        });

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
    
            const formData = event.currentTarget;
    
            const data = new FormData(formData);
    
            const validation_res = schema
                .safeParse({ judul: data.get("judul"), isi: data.get("isi"), gambar: file})
                
            if (!validation_res.success) {
                toast.error("Data tidak valid", { position: "top-right"})
                setErrors(validation_res.error?.flatten().fieldErrors)
                return
            }
    

            data.append("gambar", file)
    
            const res = await fetchCaller("berita", {
                method: "POST",
                headers: {
                    Authorization: authState.token,
                },
                body: data,
            })

            if (!res.ok) {
                toast.error("Galat saat menambahkan data", {
                    position: "top-right",
                });

                console.log(res)

                return
            }

            toast.success("Data Berita berhasil ditambahkan!", {
                position: "top-right",
            });
            
            setTimeout(() => window.location.reload(), 2000)
        };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Berita" />
            <form onSubmit={handlePostData} className="flex flex-col lg:grid lg:grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Judul Berita" name="judul" error={errors.judul ? errors.judul[0] : ""}/>
                <TextFields title="Isi Berita" name="isi" error={errors.isi ? errors.isi[0] : ""}/>
                <FilesFields title="Gambar" setter={(file: File[]) => setFile(file[0])} error={errors.gambar ? errors.gambar[0] : ""} />
                <button
                    className="flex w-max col-span-2 columns-2 items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-75"
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