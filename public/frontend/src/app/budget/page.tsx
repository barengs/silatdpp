"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { DEFAULT_BUDGET_DATA } from "@/utils/constans";
import Table from "@/components/Table";
import { useDispatch, useStore } from "react-redux";
import { fetchBudget } from "@/services/common";
import { setBudget } from "@/store/servicesSlice";
import InputFields from "@/components/Fields/InputFields";
import Modal from "@/components/Modal";


const Page: React.FC = () => {

    const dispatch = useDispatch()
    const store = useStore()
    const [data, setData] = useState(store.getState().services.budgets)
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_BUDGET_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };


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

    useEffect(() => {
            const syncBudgetData = async() => {
                dispatch(setBudget(await fetchBudget()))
                setData(store.getState().services.budgets)
            }
    
            syncBudgetData()
            
        }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data tingkat biaya" />
            <>
                <Table
                    data={data}
                    column={column}
                    name="Budget"
                    addButtonLink="/budget/addData"
                    addButtonName="Tambah Biaya"
                />
            </>
            <Modal
                url={`biaya/${selectedData.id}`}
                title="Edit Biaya"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Jenis Biaya"
                    name="biaya"
                    defaultValue={selectedData.biaya}
                    disabled={true}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
