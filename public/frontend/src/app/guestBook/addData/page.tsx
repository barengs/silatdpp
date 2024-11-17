"use client"

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputFields from '@/components/Fields/InputFields'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Link from 'next/link'
import React, { useState } from 'react'


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

    const [data, setData] = useState<dataProps[]>([{
        id: 0,
        guestName: "",
        instutionName: "",
        instutionAddress: "",
        needs: "",
        position: "",
        contact: ""
    }])



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
            <Breadcrumb pageName="Detail Pengguna" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                {data.map((data, index) => (
                    <div key={index} className="flex flex-col gap-9">
                        <InputFields name="Nama Tamu" defaultValue={data.guestName} />
                        <InputFields
                            name="Nama Instusi"
                            defaultValue={data.instutionName}
                        />
                        <InputFields
                            name="Alamat Instusi"
                            defaultValue={data.instutionAddress}
                        />
                        <InputFields
                            name="Keperluan"
                            defaultValue={data.needs}
                        />
                        <InputFields
                            name="Jabatan"
                            defaultValue={data.position}
                        />
                        <InputFields
                            name="Kontak"
                            defaultValue={data.contact}
                        />

                    </div>
                ))}
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Tambahkan tamu
                </button>
            </div>
        </DefaultLayout>
  )
}
