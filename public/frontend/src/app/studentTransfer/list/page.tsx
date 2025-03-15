"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import SelectFields from "@/components/Fields/SelectFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { useGetInstitutionsQuery } from "@/services/institution";
import { useGetStudentTransferQuery } from "@/services/studentTransfer";
import { DEFAULT_STUDENT_TRANSFER_DATA } from "@/utils/constans";
import { useState } from "react";

const Page: React.FC = () => {
    const { data: studentTransferData } = useGetStudentTransferQuery();
    const { data: institutionData } = useGetInstitutionsQuery()

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_STUDENT_TRANSFER_DATA);

     const handleSelectedData = (data) => {
            setShowPopup(true);
            setSelectedData(data);
        };

    const columns = [
        {
            name: "Nama Siswa",
            selector: (row: typeof DEFAULT_STUDENT_TRANSFER_DATA) => row.nama_siswa,
            sortable: true,
        },
        {
            name: "Kelas",
            selector: (row: typeof DEFAULT_STUDENT_TRANSFER_DATA) => row.tingkat_kelas,
            sortable: true,
        },
        {
            name: "Jenis Kelamin",
            selector: (row: typeof DEFAULT_STUDENT_TRANSFER_DATA) =>
                row.jenis_kelamin == "l" ? "Laki-Laki" : "Perempuan",
            sortable: true,
        },
        {
            name: "Status Persetujuan",
            cell: (row: typeof DEFAULT_STUDENT_TRANSFER_DATA) => (
                <div
                    className={`${row.status ? "bg-green-500 text-white" : "bg-yellow-500 text-white"} rounded-md p-2 text-xs font-semibold`}
                >
                    {row.status ? "Surat disetujui" : "Sedang Menunggu"}
                </div>
            ),
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
            <Breadcrumb pageName="Daftar Pengajuan Pindah Sekolah" />
            <Table
                data={studentTransferData ? studentTransferData.data : []}
                column={columns}
                name="Data Siswa Pindahan"
                addButtonLink="/studentTransfer"
                addButtonName="Tambah Data"
                detailLink={{ name: "Pengaturan", to: "/studentTransfer" }}
            />
            <Modal
                url={`studentTransfer/${selectedData.id}`}
                title="Edit data"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
            >
                <InputFields
                    title="Nama Siswa"
                    name="nama_siswa"
                    defaultValue={selectedData.nama_siswa}
                />
                <InputFields
                    title="Nis"
                    name="nis"
                    defaultValue={selectedData.nis}
                />
                <SelectFields
                    title="Sekolah Asal"
                    name="sekolah_asal_id"
                    defaultValue={selectedData.sekolah_asal_id}
                    options={institutionData ? institutionData.data.map(institution => { return {name: institution.nama, value: institution.id}}) : []}
                />
                <SelectFields
                    title="Sekolah Tujuan"
                    name="sekolah_asal_id"
                    defaultValue={selectedData.sekolah_tujuan_id}
                    options={institutionData ? institutionData.data.map(institution => { return {name: institution.nama, value: institution.id}}) : []}
                />
                <InputFields
                    title="Tingkat Kelas"
                    name="tingkat_kelas"
                    defaultValue={selectedData.tingkat_kelas}
                />
                <InputFields
                    title="Nama Wali"
                    name="nama_wali"
                    defaultValue={selectedData.nama_wali}
                />
                <InputFields
                    title="Alamat Wali"
                    name="alamat_wali"
                    defaultValue={selectedData.alamat_wali}
                />
                <InputFields
                    title="Kontak Wali"
                    name="kontak_wali"
                    defaultValue={selectedData.kontak_wali}
                />
                <InputFields
                    title="Jenis Kelamin"
                    name="jenis_kelamin"
                    defaultValue={selectedData.jenis_kelamin}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
