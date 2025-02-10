"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { exportRecomendation } from "@/utils/documents";
import Link from "next/link";
import { FormEvent } from "react";
import { useStore } from "react-redux";

const ExchequerPage = () => {
    const state = useStore().getState();
    const authState = state.auth;
    const servicesState = state.services;

    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/rekom`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${authState.token}`
            },
            body: formData
        })
        
        if (res.ok) {
            alert("Berhasil menambah data")
            exportRecomendation(formData.get("konten"))
            window.location.reload()
            return
        }

        alert("Gagal menambah data")
    }


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Pengajuan Rekomendasi" />
            <div className="flex justify-end">
                <Link href="/recomendation/list" className="text-sm bg-primary text-white rounded-md p-3">Histori Pengajuan</Link>
            </div>
            <form onSubmit={handlePost} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Nama Pejabat" name="nama_pejabat"/>
                <InputFields title="NIP Pejabat" name="nip_pejabat"/>
                <InputFields title="Nama Pejabat Pengganti" name="nama_pejabat_pengganti" />
                <InputFields title="NIP Pejabat Pengganti" name="nip_pejabat_pengganti"/>
                <InputFields title="Alamat Pejabat Pengganti" name="alamat_pejabat_pengganti"/>
                <InputFields title="Jabatan" name="jabatan"/>
                <SelectFields title="institusi" name="institusi_id" options={servicesState.institutions.map(institution => { 
                    return {name: institution.nama, value: institution.id}
                })} />
                <SelectFields title="Institusi Rekan" name="rekanan_id" options={servicesState.partners.map(partner => { 
                    return {name: partner.nama, value: partner.id}
                })} />
                <TextFields title="Konten" name="konten" />
                <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 col-span-2"
                >
                    Ajukan Penggantian
                </button>
            </form>
        </DefaultLayout>
    );
};

export default ExchequerPage;
