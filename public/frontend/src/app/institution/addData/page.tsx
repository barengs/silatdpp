"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useStore } from "react-redux";

export default function InstitutionAddData() {
    const router = useRouter()
    const store = useStore()
    const authState = store.getState().auth


    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = event.currentTarget

        const data = new FormData(formData);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState.token}`,
                },
                body: data,
            });

            if (res.ok) {
                alert('Data Institusi berhasil ditambahkan');
                router.back();
            } else {
                console.error('Failed to submit data', await res.json());
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Institusi" />

            <form onSubmit={handlePostData} className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields
                    title="Nama Institusi"
                    name="nama"
                />
                <InputFields
                    title="Alamat Institusi"
                    name="alamat"
                />
                <InputFields
                    title="kontak Institusi"
                    name="kontak"
                />
                <button
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                >
                    Tambahkan Institusi
                </button>
            </form>
        </DefaultLayout>
    );
}
