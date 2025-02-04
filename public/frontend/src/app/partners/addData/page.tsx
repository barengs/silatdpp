"use client"

import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

const PartnerAddPage = () => {
    const [isPending, fetchCaller] = useFetch();
    const store = useStore()
    const authState = store.getState().auth
    const router = useRouter()

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        
        await fetchCaller('rekanan', {
            method: "post",
            body: formData,
            headers: {
                Authorization: authState.token
            }
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Berhasil menambahkan data", {
                        position: "top-right"
                    })
                    router.push("/partners")
                    return
                }
                
                toast.error("Galat saat menambah data", {
                    position: "top-right"
                })
            })
        
        
    }

    return (
        <DefaultLayout>
            <form onSubmit={handlePostData} className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Nama Rekan" name="nama" />
                <InputFields title="Alamat Rekan" name="alamat" />
                <InputFields title="Kota Rekan" name="kota" />
                <button
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                >
                    Tambahkan Rekan
                </button>
            </form>
        </DefaultLayout>
    )
}


export default PartnerAddPage;