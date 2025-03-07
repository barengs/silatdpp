"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { DEFAULT_BUDGET_DATA } from "@/utils/constans";
import Table from "@/components/Table";
import InputFields from "@/components/Fields/InputFields";
import Modal from "@/components/Modal";
import { useGetBudgetsQuery, useUpdateBudgetMutation } from "@/services/budget";


const Page: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_BUDGET_DATA);

    const { data, isLoading } = useGetBudgetsQuery()
    const [updateBudget] = useUpdateBudgetMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    useEffect(() => console.log(data), [data])


    const column = [
        {
            name: "Jenis Biaya",
            selector: (row: Record<string, string>) => row.biaya,
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

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data tingkat biaya" />
            <>
                <Table
                    data={data ? data.data : []}
                    column={column}
                    name="Budget"
                    addButtonLink="/budget/addData"
                    addButtonName="Tambah Biaya"
                    isLoading={isLoading}
                />
            </>
            <Modal
                idItem={selectedData.id}
                mutation={updateBudget}
                ableUpdate={true}
                title="Edit Biaya"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Jenis Biaya"
                    name="biaya"
                    defaultValue={selectedData.biaya}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
