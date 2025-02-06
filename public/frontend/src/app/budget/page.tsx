"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { DEFAULT_BUDGET_DATA } from "@/utils/constans";
import Table from "@/components/Table";
import { useDispatch, useStore } from "react-redux";
import { fetchBudget } from "@/services/common";


const Page: React.FC = () => {

    const dispatch = useDispatch()
    const store = useStore()
    const serviceState = store.getState().services

    const column = [
        {
            name: "Biaya",
            selector: (row: Record<string, string>) => row.biaya,
            sortable: true,
        }
    ]

    useEffect(() => {
            const syncBudgetData = async() => {
                dispatch(await fetchBudget())
            }
    
            syncBudgetData()
            
        }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data tingkat biaya" />
            <>
                <Table
                    data={serviceState.budgets}
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
