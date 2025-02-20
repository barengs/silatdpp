"use client"

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import Form from "@/components/Forms";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const Page: React.FC = () => {

    const [isPending, fetchCaller] = useFetch();
    const [files, setFiles] = useState<File[]>([])
    const store = useStore()
    const authState = store.getState().auth
    const serviceState = store.getState().services

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        formData.append("file", files[0]);

        const res = await fetchCaller('ijazah', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState.token}`,
                'Content-Type' : 'multipart/form-data'
            },
            body: formData
        })
        
        if (!res.ok) {
            console.log(res)
            toast.error("Kesalahan saat mengirim data", {
                position: 'top-right'
            })
            return
        }
        
        toast.success("Berhasil mengajukan permhonan ijazah", {
            position: 'top-right'
        })
        
        setTimeout(() => window.location.reload(), 3000);

    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Permohonan Perubahan Ijazah" />
            <Form onSubmit={handleSubmit}>
                <InputFields title="Nama Siswa" name="nama_siswa" />
                <InputFields title="NIS" type="number" name="nis" />
                <SelectFields title="Institusi" name="institusi_id" options={serviceState.institutions.map(institution => {
                    return {
                        name: institution.nama,
                        value: institution.id
                    }
                })} />
                <InputFields title="Perubahan" name="perubahan" />
                <InputFields title="Nomor Ijazah" name="nomor_ijazah" type="number" />
                <TextFields title="Alasan" name="alasan" />
                <FilesFields title="File" setter={(files: File[]) => setFiles(files)} multiple={false}/>
                <button
                    className="flex w-max justify-center items-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 col-span-2"
                    type="submit"
                >
                    {isPending ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Mengajukan
                        </>
                    ) : (
                        <>Ajukan Permohonan</>
                    )}
                </button>
            </Form>
        </DefaultLayout>
    )
}



export default Page;