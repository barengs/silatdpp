"use client"

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import ListFields from "@/components/Fields/ListField";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStore } from "react-redux";



const SppdAddData: React.FC = () => {

    const [postData, setPostData] = useState<Record<string, unknown>>({
        file: [],
    })

    const router = useRouter()

    const store = useStore()
    const state = store.getState()

    const handleDataChange = (name: string, value: unknown) => {
        setPostData(prevState => {
            prevState[name] = value
            return prevState
        })
    }
    
    const handlePostData = async () => {
        const formData = new FormData()

        Object.keys(postData).map(keyName => formData.append(keyName, postData[keyName]))

        formData.append("user_id", state.userId)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sppd`, {
            method: 'post',
            body: formData,
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        })

        // if (res.ok) {
        //     alert("Berhasil mengajukan SPPD")
        //     router.push("/sppd")
        //     return
        // }

        // console.log(res)
        // alert("Galat pada prosess pengajuan")
        
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pengajuan SPPD" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex lg:justify-end">
                    <Link
                        href="/sppd/list"
                        className="mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-sm text-white"
                    >
                        Histori SPPD
                    </Link>
                </div>
                <InputFields title="Nama Kegiatan" onValueChange={(value: string) => handleDataChange("nama_kegiatan", value)} />
                <TextFields title="Deskripsi Kegiatan" onValueChange={(value: string) => handleDataChange("maksud_kegiatan", value)} />
                <InputFields title="Tempat Kegiatan" onValueChange={(value: string) => handleDataChange("tempat_kegiatan", value)} />
                <InputFields title="Tempat Tujuan" onValueChange={(value: string) => handleDataChange("tempat_tujuan", value)} />
                <div className="flex gap-x-4">
                    <InputFields title="Tanggal Berangkat" onValueChange={(value: string) => handleDataChange("tanggal_kegiatan", value)}type="date"/>
                    <InputFields title="Tanggal Sampai" onValueChange={(value: string) => handleDataChange("tanggal_kegiatan", value)}type="date"/>
                </div>
                <FilesFields setter={(files: File[]) => handleDataChange("files", JSON.stringify(files))} title="Bukti Kegiatan" />
                {/* <ListFields title="Peserta Perjalanan" addText="Tambah Peserta" dataURL="" /> */}
                <button
                    onClick={handlePostData}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Ajukan SPPD
                </button>
            </div>
        </DefaultLayout>
    )
}


export default SppdAddData;