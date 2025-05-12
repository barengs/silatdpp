"use client"

import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const PartnerAddPage = () => {
    const [isPending, fetchCaller] = useFetch();
    const store = useStore()
    const authState = store.getState().auth
    const router = useRouter()
    const [errors, setErrors] = useState({})

    const formSchema = z.object({
        nama: z.string().min(1, "Harap masukkan nama mitra"),
        alamat: z.string().min(1, "Harap masukkan alamat mitra"),
        kota: z.string().min(1, "Harap masukkan kota mitra"),
    })

    const handlePostData = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const validationRes = formSchema.safeParse({
            nama: formData.get("nama"),
            alamat: formData.get("alamat"),
            kota: formData.get("kota")
        })

        if (!validationRes.success) {
            toast.error("Form tidak valid, harap periksa kembali", { position: 'top-right'})

            setErrors(validationRes.error.flatten().fieldErrors)

            return
        }
        
        await fetchCaller('mitra', {
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
            <form onSubmit={handlePostData} className="flex flex-col lg:grid lg:grid-cols-2 gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields title="Nama Rekan" name="nama" error={errors.nama ? errors.nama[0] : ""}/>
                <InputFields title="Alamat Rekan" name="alamat" error={errors.alamat ? errors.alamat[0] : ""}/>
                <InputFields title="Kota Rekan" name="kota" error={errors.kota ? errors.kota[0] : ""} />
                <button
                    className="flex w-max col-span-2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                >
                    {isPending ? (
                        <div className="flex gap-x-4">
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Menambahkan
                        </div>
                    ) : (
                        <>Tambah Mitra</>
                    )}
                </button>
            </form>
        </DefaultLayout>
    )
}


export default PartnerAddPage;