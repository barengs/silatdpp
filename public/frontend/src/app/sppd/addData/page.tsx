"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";



const SppdAddData: React.FC = () => {

    const [postData, setPostData] = useState<Record<string, unknown>>({
        file: [],
        user_id: 1
    })

    const router = useRouter()

    const handleDataChange = (name: string, value: unknown) => {
        setPostData(prevState => {
            prevState[name] = value
            return prevState
        })
    }
    
    const handlePostData = async () => {
        const formData = new FormData()

        Object.keys(postData).map(keyName => formData.append(keyName, postData[keyName]))

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sppd`, {
            method: 'post',
            body: formData,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_CREDENTIAL}`
            }
        })

        if (res.ok) {
            alert("Berhasil mengajukan SPPD")
            router.push("/sppd")
            return
        }

        console.log(res)

        alert("Galat pada prosess pengajuan")
        
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pengajuan SPPD" />
            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Nama Kegiatan" onValueChange={(value: string) => handleDataChange("nama_kegiatan", value)} />
                <InputFields title="Tempat Kegiatan" onValueChange={(value: string) => handleDataChange("tempat_kegiatan", value)} />
                <InputFields title="Tanggal Kegiatan" onValueChange={(value: string) => handleDataChange("tanggal_kegiatan", value)}type="date"/>
                <FilesFields setter={(files: File[]) => handleDataChange("files", JSON.stringify(files))} title="Bukti Kegiatan" />
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