"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { DEFAULT_BUDGET_DATA } from "@/utils/constans";
import Table from "@/components/Table";
import { useDispatch, useStore } from "react-redux";
import { fetchBudget } from "@/services/common";
import { setBudget } from "@/store/servicesSlice";


const Page: React.FC = () => {

    const dispatch = useDispatch()
    const store = useStore()
    const [data, setData] = useState(store.getState().services.budgets)

    const column = [
        {
            name: "Biaya",
            selector: (row: Record<string, string>) => row.biaya,
            sortable: true,
        }
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
        </DefaultLayout>
    );
};

export default Page;
