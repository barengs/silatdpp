"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchInsitution } from "@/services/common";
import { setInstitution } from "@/store/servicesSlice";
import { INSTITUTION_DEFAULT_DATA } from "@/utils/constans";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import InputFields from "@/components/Fields/InputFields";

const Institution: React.FC = () => {
    const dispatch = useDispatch();
    const store = useStore();
    const [data, setData] = useState(store.getState().services.institutions);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(INSTITUTION_DEFAULT_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Institusi",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat Institusi",
            selector: (row: Record<string, string>) => row.alamat,
            sortable: true,
        },
        {
            name: "Kontak Institusi",
            selector: (row: Record<string, string>) => row.kontak,
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
        const syncInstitutionData = async () => {
            dispatch(setInstitution(await fetchInsitution()));
            setData(store.getState().services.institutions);
        };

        syncInstitutionData();
    }, []);

    return (
        <DefaultLayout>
            <Table
                addButtonName="Tambah Institusi"
                addButtonLink="/institution/addData"
                name="Daftar Institusi"
                column={columns}
                data={data}
                detailLink={{ name: "Pengaturan", to: "/institution" }}
            />
            <Modal
                url={`institusi/${selectedData.id}`}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Nama Institusi"
                    name="nama"
                    defaultValue={selectedData.nama}
                />
                <InputFields
                    title="Alamat Institusi"
                    name="alamat"
                    defaultValue={selectedData.alamat}
                />
                <InputFields
                    title="Kontak Institusi"
                    name="Kontak"
                    defaultValue={selectedData.kontak}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Institution;
