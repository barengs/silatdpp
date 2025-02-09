"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Popup from "@/components/Popup";
import Table from "@/components/Table";
import { fetchDivision } from "@/services/common";
import { setDivision } from "@/store/servicesSlice";
import { DEFAULT_DIVISION_DATA } from "@/utils/constans";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

const Division: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedData, setSelectedData] = useState(DEFAULT_DIVISION_DATA)
    
    const dispatch = useDispatch();
    const store = useStore();
    const serviceState = store.getState().services;


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

    useEffect(() => {
        const syncDivisionData = async () => {
            dispatch(setDivision(await fetchDivision()));
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
            <Popup url="divisi" title="Edit Divisi" state={showPopup} stateSetter={setShowPopup}>
                <InputFields title="Nama Divisi" name="nama" defaultValue={selectedData.nama}/>
            </Popup>
        </DefaultLayout>
    );
};

export default Division;
