"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const BudgetAddDataPage: React.FC = () => {
    const [, fetchCaller] = useFetch();
    const storeState = useStore().getState();
    const router = useRouter();

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const form = new FormData(event.currentTarget);

        await fetchCaller("biaya", {
            method: "post",
            headers: {
                Authorization: `Bearer ${storeState.token}`,
            },
            body: form,
        }).then((res) => {
            if (res.ok) {
                toast.success("Data biaya telah ditambahkan", {
                    position: "top-right",
                });
                router.push("/budget");
                return;
            }

            toast.error("Gagal menambahkan data!", {
                position: "top-right",
            });
        });
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Data Biaya" />
            <form onSubmit={handlePostData} className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields
                    title="Tingkat Biaya"
                    name="biaya"
                />
                <button
                    className="col-span-2 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Tambahkan Biaya
                </button>
            </form>
        </DefaultLayout>
    );
};

export default BudgetAddDataPage;
