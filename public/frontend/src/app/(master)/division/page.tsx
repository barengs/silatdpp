"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { useGetDivisionsQuery, useUpdateDivisionMutation } from "@/services/division";
import { DEFAULT_DIVISION_DATA } from "@/utils/constans";
import { useState } from "react";

const Division: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedData, setSelectedData] = useState(DEFAULT_DIVISION_DATA)
    
    const {data, isLoading } = useGetDivisionsQuery()
    const [updateDivision] = useUpdateDivisionMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true)
        setSelectedData(data)
    }


    const columns = [
        {
            name: "Nama Bidang",
            selector: (row: Record<string, string>) => row.nama,
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
            <Breadcrumb pageName="Data Divisi" />
            <Table
                data={data ? data.data : []}
                column={columns}
                name="Data Divisi"
                isLoading={isLoading}
                addButtonLink="/division/addData"
                addButtonName="Tambah Divisi"
            />
            <Modal idItem={selectedData.id} title="Edit Divisi" state={showPopup} stateSetter={setShowPopup} ableUpdate={true} mutation={updateDivision}>
                <InputFields title="Nama Divisi" name="nama" defaultValue={selectedData.nama}/>
            </Modal>
        </DefaultLayout>
    );
};

export default Division;
