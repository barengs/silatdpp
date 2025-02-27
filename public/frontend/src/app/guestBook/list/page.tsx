"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchGuestBook } from "@/services/common";
import { GUEST_BOOK_DEFAULT_DATA } from "@/utils/constans";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import InputFields from "@/components/Fields/InputFields";
import { setGuestBook } from "@/store/servicesSlice";

const GuestBookPage: React.FC = () => {
    const dispatch = useDispatch();
    const store = useStore();

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(GUEST_BOOK_DEFAULT_DATA);
    const [data, setData] = useState(store.getState().services.guestBook)

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Tamu",
            selector: (row: Record<string, string>) => row.nama_tamu,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row: Record<string, string>) => row.alamat,
            sortable: true,
        },
        {
            name: "No Telpon",
            selector: (row: Record<string, string>) => row.no_telpon,
            sortable: true,
        },
        {
            name: "Keperluan",
            selector: (row: Record<string, string>) => row.keperluan,
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
        const syncGuestBookData = async () => {
            dispatch(setGuestBook(await fetchGuestBook()));
            setData(store.getState().services.guestBook);
        };

        syncGuestBookData();
    }, []);

    return (
        <DefaultLayout>
            <Table
                addButtonName="Tambah Tamu"
                addButtonLink="/guestBook"
                name="Daftar Tamu"
                column={columns}
                data={data}
                detailLink={{ name: "Pengaturan", to: "/guestBook" }}
                excludes={[
                    "id",
                    "created_at",
                    "updated_at",
                    "institusi_tamu_id",
                    "divisi_id",
                    "user",
                    "user_id",
                ]}
            />
            <Modal
                url={`buku-tamu/${selectedData.id}`}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
                ableDelete={true}
            >
                <InputFields
                    title="Nama Tamu"
                    name="nama"
                    defaultValue={selectedData.nama_tamu}
                    disabled={true}
                />
                <InputFields
                    title="Alamat Tamu"
                    name="alamat"
                    defaultValue={selectedData.alamat}
                    disabled={true}
                />
                <InputFields
                    title="No Telepon"
                    name="Kontak"
                    defaultValue={selectedData.no_telpon}
                    disabled={true}
                />
                <InputFields
                    title="Keperluan"
                    name="Kontak"
                    defaultValue={selectedData.keperluan}
                    disabled={true}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default GuestBookPage;
