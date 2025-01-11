"use client";

import Breadcrumb from "@/components/Breadcrumb";
import FilesFields from "@/components/Fields/FileFields";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { useStore } from "react-redux";

const ExchequerPage = () => {
    const state = useStore().getState();
    const servicesState = state.services;
    const [accountFile, setAccountFile] = useState([])
    const [skFile, setSktFile] = useState([])

    const handlePost = () => {

    }


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Penggantian Bendahara" />
            <form onSubmit={handlePost} className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <InputFields
                    title="Ditujukan Kepada"
                    autoCompleteData={servicesState.institutions.map(
                        (field) => field.nama,
                    )}
                    addItemPath="/institution/addData"
                />
                <SelectFields title="Bendahara Lama" name="bendahara_lama" options={[{name: "", value: ""}]} />
                <SelectFields title="Bendahara Baru" name="bendahara_baru" options={[{name: "", value: ""}]} />
                <InputFields title="Posisi yang akan diganti" />
                <FilesFields title="Dokumen Rekening"  setter={(file) => setAccountFile(file)}/>
                <FilesFields title="Dokumen Surat Keputusan"  setter={(file) => setAccountFile(file)}/>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 col-span-2"
                >
                    Ajukan Penggantian
                </button>
            </form>
        </DefaultLayout>
    );
};

export default ExchequerPage;
