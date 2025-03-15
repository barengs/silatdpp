"use client"

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetInstitutionsQuery } from "@/services/institution";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const Page: React.FC = () => {
    const [files, setFiles] = useState<File[]>([])
    const store = useStore()
    const state = store.getState()


    const { data: institutionData } = useGetInstitutionsQuery()

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        data.append("files", files)

        console.log(data)
    
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/pindahan/siswa`, {
            method: 'post',
            body: data,
            headers: {
                Authorization: `Bearer ${state.auth.token}`
            }
        }) 


        if (!res.ok) {
            console.log(res)
            toast.error("Gagal mengajukan", { position: 'top-right'})
            return
        }

        toast.success("Berhasil mengajukan", { position: 'top-right'})

        setTimeout(() => window.location.reload(), 3000)
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pengajuan Siswa Pindah" />
            <form className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark" onSubmit={onSubmitHandler}>
                <InputFields title="Nama Siswa" name="nama_siswa" />
                <InputFields title="NIS Siswa" name="nis" />
                <SelectFields title="Institusi Asal" name="sekolah_asal_id" options={institutionData ? institutionData.data.map(institution => { 
                    return {name: institution.nama, value: institution.id}
                }) : []} />
                <SelectFields title="Institusi Tujuan" name="sekolah_tujuan_id" options={institutionData ? institutionData.data.map(institution => { 
                    return {name: institution.nama, value: institution.id}
                }) : []} />
                <InputFields title="Kelas" name="tingkat_kelas"/>
                <InputFields title="Nama Wali" name="nama_wali" />
                <InputFields title="Alamat Wali" name="alamat_wali"/>
                <InputFields title="Kontak Wali" name="kontak_wali"/>
                <FilesFields title="Dokumen bukti" setter={(files: File[]) => setFiles(files)}/>
                <button
                    type="submit"
                    className="w-max col-span-2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Ajukan Surat Pindah
                </button>
            </form>
        </DefaultLayout>
    )
}

export default Page;