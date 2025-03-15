"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { FormEvent, useEffect, useState } from "react";
import { useStore } from "react-redux";
import { getDateTime, trimText } from "@/utils/data";
import SelectFields from "@/components/Fields/SelectFields";
import { toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";
import { z } from "zod";
import { useGetGuestBooksQuery } from "@/services/guestBook";
import { useGetInstitutionsQuery } from "@/services/institution";
import { useGetDivisionsQuery } from "@/services/division";

export default function GuestBookDetail() {
    const [isPending, fetchCaller] = useFetch();
    const [errors, setErrors] = useState({});
    const state = useStore().getState();
    const authState = state.auth;

    const { data: guestBooksData, isLoading } =
        useGetGuestBooksQuery();
    const { data: institutionsData } =
        useGetInstitutionsQuery();
    const { data: divisionsData } =
        useGetDivisionsQuery();

    const [lastGuest, setLastGuest] = useState(guestBooksData ? guestBooksData.data.data[0] : "");

    useEffect(() => setLastGuest(guestBooksData ? guestBooksData.data.data[0] : ""), [isLoading])

    const [selectedInstitution, setSelectedInstitution] = useState("");

    const schema = z.object({
        nama_tamu: z.string().min(1, "Nama tidak boleh kosong!"),
        alamat: z.string().min(1, "Alamat tidak boleh kosong!"),
        no_telpon: z.string().min(1, "Harap masukkan nomor telepon"),
        keperluan: z.string().min(1, "Keperluan tidak boleh kosong!"),
        institusi_id: z.string().min(1, "Institusi tidak boleh kosong!"),
        alamat_institusi: z
            .string()
            .min(1, "Alamat Institusi tidak boleh kosong!"),
        kontak_institusi: z
            .string()
            .min(1, "Kontak Institusi tidak boleh kosong!"),
    });

    const getInstitutionData = (name: string, type: string) => {
        if (!name) return;

        if (institutionsData.data.length == 0) return "";

        const res = institutionsData.data.filter(
            (institution) => institution.nama == name,
        );

        if (res.length == 0) return "";

        return res[0][type];
    };

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);
        const currentInstitution = data.get("institusi_id");
        
        const validation_res = schema
        .safeParse({
            nama_tamu: data.get("nama_tamu"),
            alamat: data.get("alamat"),
            no_telpon: data.get("no_telpon"),
            keperluan: data.get("keperluan"),
            institusi_id: data.get("institusi_id"),
            alamat_institusi: data.get("alamat_institusi"),
            kontak_institusi: data.get("kontak_institusi"),
        })

        
        if (!validation_res.success) {
            console.log(validation_res.error.flatten().fieldErrors)
            toast.error("Data tidak valid!", { position: "top-right" })
            setErrors(validation_res.error.flatten().fieldErrors);
            return;
        }

        institutionsData.data.forEach((institution) => {
            if (institution.nama === currentInstitution) {
                data.delete("institusi_id");
                data.append("institusi_id", institution.id);
            }
        });

        const res = await fetchCaller(`buku-tamu`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
            body: data,
        });



        if (!res.ok) {
            console.log(res);
            toast.error("Galat saat menambahkan data", {
                position: "top-right",
            });
            return;
        }

        toast.success("Terimakasih telah mengisi!", { position: "top-right" });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Buku Tamu" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <form
                    onSubmit={handlePostData}
                    className="grid grid-cols-2 gap-4"
                >
                    <InputFields
                        title="Nama Tamu"
                        name="nama_tamu"
                        error={errors.nama_tamu ? errors.nama_tamu[0] : ""}
                    />
                    <InputFields
                        title="Alamat"
                        name="alamat"
                        error={errors.alamat ? errors.alamat[0] : ""}
                    />
                    <InputFields
                        title="No Telepon"
                        name="no_telpon"
                        type="phone"
                        error={errors.no_telpon ? errors.no_telpon[0] : ""}
                    />
                    <InputFields
                        title="Keperluan"
                        name="keperluan"
                        error={errors.keperluan ? errors.keperluan[0] : ""}
                    />
                    <InputFields
                        title="Instansi Asal"
                        name="institusi_id"
                        defaultValue={selectedInstitution}
                        autoCompleteData={
                            institutionsData?.data.map((field) => field.nama) ||
                            []
                        }
                        onSelectedAutoComplete={(value: string) =>
                            setSelectedInstitution(value)
                        }
                        error={
                            errors.institusi_id ? errors.institusi_id[0] : ""
                        }
                    />
                    <SelectFields
                        title="Divisi Tujuan"
                        name="divisi_id"
                        options={
                            divisionsData
                                ? divisionsData.data.map((division) => {
                                      return {
                                          name: division.nama,
                                          value: division.id,
                                      };
                                  })
                                : []
                        }
                    />
                    <InputFields
                        title="Alamat Instansi"
                        name="alamat_institusi"
                        defaultValue={getInstitutionData(
                            selectedInstitution,
                            "alamat",
                        )}
                        error={
                            errors.alamat_institusi
                                ? errors.alamat_institusi[0]
                                : ""
                        }
                    />
                    <InputFields
                        title="Kontak Instansi"
                        name="kontak_institusi"
                        defaultValue={getInstitutionData(
                            selectedInstitution,
                            "kontak",
                        )}
                        error={
                            errors.kontak_institusi
                                ? errors.kontak_institusi[0]
                                : ""
                        }
                    />
                    <button
                        className="flex w-max items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-75"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Menambahkan Data
                            </>
                        ) : (
                            <>Kumpulkan Formulir</>
                        )}
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-6 pb-12 shadow-default dark:border-strokedark dark:bg-boxdark">
                <h1 className="font-semibold text-black-2">📌 Tamu Terakhir</h1>
                <div className="items-center justify-between px-4">
                {lastGuest ? (
                        <>
                            <p>👤 {lastGuest["nama_tamu"]}</p>
                            <p>📅 {lastGuest["keperluan"]}</p>
                            <p>
                                🏫
                                {lastGuest["institusi"]["nama"]}
                            </p>
                            <p>📚 {lastGuest["divisi"]["nama"]}</p>
                            <p>📆 {getDateTime(lastGuest["created_at"])}</p>
                        </>
                    ) : (
                        <p>Tidak ada pengunjung</p>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
