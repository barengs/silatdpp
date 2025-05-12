"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const BudgetAddDataPage: React.FC = () => {
    const [isPending, fetchCaller] = useFetch();
    const [errors, setErrors] = useState({})
    const storeState = useStore().getState();
    const router = useRouter();

    const formSchema = z.object({
        name: z.string().min(1, "Harap masukkan nama tingkat biaya")
    })

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        const form = new FormData(event.currentTarget);


        const validationResult = formSchema.safeParse({
            name: form.get("name")
        })

        if (!validationResult.success) {
            toast.error("Form tidak valid, harap periksa kembali", { position: 'top-right'})

            setErrors(validationResult.error.flatten().fieldErrors)
            return
        }

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
                    name="name"
                    error={errors.biaya ? errors.biaya[0] : ""}
                />
                <div className="col-span-2">
                    <button
                        className="w-max flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        {isPending ? (
                        <div className="flex gap-x-4">
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Menambahkan
                        </div>
                    ) : (
                        <>Tambah Biaya</>
                    )}
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default BudgetAddDataPage;
