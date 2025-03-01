"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { INSTITUTION_DEFAULT_DATA } from "@/utils/constans";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import InputFields from "@/components/Fields/InputFields";
import { useGetInstitutionsQuery } from "@/services/institution";

const Institution: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(INSTITUTION_DEFAULT_DATA);
    const {data, isLoading } = useGetInstitutionsQuery()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Institusi",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat Institusi",
            selector: (row: Record<string, string>) => row.alamat,
            sortable: true,
        },
        {
            name: "Kontak Institusi",
            selector: (row: Record<string, string>) => row.kontak,
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
            <Table
                addButtonName="Tambah Institusi"
                addButtonLink="/institution/addData"
                name="Daftar Institusi"
                column={columns}
                data={data ? data.data : []}
                detailLink={{ name: "Pengaturan", to: "/institution" }}
                isLoading={isLoading}
            />
            <Modal
                url={`institusi/${selectedData.id}`}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Nama Institusi"
                    name="nama"
                    defaultValue={selectedData.nama}
                    disabled={true}
                />
                <InputFields
                    title="Alamat Institusi"
                    name="alamat"
                    defaultValue={selectedData.alamat}
                    disabled={true}
                />
                <InputFields
                    title="Kontak Institusi"
                    name="kontak"
                    defaultValue={selectedData.kontak}
                    disabled={true}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Institution;
