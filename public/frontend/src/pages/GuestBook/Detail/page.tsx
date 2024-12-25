"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GUEST_BOOK_DEFAULT_DATA } from "../../../../utils/constans";

interface pageProps {
    params: {
        id: string;
    };
}


async function getData(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu/${id}`)

    if (!res.ok) return GUEST_BOOK_DEFAULT_DATA

    const data = await res.json()

    return data
}

const GuestBookDetail = ({ params }: pageProps) => {
    const [data, setData] = useState<typeof GUEST_BOOK_DEFAULT_DATA>(GUEST_BOOK_DEFAULT_DATA);

    const onValueChange = (value: string, name: string) => {
        setData(state => {
            state[name] = value;
            return state;
        });
    };


    useEffect(() => {

        const caller = async () =>{
            const detailData = await getData(params.id)
            setData(detailData.data)
            console.log(data)
        }

        caller()
    }, [])

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
            <Breadcrumb pageName="Detail Buku Tamu" />

            <div className="rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-2 gap-9">
                    <InputFields
                        title="Nama Tamu"
                        defaultValue={data.nama_tamu}
                        onValueChange={(value) =>
                            onValueChange(value, "nama_tamu")
                        }
                    />
                    <InputFields
                        title="Alamat"
                        defaultValue={data.alamat}
                        onValueChange={(value) =>
                            onValueChange(value, "alamat")
                        }
                    />
                    <InputFields
                        title="Nomor Telepon"
                        defaultValue={data.no_telpon}
                        onValueChange={(value) =>
                            onValueChange(value, "no_telpon")
                        }
                    />
                    <InputFields
                        title="Keperluan"
                        defaultValue={data.keperluan}
                        onValueChange={(value) => onValueChange(value, "keperluan")}
                    />
                    <InputFields
                        title="Divisi Tujuan"
                        defaultValue={data.divisi_id}
                        onValueChange={(value) =>
                            onValueChange(value, "divisi_id")
                        }
                    />
            
                </div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                    Perbarui Data
                </button>
            </div>
        </DefaultLayout>
    );
};

export default GuestBookDetail;
