"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { useState } from "react";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";
import { DEFAULT_PARTNERS_DATA } from "@/utils/constans";
import { useGetPartnersQuery, useUpdatePartnerMutation } from "@/services/partners";

const Partner = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_PARTNERS_DATA);

    const { data, isLoading } = useGetPartnersQuery()
    const [updatePartner] = useUpdatePartnerMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Rekan",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row: Record<string, string>) => row.alamat,
            sortable: true,
        },
        {
            name: "Kota",
            selector: (row: Record<string, string>) => row.kota,
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
            <Breadcrumb pageName="Data Rekan" />
            <Table
                name="Data Rekanan"
                column={columns}
                data={data ? data.data : []}
                addButtonName="Tambah Rekan"
                addButtonLink="/partners/addData"
                isLoading={isLoading}
            />
            <Modal
                idItem={selectedData.id}
                mutation={updatePartner}
                title="Edit Biaya"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
            >
                <InputFields
                    title="Nama Instansi Rekanan"
                    name="biaya"
                    defaultValue={selectedData.nama}
                />
                <InputFields
                    title="Alamat Instansi Rekanan"
                    name="biaya"
                    defaultValue={selectedData.alamat}
                />
                <InputFields
                    title="Kota Instansi Rekanan"
                    name="biaya"
                    defaultValue={selectedData.kota}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Partner;
