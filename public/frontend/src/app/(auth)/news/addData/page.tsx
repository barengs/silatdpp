"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import TextEditorFields from "@/components/Fields/TextEditorFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useUpdateNewsMutation } from "@/services/news";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const Page: React.FC = () => {
    const store = useStore();
    const authState = store.getState().auth;

    const [isPending , fetchCaller] = useFetch();


    const [errors, setErrors] = useState([])

    const [files, setFiles] = useState<File[]>([]);

    const schema = z.object({
        judul: z.string().min(1, "Judul tidak boleh kosong!"),
        isi: z.string().min(1, "Isi tidak boleh kosong!"),
        gambar: z.instanceof(File).array().nonempty("Berkas diperlukan"),
    });

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = event.currentTarget;

        const data = new FormData(formData);

        const validation_res = schema.safeParse({
            judul: data.get("judul"),
            isi: data.get("isi"),
            gambar: files
        });


        files.forEach((file: File) => {
            data.append("gambar", file);
        })


        if (!validation_res.success) {
            toast.error("Data tidak valid", { position: "top-right" });
            setErrors(validation_res.error?.flatten().fieldErrors);
            return;
        } 

        const res = await fetchCaller("berita", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
            body: data,
        });

        if (!res.ok) {
            toast.error("Galat saat menambahkan data", {
                position: "top-right",
            });

            return;
        }

        toast.success("Data Berita berhasil ditambahkan!", {
            position: "top-right",
        });

        setTimeout(() => window.location.reload(), 2000);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Berita" />
            <form
                onSubmit={handlePostData}
                className="gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark grid"
            >   
                <InputFields name="judul" title="Judul Berita" />
                <TextFields name="isi" title="Isi Berita" />
                <FilesFields setter={setFiles}  title="Gambar Berita" />
                

                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-2 mt-4">
                    {isPending ? (
                        <div className="flex gap-x-4">
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Membuat berita
                        </div>
                    ) : (
                        <>Buat Berita</>
                    )}
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default Page;
