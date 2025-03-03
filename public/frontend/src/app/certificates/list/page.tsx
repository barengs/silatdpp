"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import {
    useGetCertificatesQuery,
    useUpdateCertificateMutation,
} from "@/services/certificates";
import { useGetInstitutionsQuery } from "@/services/institution";
import { DEFAULT_CERTIFICATE_DATA } from "@/utils/constans";
import { useState } from "react";

const Page: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_CERTIFICATE_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const { data: certificatesData } = useGetCertificatesQuery();
    const { data: institutionsData } = useGetInstitutionsQuery();
    const [updateCertificate] = useUpdateCertificateMutation();

    const columns = [
        {
            name: "Nama Siswa",
            selector: (row: Record<string, string>) => row.nama_siswa,
            sortable: true,
        },
        {
            name: "Insititusi",
            selector: (row: Record<string, string>) => {
                const res = institutionsData ? institutionsData.data.filter(
                    (institution) => row.institusi_id == institution.id,
                ) : [];

                if (res.length == 0) return "";

                return res[0].nama;
            },
            sortable: true,
        },
        {
            name: "Status",
            cell: (row: Record<string, string>) => (
                <div
                    className={`rounded-md p-1.5 text-sm font-medium text-white ${row.status == "pengajuan" ? "bg-yellow-500" : "bg-green-500"}`}
                >
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
    ];

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Pengajuan Ijazah" />
            <Table
                name="Data Pengajuan Perubahan Ijazah"
                column={columns}
                data={certificatesData ? certificatesData.data : []}
                addButtonName="Ajukan Permohonan"
                addButtonLink="/certificates"
            />
            <Modal
                title="Edit Permohonan"
                idItem={selectedData.id}
                mutation={updateCertificate}
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
                immutableData={[{name: "status", value: selectedData.status}]}
            >
                <InputFields title="Nama Siswa" name="nama_siswa" defaultValue={selectedData.nama_siswa} />
                <InputFields title="NIS" type="number" name="nis" defaultValue={selectedData.nis}/>
                <SelectFields title="Institusi" name="institusi_id" options={institutionsData ? institutionsData.data.map(institution => {
                    return {
                        name: institution.nama,
                        value: institution.id
                    }
                }) : [{ name: "Tidak ada data", value: ""}]} defaultValue={selectedData.institusi_id}/>
                 <InputFields title="Perubahan" name="perubahan" defaultValue={selectedData.perubahan}/>
                 <InputFields title="Nomor Ijazah" name="nomor_ijazah" type="number" defaultValue={selectedData.nomor_ijazah} />
                 <InputFields title="Alasan" name="alasan" defaultValue={selectedData.alasan}/>
                 <InputFields title="status" defaultValue={selectedData.status} disabled={true}  />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
