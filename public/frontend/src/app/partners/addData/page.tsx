"use client"

import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useStore } from "react-redux";

const PartnerAddPage = () => {

    const store = useStore()
    const authState = store.getState().auth
    const router = useRouter()

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/rekanan`, {
            method: "post",
            body: formData,
            headers: {
                Authorization: authState.token
            }
        })
        
        if (res.ok) {
            alert("Berhasil menambahkan data")
            router.push("/partners")
            return
        }

        alert("Galat saat menambah data")
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