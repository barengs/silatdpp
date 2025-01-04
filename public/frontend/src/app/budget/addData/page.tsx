"use client"

import Breadcrumb from "@/components/Breadcrumb"
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "react-redux";

const BudgetAddDataPage: React.FC = () => {

    const [formData, setFormData] = useState({})
    const storeState = useStore().getState()
    const router = useRouter()

    const handleChange = (name: string, value: string) => {
        setFormData(state => {
            state[name] = value
            return state
        })
    }


    const handlePostData = async () => {
        const form = new FormData()
        Object.keys(formData).map(keyName => form.append(keyName, formData[keyName]))

        await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/biaya`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${storeState.token}`
            },
            body: form
        })
            .then(res => {
                if (res.ok) {
                    alert("Sukses menambahkan data baru")
                    router.push("/budget")
                    return
                }

                alert("Gagal menambahkan data baru")
            })
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Data Biaya" />
            <div className="grid grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields onValueChange={(value: string) => handleChange("biaya", value)} title="Tingkat Biaya" />
                <button
                    onClick={handlePostData}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 col-span-2"
                >
                    Tambahkan Biaya
                </button>
            </div>
        </DefaultLayout>
    )
}


export default BudgetAddDataPage;