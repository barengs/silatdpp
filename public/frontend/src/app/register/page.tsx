"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { FormEvent } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const Page: React.FC = () => {
    const store = useStore();
    const authState = store.getState().auth;
    const serviceState = store.getState().services;
    const [isPending, fetchCaller] = useFetch();

    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const res = await fetchCaller("register", {
            method: "post",
            body: form,
            headers: {
                Authorization: authState.token,
            },
        })
            .then(() => {
                toast.success("Karywan baru telah ditambahkan!", {
                    position: "top-right",
                });

                setTimeout(() => {
                    route.push("/user/list")
                }, 1000);
            })
            .catch(() => {
                toast.error("Galat saat menambahkan karyawan!", {
                    position: "top-right",
                });
            });
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Karyawan" />
            <form
                onSubmit={handlePost}
                className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Karyawan" name="name" />
                <InputFields title="Email Karyawan" name="email" />
                <InputFields title="Password" name="password" type="password" />
                <InputFields
                    title="Konfirmasi Password"
                    name="password_confirmation"
                    type="password"
                />
                <SelectFields title="Sebagai" name="roles" options={serviceState.roles} />
                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-75"
                >
                    {isPending ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Mendaftarkan pengguna baru
                        </>
                    ) : (
                        <>Tambah Pengguna</>
                    )}
                </button>
            </form>
        </DefaultLayout>
    );
};

export default Page;
