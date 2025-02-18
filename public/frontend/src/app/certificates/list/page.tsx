"use client"

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { fetchCertificates } from "@/services/common";
import { setCertificates } from "@/store/servicesSlice";
import { DEFAULT_CERTIFICATE_DATA } from "@/utils/constans";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

const Page: React.FC = () => {

    const dispatch = useDispatch()
    const store = useStore()
    const [data, setData] = useState(store.getState().services.certificates)
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_CERTIFICATE_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Siswa",
            selector: (row: Record<string, string>) => row.nama_siswa,
            sortable: true,
        },
        {
            name: "Insititusi",
            selector: (row: Record<string, string>) => {
                const res = store.getState().services.institutions.filter(institution => row.institusi_id == institution.id)

                if (res.length == 0) return ""

                return res[0].nama
            },
            sortable: true,
        },
        {
            name: "Status",
            cell: (row: Record<string, string>) => (
                <div className={`text-white text-sm p-1.5 font-medium rounded-md ${row.status == "pengajuan" ? "bg-yellow-500" : "bg-green-500"}`}>
                    {row.status}
                </div>
            ),
            sortable: true,
        },
        {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleSelectedData(row)}
                >
                    Edit
                </button>
            ),
        },
    ]

    useEffect(() => {
                console.log(store.getState().services.certificates)
                const syncCertificateData = async() => {
                    dispatch(setCertificates(await fetchCertificates()))
                    setData(store.getState().services.certificates)
                }
        
                syncCertificateData()
                
            }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Pengajuan Ijazah" />
            <Table name="Data Pengajuan Perubahan Ijazah" column={columns} data={data} addButtonName="Ajukan Permohonan" addButtonLink="/certificates" />
            <Modal title="Edit Permohonan" url="/ijazah"  state={showPopup} stateSetter={setShowPopup} ableUpdate={true} ableDelete={false}>
                <InputFields title="Nama Siswa" name="nama_siswa" />
            </Modal>
        </DefaultLayout>
    )
}


export default Page;