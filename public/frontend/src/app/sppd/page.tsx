"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useStore } from "react-redux";

const SppdAddData: React.FC = () => {
    const [postData, setPostData] = useState<Record<string, unknown>>({
        file: [],
    });

    const router = useRouter();

    const store = useStore();
    const state = store.getState()
    const authState = state.auth;
    const servicesState = state.services;

    useEffect(() => console.log(servicesState), [])

    const handleDataChange = (name: string, value: unknown) => {
        setPostData((prevState) => {
            prevState[name] = value;
            return prevState;
        });
    };

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);

        console.log(formData);
        return;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/sppd`,
            {
                method: "post",
                body: formData,
                headers: {
                    Authorization: `Bearer ${authState.token}`,
                },
            },
        );

        if (res.ok) {
            alert("Berhasil mengajukan SPPD");
            router.push("/sppd");
            return;
        }

        console.log(res);
        alert("Galat pada prosess pengajuan");
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pengajuan SPPD" />

            <form
                onSubmit={handlePostData}
                className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <div className="flex lg:justify-end">
                    <Link
                        href="/sppd/list"
                        className="mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-sm text-white"
                    >
                        Histori SPPD
                    </Link>
                </div>
                <TextFields title="Deskripsi Kegiatan" name="maksud_kegiatan" />
                <InputFields title="Tempat Kegiatan" name="tempat_tujuan" />
                <InputFields title="Tempat Berangkat" name="tempat_berangkat" />
                <div className="flex gap-x-4">
                    <InputFields
                        title="Tanggal Berangkat"
                        name="tanggal_berangkat"
                        type="date"
                    />
                    <InputFields
                        title="Tanggal Sampai"
                        name="tanggal_kembali"
                        type="date"
                    />
                </div>
                <SelectFields
                    name="alat_transportasi_id"
                    options={servicesState.transportation.map((institution) => {
                        return {
                            name: institution.nama,
                            value: institution.id,
                        };
                    })}
                    title="Transportasi Perjalanan"
                />
                <SelectFields
                    name="tingkat_biaya_id"
                    title="Biaya Perjalanan"
                />
                <FilesFields
                    setter={(files: File[]) =>
                        handleDataChange("files", JSON.stringify(files))
                    }
                    title="Bukti Kegiatan"
                />
                <button
                    onClick={handlePostData}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Ajukan SPPD
                </button>
            </form>
        </DefaultLayout>
    );
};

export default SppdAddData;
