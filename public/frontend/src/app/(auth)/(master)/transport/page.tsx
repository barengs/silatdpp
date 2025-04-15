"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { DEFAULT_TRANSPORTATION } from "@/utils/constans";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";
import { useGetTransportationsQuery, useUpdateTransportationMutation } from "@/services/transporation";

const Page: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_TRANSPORTATION);

    const {data, isLoading } = useGetTransportationsQuery()
    const [updateTransport] = useUpdateTransportationMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Transportasi",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Jenis Transportasi",
            selector: (row: Record<string, string>) => row.jenis,
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
            <Breadcrumb pageName="Data Transportasi" />
            <Table
                data={data ? data.data : []}
                column={columns}
                name="Data Trasportasi"
                addButtonLink="/transport/addData"
                addButtonName="Tambah Transportasi"
                isLoading={isLoading}
            />
            <Modal
                idItem={selectedData.id}
                mutation={updateTransport}
                title="Edit Transportasi"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
            >
                <InputFields
                    title="Nama Transportasi"
                    name="nama"
                    defaultValue={selectedData.nama}
                />
                <InputFields
                    title="Jenis Transportasi"
                    name="jenis"
                    defaultValue={selectedData.jenis}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
