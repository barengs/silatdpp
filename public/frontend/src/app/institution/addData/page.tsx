"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InstitutionAddData() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const router = useRouter()

    const handleStoreInput = (name: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePostData = async () => {

        const data = new FormData();
        Object.keys(formData).forEach(fieldKey => data.append(fieldKey, formData[fieldKey]));


        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi-tamu`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_USER_TOKEN}`,
                },
                body: data,
            });

            if (res.ok) {
                alert('Data Institusi berhasil ditambahkan');
                router.back(); // Redirect to guestBook page
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

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields
                    title="Nama Institusi"
                    onValueChange={(value) =>
                        handleStoreInput("nama", value)
                    }
                />
                <InputFields
                    title="Alamat Institusi"
                    onValueChange={(value) =>
                        handleStoreInput("alamat", value)
                    }
                />
                <InputFields
                    title="kontak Institusi"
                    onValueChange={(value) =>
                        handleStoreInput("kontak", value)
                    }
                />
            </div>
                <button
                    onClick={handlePostData}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Tambahkan Institusi
                </button>
        </DefaultLayout>
    );
}
