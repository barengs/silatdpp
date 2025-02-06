"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchDivision } from "@/services/common";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

const Division: React.FC = () => {
    const dispatch = useDispatch();
    const store = useStore();
    const serviceState = store.getState().services;

    const columns = [
        {
            name: "Nama Bidang",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
    ];

    useEffect(() => {
        const syncDivisionData = async () => {
            dispatch(await fetchDivision());
        };

        syncDivisionData();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Divisi" />
            <Table
                data={serviceState.divisions}
                column={columns}
                name="Data Divisi"
                addButtonLink="/division/addData"
                addButtonName="Tambah Divisi"
            />
        </DefaultLayout>
    );
};

export default Division;
