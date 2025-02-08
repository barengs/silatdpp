"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const Page: React.FC = () => {
    const [isPending, fetchCaller] = useFetch();
    const router = useRouter();
    const store = useStore();
    const authState = store.getState().auth;

    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        await fetchCaller("hak-akses", {
            method: "post",
            headers: {
                Authorization: authState.token,
            },
            body: data,
        })
            .then((res) => {

                if (res.ok) {
                    toast.success("Data otoritas berhasil ditambahkan!", {
                        position: "top-right",
                    });
                    router.push("/permissions");
                    return
                }

                toast.error("Gagal saat menambah data!", {
                    position: "top-right",
                });
            })

    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Hak akses" />
            <form
                onSubmit={handlePost}
                className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <InputFields title="Nama Otoritas" name="name" />
                <button
                    type="submit"
                    className="flex w-[300px] col-span-2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Tambah Otoritas
                </button>
            </form>
        </DefaultLayout>
    );
};

export default Page;
