"use client"

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputFields from '@/components/Fields/InputFields'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { GuestBookGetInstance, InstitutionsDataTypes } from '@/types/pages/guest'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


interface dataProps {
    id: number;
    guestName: string;
    instutionName: string;
    instutionAddress: string;
    needs: string;
    position: string;
    contact: string;
}


export default function GuestBookDetail() {

    const [data, setData] = useState<GuestBookGetInstance>({
        id: 0,
        nama_tamu: "",
        alamat: "",
        no_telpon: "",
        institusi_tamu_id: "0",
        divisi_id: "0",
        keperluan: "",
        user_id: "0",
    })

    const [formData, setFormData] = useState({})


    // Will be removed
    const [institutionData, setInstitutionData] = useState<string[]>([])

    useEffect(() => {
        const getData = async() => {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi-tamu`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setInstitutionData(data.data.data)
                    }
                })
        }


        getData()
    }, [])


    // useEffect(() => console.log(institutionData), [institutionData])

    
    const handlePostData = async () => {

        const data = new FormData()
        
        
        Object.keys(formData).map(fieldKey => data.append(fieldKey, formData[fieldKey]))
        

        await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`, { 
            method: "post",
            body: JSON.stringify(formData)
        })
            .then(res => console.log(res))
    }


  return (
    <DefaultLayout>
            <Link href="/users" className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </Link>
            <Breadcrumb pageName="Tambah Tamu" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
               
                <div className="grid grid-cols-2 gap-3">
                    <InputFields 
                        title="Nama Tamu" 
                    
                    />
                    <InputFields
                        title="Alamat"
                    
                    />
                    <InputFields
                        title="No Telepon"
                      
                    />
                    <InputFields
                        title="Keperluan"
                   
                    />
                    <InputFields
                        title="Instansi Asal"
                        autoCompleteData={institutionData.map(field => field.nama)}
                       
                    />
                    <InputFields
                        title="Divisi Tujuan"
                       
                    />                    

                </div>

                <button onClick={handlePostData} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Tambahkan tamu
                </button>
            </div>
        </DefaultLayout>
  )
}
