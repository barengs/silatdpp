"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import Form from "@/components/Forms";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useFetch from "@/hooks/useFetch";
import { useGetInstitutionsQuery } from "@/services/institution";
import { FormEvent, useState } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const Page: React.FC = () => {
    const [isPending, fetchCaller] = useFetch();
    const [files, setFiles] = useState<File[]>([]);
    const store = useStore();
    const authState = store.getState().auth;
    const [errors, setErrors] = useState({});

    const { data: institutionData } = useGetInstitutionsQuery();

    const schema = z.object({
        nama_siswa: z.string().min(1, "Harap Diisi"),
        nis: z.coerce.number().min(1, "Harap Diisi"),
        perubahan: z.string().min(1, "Harap Diisi"),
        no_ijazah: z.coerce.number().min(1, "Harap Diisi"),
        alasan: z.string().min(1, "Harap Diisi"),
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        formData.append("file", files[0]);

        const validation_res = schema
            .safeParse({
                nama_siswa: formData.get("nama_siswa"),
                nis: formData.get("nis"),
                perubahan: formData.get("perubahan"),
                no_ijazah: formData.get("nomor_ijazah"),
                alasan: formData.get("alasan"),
            })
            .error?.flatten().fieldErrors;

            
            if (validation_res) {
                toast.error("Formulir tidak valid", { position: "top-right" });
                setErrors(validation_res);
                
                return;
            }
            

            if (files.length == 0) {
                setErrors({file: ["Bukti kegiatan harus diisi"]})
                return
            }


        const res = await fetchCaller("ijazah", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
            body: formData,
        });

        if (!res.ok) {
            console.log(res);
            toast.error("Kesalahan saat mengirim data", {
                position: "top-right",
            });
            return;
        }

        toast.success("Berhasil mengajukan permhonan ijazah", {
            position: "top-right",
        });

        setTimeout(() => window.location.reload(), 3000);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Permohonan Perubahan Ijazah" />
            <Form onSubmit={handleSubmit}>
                <InputFields
                    title="Nama Siswa"
                    name="nama_siswa"
                    error={errors.nama_siswa ? errors.nama_siswa[0] : ""}
                />
                <InputFields
                    title="NIS"
                    type="number"
                    name="nis"
                    error={errors.nis ? errors.nis[0] : ""}
                />
                <SelectFields
                    title="Institusi"
                    name="institusi_id"
                    options={
                        institutionData
                            ? institutionData.data.map((institution) => {
                                  return {
                                      name: institution.nama,
                                      value: institution.id,
                                  };
                              })
                            : [{ name: "Tidak ada data", value: "" }]
                    }
                />
                <InputFields
                    title="Perubahan"
                    name="perubahan"
                    error={errors.perubahan ? errors.perubahan[0] : ""}
                />
                <InputFields
                    title="Nomor Ijazah"
                    name="nomor_ijazah"
                    type="number"
                    error={errors.no_ijazah ? errors.no_ijazah[0] : ""}
                />
                <TextFields
                    title="Alasan"
                    name="alasan"
                    error={errors.alasan ? errors.alasan[0] : ""}
                />
                <FilesFields
                    title="File"
                    setter={(files: File[]) => setFiles(files)}
                    multiple={false}
                    error={errors.file ? errors.file[0] : ""}
                />
                <button
                    className="col-span-2 flex w-max items-center justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                >
                    {isPending ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Mengajukan
                        </>
                    ) : (
                        <>Ajukan Permohonan</>
                    )}
                </button>
            </Form>
        </DefaultLayout>
    );
};

export default Page;
