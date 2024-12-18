"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface dataProps {
    id: number;
    guestName: string;
    instutionName: string;
    instutionAddress: string;
    needs: string;
    position: string;
    contact: string;
}

interface pageProps {
    params: {
        id: string;
    };
}

const GuestBookDetail = ({ params }: pageProps) => {
    const [data, setData] = useState<dataProps>({
        id: 0,
        guestName: "",
        instutionName: "",
        instutionAddress: "",
        needs: "",
        position: "",
        contact: "",
    });

    const onValueChange = (value: string, name: string) => {
        setData((state) => {
            state[name] = value;
            return state;
        });
    };

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
                        defaultValue={data.guestName}
                        onValueChange={(value) =>
                            onValueChange(value, "guestName")
                        }
                    />
                    <InputFields
                        title="Nama Instusi"
                        defaultValue={data.instutionName}
                        onValueChange={(value) =>
                            onValueChange(value, "instutionName")
                        }
                    />
                    <InputFields
                        title="Alamat Instusi"
                        defaultValue={data.instutionAddress}
                        onValueChange={(value) =>
                            onValueChange(value, "instutionAddress")
                        }
                    />
                    <InputFields
                        title="Keperluan"
                        defaultValue={data.needs}
                        onValueChange={(value) => onValueChange(value, "needs")}
                    />
                    <InputFields
                        title="Jabatan"
                        defaultValue={data.position}
                        onValueChange={(value) =>
                            onValueChange(value, "position")
                        }
                    />
                    <InputFields
                        title="Kontak"
                        defaultValue={data.contact}
                        onValueChange={(value) =>
                            onValueChange(value, "contact")
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
