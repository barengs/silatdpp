"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchBudget, fetchTransportation } from "@/services/common";
import { setBudget, setTransportation } from "@/store/servicesSlice";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { toast } from "react-toastify";

const SppdAddData: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const dispatch = useDispatch();

    const store = useStore();
    const state = store.getState();
    const authState = state.auth;
    const servicesState = state.services;

    useEffect(() => {
        const syncState = async () => {
            dispatch(setBudget(await fetchBudget()));
            dispatch(setTransportation(await fetchTransportation()));
        };

        syncState();
    }, []);

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append("files", JSON.stringify(files));

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
            toast.success("Berhasil mengajukan SPPD", { position: "top-right" })
            window.location.reload();
            return;
        }

        toast.error("Gagal mengajukan SPPD", { position: "top-right" })
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pengajuan SPPD" />
            <form
                onSubmit={handlePostData}
                className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Kegiatan" name="nama_kegiatan" />
                <InputFields title="Tempat Tujuan" name="tempat_tujuan" />
                <InputFields title="Tempat Kegiatan" name="tempat_kegiatan" />
                <InputFields title="Tempat Berangkat" name="tempat_berangkat" />
                <TextFields title="Deskripsi Kegiatan" name="maksud_kegiatan" />
                <SelectFields
                    title="Transportasi Perjalanan"
                    name="alat_transportasi_id"
                    options={servicesState.transportation.map(
                        (transportation) => {
                            return {
                                name: transportation.nama,
                                value: transportation.id,
                            };
                        },
                    )}
                />
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
                <InputFields
                    title="Tanggal Kegiatan"
                    name="tanggal_kegiatan"
                    type="date"
                />
               
                <SelectFields
                    title="Biaya Perjalanan"
                    name="tingkat_biaya_id"
                    options={servicesState.budgets.map((budget) => {
                        return {
                            name: budget.biaya,
                            value: budget.id,
                        };
                    })}
                />
                <FilesFields
                    setter={(files: File[]) => setFiles(files)}
                    title="Bukti Kegiatan"
                />
                <button
                    type="submit"
                    className="col-span-2 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Ajukan SPPD
                </button>
            </form>
        </DefaultLayout>
    );
};

export default SppdAddData;
