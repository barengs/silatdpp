"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchTransportation } from "@/services/common";
import { setTransportation } from "@/store/servicesSlice";
import { DEFAULT_TRANSPORTATION } from "@/utils/constans";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";

const Page: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_TRANSPORTATION);
    const store = useStore();
    const dispatch = useDispatch();

    const [data, setData] = useState(store.getState().services.transportation);

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

    useEffect(() => {
        const setTransportData = async () => {
            dispatch(setTransportation(await fetchTransportation()));
            setData(store.getState().services.transportation);
        };

        setTransportData();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Transportasi" />
            <Table
                data={data}
                column={columns}
                name="Data Trasportasi"
                addButtonLink="/transport/addData"
                addButtonName="Tambah Transportasi"
            />
            <Modal
                url={`transportasi/${selectedData.id}`}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Nama Transportasi"
                    name="nama"
                    defaultValue={selectedData.nama}
                />
            </Modal>
            <Modal
                url={`transportasi/${selectedData.id}`}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
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
