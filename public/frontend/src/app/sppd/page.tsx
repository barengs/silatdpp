"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetBudgetsQuery } from "@/services/budget";
import { useGetTransportationsQuery } from "@/services/transporation";
import React, { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const SppdAddData: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState({});

    const store = useStore();
    const state = store.getState();
    const authState = state.auth;

    const baseSchema = z.object({
        nama_kegiatan: z.string().min(1, "Harap diisi"),
        tempat_tujuan: z.string().min(1, "Harap diisi"),
        tempat_kegiatan: z.string().min(1, "Harap diisi"),
        tempat_berangkat: z.string().min(1, "Harap diisi"),
        maksud_kegiatan: z.string().min(1, "Harap diisi"),
        alat_transportasi_id: z.string().min(1, "Harap diisi"),
        tanggal_berangkat: z.string().min(1, "Harap diisi"),
        tanggal_kembali: z.string().min(1, "Harap diisi"),
        tanggal_kegiatan: z.string().min(1, "Harap diisi"),
        biaya_id: z.string().min(1, "Harap diisi"),
        files: z.instanceof(File).array().nonempty("Berkas diperlukan"),
    });

    const dateValidationSchema = z
        .object({
            tanggal_berangkat: z.preprocess(
                (val) => new Date(val as string),
                z.date(),
            ),
            tanggal_kembali: z.preprocess(
                (val) => new Date(val as string),
                z.date(),
            ),
        })
        .refine((data) => data.tanggal_berangkat <= data.tanggal_kembali, {
            message: "Tanggal berangkat tidak boleh lebih dari tanggal kembali",
            path: ["tanggal_berangkat"],
        });

    const { data: budgetsData } = useGetBudgetsQuery();
    const { data: transportationData } = useGetTransportationsQuery();

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        console.log(formData.get("nama_kegiatan"));

        // Validate required fields
        const validationRes = baseSchema.safeParse({
            nama_kegiatan: formData.get("nama_kegiatan"),
            tempat_tujuan: formData.get("tempat_tujuan"),
            tempat_kegiatan: formData.get("tempat_kegiatan"),
            tempat_berangkat: formData.get("tempat_berangkat"),
            maksud_kegiatan: formData.get("maksud_kegiatan"),
            alat_transportasi_id: formData.get("alat_transportasi_id"),
            tanggal_berangkat: formData.get("tanggal_berangkat"),
            tanggal_kembali: formData.get("tanggal_kembali"),
            tanggal_kegiatan: formData.get("tanggal_kegiatan"),
            biaya_id: formData.get("biaya_id"),
            files: files,
        });

        if (!validationRes.success) {
            toast.error("Harap periksa kembali form", {
                position: "top-right",
            });

            setErrors(validationRes.error.flatten().fieldErrors);

            return;
        }

        const dateValidationRes = dateValidationSchema.safeParse({
            tanggal_berangkat: formData.get("tanggal_berangkat"),
            tanggal_kembali: formData.get("tanggal_kembali"),
        });

        if (!dateValidationRes.success) {
            toast.error("Harap periksa kembali form", {
                position: "top-right",
            });

            setErrors(dateValidationRes.error.flatten().fieldErrors);

            return;
        }

        formData.append("files", files);

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

        if (!res.ok) {
            console.log(res);
            toast.error("Gagal mengajukan SPPD", { position: "top-right" });
            return;
        }

        toast.success("Berhasil mengajukan SPPD", { position: "top-right" });
        setTimeout(() => window.location.reload(), 3000);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pengajuan SPPD" />
            <form
                onSubmit={handlePostData}
                className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark lg:grid lg:grid-cols-2"
            >
                <InputFields
                    title="Nama Kegiatan"
                    name="nama_kegiatan"
                    error={errors.nama_kegiatan ? errors.nama_kegiatan[0] : ""}
                />
                <InputFields
                    title="Tempat Tujuan"
                    name="tempat_tujuan"
                    error={errors.tempat_tujuan ? errors.tempat_tujuan[0] : ""}
                />
                <InputFields
                    title="Tempat Kegiatan"
                    name="tempat_kegiatan"
                    error={
                        errors.tempat_kegiatan ? errors.tempat_kegiatan[0] : ""
                    }
                />
                <InputFields
                    title="Tempat Berangkat"
                    name="tempat_berangkat"
                    error={
                        errors.tempat_berangkat
                            ? errors.tempat_berangkat[0]
                            : ""
                    }
                />
                <TextFields
                    title="Deskripsi Kegiatan"
                    name="maksud_kegiatan"
                    error={
                        errors.maksud_kegiatan ? errors.maksud_kegiatan[0] : ""
                    }
                />
                <SelectFields
                    title="Transportasi Perjalanan"
                    name="alat_transportasi_id"
                    options={
                        transportationData
                            ? transportationData.data.map((transportation) => ({
                                  name: transportation.nama,
                                  value: transportation.id,
                              }))
                            : []
                    }
                    error={
                        errors.alat_transportasi_id
                            ? errors.alat_transportasi_id[0]
                            : ""
                    }
                />
                <div className="flex gap-x-4">
                    <InputFields
                        title="Tanggal Berangkat"
                        name="tanggal_berangkat"
                        type="date"
                        error={
                            errors.tanggal_berangkat
                                ? errors.tanggal_berangkat[0]
                                : ""
                        }
                    />
                    <InputFields
                        title="Tanggal Sampai"
                        name="tanggal_kembali"
                        type="date"
                        error={
                            errors.tanggal_kembali
                                ? errors.tanggal_kembali[0]
                                : ""
                        }
                    />
                </div>
                <InputFields
                    title="Tanggal Kegiatan"
                    name="tanggal_kegiatan"
                    type="date"
                    error={
                        errors.tanggal_kegiatan
                            ? errors.tanggal_kegiatan[0]
                            : ""
                    }
                />
                <SelectFields
                    title="Biaya Perjalanan"
                    name="biaya_id"
                    options={
                        budgetsData
                            ? budgetsData.data.map((budget) => ({
                                  name: budget.name,
                                  value: budget.id,
                              }))
                            : []
                    }
                    error={errors.biaya_id ? errors.biaya_id[0] : ""}
                />
                <FilesFields
                    setter={(files: File[]) => setFiles(files)}
                    title="Bukti Kegiatan"
                    error={errors.files ? errors.files[0] : ""}
                />

                <div className="flex gap-x-4">
                    <button
                        type="submit"
                        className="col-span-2 w-max justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Batalkan Pengajuan
                    </button>
                    <button
                        type="submit"
                        className="col-span-2 w-max justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Ajukan SPPD
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default SppdAddData;
