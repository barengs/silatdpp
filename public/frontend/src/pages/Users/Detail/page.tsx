"use client"

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const options = [
    {
        name: "Admin",
        value: "admin",
    },

    {
        name: "Kepala Sekolah",
        value: "principal"
    },
    {
        name: "Admin Sekolah",
        value: "school_admin"
    }
]
// For development purpose


interface userDetailProps {
    params: {
        id: string;
    };
}


const UserDetail = ({ params }: userDetailProps) => {
    // const { id } = params;

    const [data, setData] = useState<{ id: string; nama: string; position: string; role: string; }>({id: "", nama: "", position: "", role: ""})

    const handleChangeValue = (value: string, name: string) => {
        setData(state => {
            state[name] = value
            return state
        })
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
            <Breadcrumb pageName="Detail Pengguna" />

            <div className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-9">
                        <InputFields
                         title="Nama Pengguna" 
                         defaultValue={data.nama} 
                         onValueChange={(value) => handleChangeValue(value, "nama")}
                         />
                        <InputFields
                            title="Jabatan"
                            defaultValue={data.position}
                            onValueChange={(value) => handleChangeValue(value, "position")}
                        />
                        <SelectFields title="Hak Akses" options={options} defaultValue="principal"/>

                    </div>
                <div className="space-y-6 mt-12">

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Perbarui Data
                </button>
                <button className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90">
                    Hapus Data
                </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default UserDetail;
