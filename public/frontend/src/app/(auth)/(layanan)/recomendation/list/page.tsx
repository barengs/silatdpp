"use client"

import Breadcrumb from "@/components/Breadcrumb";
import CustomModal from "@/components/CustomModal";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import TextFields from "@/components/Fields/TextFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import useFetch from "@/hooks/useFetch";
import { useGetInstitutionsQuery } from "@/services/institution";
import { useGetPartnersQuery } from "@/services/partners";
import { useGetRecomendationsQuery, useUpdateRecomendationMutation } from "@/services/recomendation";
import { RecomendationType } from "@/types/pages/recomendation";
import { DEFAULT_RECOMENDATION_DATA } from "@/utils/constans";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page: React.FC = () => {

    const {data: recomendationData} = useGetRecomendationsQuery({})
        const { data: institutionData } = useGetInstitutionsQuery({})
        const { data: partnerData } = useGetPartnersQuery({})

    // const [updateRecomendation] = useUpdateRecomendationMutation()

    const [selectedData, setSelectedData] = useState(DEFAULT_RECOMENDATION_DATA)
    const [showPopup, setShowPopup] = useState(false)

    const handleSelectedData = (data: RecomendationType) => {
        setSelectedData(data)
        setShowPopup(true)
    }


    const columns = [
        {
            name: "No Registrasi",
            selector: (row: RecomendationType) => row.noreg,
            sortable: true,
          },
        {
            name: "Nama Pejabat",
            selector: (row: RecomendationType) => row.nama_pejabat,
            sortable: true,
          },
        {
            name: "Nama Pejabat Pengganti",
            selector: (row: RecomendationType) => row.nama_pejabat_pengganti,
            sortable: true,
          },
        {
                    name: "Status Persetujuan",
                    cell: (row: RecomendationType) => (
                        <div className={`${row.status == "disetujui" ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'} p-2 text-xs font-semibold rounded-md`}>
                            {row.status == "disetujui" ? 'Surat disetujui' : 'Sedang Menunggu'}
                        </div>
                    )
                },
          {
            name: "Aksi",
            cell: (row: RecomendationType) => (
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleSelectedData(row)}
                >
                    Edit
                </button>
            ),
        },
    ]

    const approvalHandler = () => {
        
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Daftar Surat Rekom" />
            <Table name="Data Surat Rekomendasi" data={recomendationData ? recomendationData.data.data : []} column={columns} addButtonLink="/recomendation" addButtonName="Ajukan Permohonan"/>
            <CustomModal
                title="Detail Hak Akses"
                state={showPopup}
                stateSetter={setShowPopup}
                idItem={selectedData.id}
                buttons={[
                    <button
                        className="flex w-max justify-center rounded bg-blue-500 p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                        onClick={approvalHandler}
                    >
                        Proses Pengajuan
                    </button>,
                ]}
            >
                <InputFields title="Nama Pejabat" name="nama_pejabat" defaultValue={selectedData.nama_pejabat}/>
                <InputFields title="NIP Pejabat" name="nip_pejabat" defaultValue={selectedData.nip_pejabat}/>
                <InputFields title="Nama Pejabat Pengganti" name="nama_pejabat_pengganti" defaultValue={selectedData.nama_pejabat_pengganti}/>
                <InputFields title="NIP Pejabat Pengganti" name="nip_pejabat_pengganti" defaultValue={selectedData.nip_pejabat_pengganti}/>
                <InputFields title="Alamat Pejabat Pengganti" name="alamat_pejabat_pengganti" defaultValue={selectedData.alamat_pejabat_pengganti}/>
                <InputFields title="Jabatan" name="jabatan" defaultValue={selectedData.jabatan}/>
                <SelectFields title="institusi" name="institusi_id" options={institutionData ? institutionData.data.map(institution => { 
                    return {name: institution.nama, value: institution.id}
                }) : []} defaultValue={selectedData.institusi_id}/>
                <SelectFields title="Institusi Rekan" name="mitra_id" options={partnerData ? partnerData.data.map(partner => { 
                    return {name: partner.nama, value: partner.id}
                }) : []} defaultValue={selectedData.mitra_id}/>
                <TextFields title="Konten" name="konten" defaultValue={selectedData.konten}/>
            </CustomModal>
        </DefaultLayout>
    )
}

export default Page;