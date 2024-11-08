"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";

// For development purpose
function getData() {
    return [
        {
            id: "1",
            nama: "Alvin Setya Pranata",
            position: "Kepala Dinas",
            role: "Admin",
        },
    ];
}


interface userDetailProps {
    params: {
        slug: string;
    };
}

const UserDetail = ({ params }: userDetailProps) => {
    const { slug } = params;

    const [data, setData] = useState<{ id: string; nama: string; position: string; role: string; }[]>([{id: "", nama: "", position: "", role: ""}])


    useEffect(() => {
      setData(getData())
    })


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Detail Pengguna" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                {data.map((data, index) => (
                    <div key={index} className="flex flex-col gap-9">
                        <InputFields name="Nama" defaultValue={data.nama} />
                        <InputFields
                            name="Jabatan"
                            defaultValue={data.position}
                        />
                        <InputFields name="Role" defaultValue={data.role} />
                    </div>
                ))}
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Perbarui Data
                </button>
            </div>
        </DefaultLayout>
    );
};

export default UserDetail;
