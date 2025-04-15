"use client"

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useGetInstitutionsQuery } from "@/services/institution";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const Page: React.FC = () => {
    const [files, setFiles] = useState<File[]>([])
    const [errors, setErrors] = useState({})

    const [isPending, fetchCaller] = useFetch()

    const store = useStore()
    const state = store.getState()

    const formSchema = z.object({
        nama_siswa: z.string().min(1, "Harap Diisi"),
        nis: z.string().min(1, "Harap Diisi"),
        sekolah_asal_id: z.string().min(1, "Harap Diisi"),
        sekolah_tujuan_id: z.string().min(1, "Harap Diisi"),
        tingkat_kelas: z.string().min(1, "Harap Diisi"),
        nama_wali: z.string().min(1, "Harap Diisi"),
        alamat_wali: z.string().min(1, "Harap Diisi"),
        kontak_wali: z.string().min(1, "Harap Diisi"),
        jenis_kelamin: z.string().min(1, "Harap Diisi"),
        files: z.instanceof(File).array().nonempty("Berkas diperlukan")
      });

      const institutionSchema = z.object({
        sekolah_asal_id: z.string(),
        sekolah_tujuan_id: z.string()
      }).refine(schema => !(schema.sekolah_asal_id == schema.sekolah_tujuan_id), "Asal sekolah dan Tujuan sekolah tidak boleh sama")

    const { data: institutionData } = useGetInstitutionsQuery()

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        
        
        const validationRes = formSchema.safeParse({
            nama_siswa: data.get("nama_siswa"),
            nis: data.get("nis"),
            sekolah_asal_id: data.get("sekolah_asal_id"),
            sekolah_tujuan_id: data.get("sekolah_tujuan_id"),
            tingkat_kelas: data.get("tingkat_kelas"),
            nama_wali: data.get("nama_wali"),
            alamat_wali: data.get("alamat_wali"),
            kontak_wali: data.get("kontak_wali"),
            jenis_kelamin: data.get("jenis_kelamin"),
            files: files,
        })

        const institutionRes = institutionSchema.safeParse({
            sekolah_asal_id: data.get("sekolah_asal_id"),
            sekolah_tujuan_id: data.get("sekolah_tujuan_id")
        })

        
        if (!validationRes.success) {
            toast.error("Harap periksa data anda lagi", { position: "top-right"})
            
            setErrors(validationRes.error.flatten().fieldErrors)
            return
        }

        if (!institutionRes.success) {
            toast.error("Harap periksa data anda lagi", { position: "top-right"})
            
            setErrors(institutionRes.error.format())
            return
        }

        data.append("file", files[0])
        
        const res = await fetchCaller(`pindahan/siswa`, {
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
                <InputFields title="Nama Siswa" name="nama_siswa" error={errors.nama_siswa ? errors.nama_siswa[0] : ""}/>
                <InputFields title="NIS Siswa" name="nis" error={errors.nis ? errors.nis[0] : ""}/>
                <SelectFields title="Institusi Asal" name="sekolah_asal_id" options={institutionData ? institutionData.data.map(institution => { 
                    return {name: institution.nama, value: institution.id}
                }) : []} error={errors._errors ? errors._errors[0] : ""} />
                <SelectFields title="Institusi Tujuan" name="sekolah_tujuan_id" options={institutionData ? institutionData.data.map(institution => { 
                    return {name: institution.nama, value: institution.id}
                }) : []} error={errors._errors ? errors._errors[0] : ""}/>
                <SelectFields title="Jenis Kelamin" name="jenis_kelamin" options={[{name: "Laki-Laki", value: "L"}, {name: "Perempuan", value: "P"}]} />
                <InputFields title="Kelas" name="tingkat_kelas" error={errors.tingkat_kelas ? errors.tingkat_kelas[0] : ""}/>
                <InputFields title="Nama Wali" name="nama_wali" error={errors.nama_wali ? errors.nama_wali[0] : ""}/>
                <InputFields title="Alamat Wali" name="alamat_wali" error={errors.alamat_wali ? errors.alamat_wali[0] : ""}/>
                <InputFields title="Kontak Wali" name="kontak_wali" error={errors.kontak_wali ? errors.kontak_wali[0] : ""}/>
                <FilesFields multiple={false} title="Dokumen bukti" setter={(files: File[]) => setFiles(files)} error={errors.files ? errors.files[0] : ""}/>
                <button
                    type="submit"
                    className="w-max col-span-2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    {isPending ? (
                        <div className="flex gap-x-4">
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Mengajukan
                        </div>
                    ) : (
                        <> Ajukan Surat Pindah</>
                    )}
                   
                </button>
            </form>
        </DefaultLayout>
    )
}

export default Page;