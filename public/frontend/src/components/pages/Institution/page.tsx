"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import { INSTITUTION_DEFAULT_DATA } from "@/utils/constans";
import InputFields from "@/components/Fields/InputFields";

const InstutionsPage: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(INSTITUTION_DEFAULT_DATA);

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

    // DEVELOPMENT PURPOSE

    return (
        <>
            <Breadcrumb pageName="Data Institusi" />
            <Table
                addButtonName="Tambah Institusi"
                addButtonLink="/institution/addData"
                name="Daftar Institusi"
                column={columns}
                data={data}
                detailLink={{ name: "Pengaturan", to: "/institution" }}
            />
            <Modal
                url={`divisi/${selectedData.id}`}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Nama Divisi"
                    name="nama"
                    defaultValue={selectedData.nama}
                />
            </Modal>
        </>
    );
};

export default InstutionsPage;
