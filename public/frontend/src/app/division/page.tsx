"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Popup from "@/components/Popup";
import Table from "@/components/Table";
import { fetchDivision } from "@/services/common";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

const Division: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false)
    const dispatch = useDispatch();
    const store = useStore();
    const serviceState = store.getState().services;

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
                    onClick={() => setShowPopup(true)}
                >
                    Edit
                </button>
            ),
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
            <Popup state={showPopup}>
                <InputFields title="Nama Divisi" name="nama" />
            </Popup>
        </DefaultLayout>
    );
};

export default Division;
