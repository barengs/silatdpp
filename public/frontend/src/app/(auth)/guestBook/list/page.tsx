"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { GUEST_BOOK_DEFAULT_DATA } from "@/utils/constans";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import InputFields from "@/components/Fields/InputFields";
import { useDeleteGuestBookMutation, useGetGuestBooksQuery } from "@/services/guestBook";

const GuestBookPage: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(GUEST_BOOK_DEFAULT_DATA);

    const { data } = useGetGuestBooksQuery()
    const [deleteGuestBook] = useDeleteGuestBookMutation()

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


    return (
        <DefaultLayout>
            <Table
                addButtonName="Tambah Tamu"
                addButtonLink="/guestBook"
                name="Daftar Tamu"
                column={columns}
                data={data ? data.data.data : []}
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
                idItem={selectedData.id}
                mutation={deleteGuestBook}
                title="Detail Buku Tamu"
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
                    name="no_telpon"
                    defaultValue={selectedData.no_telpon}
                    disabled={true}
                />
                <InputFields
                    title="Keperluan"
                    name="keperluan"
                    defaultValue={selectedData.keperluan}
                    disabled={true}
                />
                <InputFields
                    title="Asal Instansi"
                    name="institusi"
                    defaultValue={selectedData.institusi.nama}
                    disabled={true}
                />
                <InputFields
                    title="Alamat Instansi"
                    name="Kontak"
                    defaultValue={selectedData.institusi.alamat}
                    disabled={true}
                />
                <InputFields
                    title="Kontak Instansi"
                    name="Kontak"
                    defaultValue={selectedData.institusi.kontak}
                    disabled={true}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default GuestBookPage;
