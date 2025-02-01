"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useStore } from "react-redux";

export default function InstitutionAddData() {
    const [isPending, fetchCaller] = useFetch();
    const router = useRouter();
    const store = useStore();
    const authState = store.getState().auth;

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = event.currentTarget;

        const data = new FormData(formData);

        fetchCaller("institusi", {
            method: "POST",
            headers: {
                Authorization: authState.token,
            },
            body: data,
        })
            .then(() => {
                alert("Data Institusi berhasil ditambahkan")
                router.push("/institution");
            })
            .catch(() => console.log("Error saat menambah data"));

    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Institusi" />

            <form
                onSubmit={handlePostData}
                className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Institusi" name="nama" />
                <InputFields title="Alamat Institusi" name="alamat" />
                <InputFields title="kontak Institusi" name="kontak" />
                <button
                    className="flex w-full items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-75 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Menambahkan Data
                        </>
                    ) : (
                        <>Tambahkan Institusi</>
                    )}
                </button>
            </form>
        </DefaultLayout>
    );
}
