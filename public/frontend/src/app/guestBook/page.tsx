"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { getDateTime, trimText } from "@/utils/data";
import SelectFields from "@/components/Fields/SelectFields";
import { GUEST_BOOK_DEFAULT_DATA } from "@/utils/constans";
import { fetchGuestBook } from "@/services/common";
import { setGuestBook } from "@/store/servicesSlice";
import { toast } from "react-toastify";

export default function GuestBookDetail() {
    const router = useRouter();
    const state = useStore().getState();
    const authState = state.auth;
    const servicesState = state.services;
    const lastGuest = servicesState.guestBook[0] || GUEST_BOOK_DEFAULT_DATA;
    const dispatch = useDispatch()

    const [selectedInstitution, setSelectedInstitution] = useState("");

    const getInstitutionData = (name: string, type: string) => {
        if (!name) return;

        const res = servicesState.institutions;

        if (res.length == 0) return "";

        return res[0][type];
    };

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const currentInstitution = data.get("institusi_id");

        servicesState.institutions.map((institution) => {
            if (institution.nama == currentInstitution) {
                data.delete("institusi_id");
                data.append("institusi_id", institution.id);
            }
        });


        await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.token}`,
                },
                body: data,
            },
        )
            .then(() => {
                toast.success("Terima Kasih, telah mengisi!", {
                    position: 'top-right'
                })
                window.location.reload()
            })
            .catch(() => {
                toast.error("Galat saat menambahkan data!", {
                    position: "top-right"
                })
            })


    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Buku Tamu" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <form
                    onSubmit={handlePostData}
                    className="grid grid-cols-2 gap-4"
                >
                    <InputFields title="Nama Tamu" name="nama_tamu" />
                    <InputFields title="Alamat" name="alamat" />
                    <InputFields title="No Telepon" name="no_telpon" />
                    <InputFields title="Keperluan" name="keperluan" />
                    <InputFields
                        title="Instansi Asal"
                        name="institusi_id"
                        autoCompleteData={servicesState.institutions.map(
                            (field) => field.nama,
                        )}
                        onSelectedAutoComplete={(value: string) =>
                            setSelectedInstitution(value)
                        }
                        addItemPath="/institution/addData"
                    />
                    <SelectFields
                        title="Divisi Tujuan"
                        name="divisi_id"
                        options={servicesState.divisions.map((division) => {
                            return { name: division.nama, value: division.id };
                        })}
                    />
                    <InputFields
                        title="Alamat Instansi"
                        name="alamat_institusi"
                        defaultValue={getInstitutionData(
                            selectedInstitution,
                            "alamat",
                        )}
                    />
                    <InputFields
                        title="Kontak Instansi"
                        name="kontak_institusi"
                        defaultValue={getInstitutionData(
                            selectedInstitution,
                            "kontak",
                        )}
                    />
                    <button
                        type="submit"
                        className="col-span-2 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Tambahkan tamu
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-6 pb-12 shadow-default dark:border-strokedark dark:bg-boxdark">
                <h1 className="font-semibold text-black-2">Data terakhir</h1>
                <div className="flex items-center justify-between px-4">
                    {lastGuest ? (
                        <>
                            <p>{trimText(lastGuest["nama_tamu"], 20)}</p>
                            <p>{trimText(lastGuest["keperluan"], 20)}</p>
                            <p>
                                {trimText(
                                    lastGuest["institusi"]["nama"],
                                    20,
                                )}
                            </p>
                            <p>{lastGuest["divisi"]["nama"]}</p>
                            <p>{getDateTime(lastGuest["created_at"])}</p>
                        </>
                    ) : (
                        <p>Tidak ada pengunjung</p>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
