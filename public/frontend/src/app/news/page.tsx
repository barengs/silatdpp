"use client"

import Breadcrumb from "@/components/Breadcrumb"
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { useGetAllNewsQuery, useUpdateNewsMutation } from "@/services/news";
import { DEFAULT_NEWS_DATA } from "@/utils/constans";
import { useState } from "react";

const Page: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { data: newsData, isLoading } = useGetAllNewsQuery()
    const [selectedData, setSelectedData] = useState(DEFAULT_NEWS_DATA)
    const [updateNews] = useUpdateNewsMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Judul Berita",
            selector: (row: Record<string, string>) => row.juduk,
            sortable: true,
        },
        {
            name: "Isi Berita",
            selector: (row: Record<string, string>) => row.isi,
            sortable: true,
        },
        {
            name: "Gambar",
            selector: (row: Record<string, string>) => row.gambar,
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
            <Breadcrumb pageName="Berita" />
            <Table
                addButtonName="Tambah Berita"
                addButtonLink="/news/addData"
                name="Daftar Berita"
                column={columns}
                data={newsData ? newsData.data : []}
                detailLink={{ name: "Pengaturan", to: "/institution" }}
                isLoading={isLoading}
            />
            <Modal
                idItem={selectedData.id}
                mutation={updateNews}
                title="Edit Berita"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
            >
                <InputFields
                    title="Judul Berita"
                    name="judul"
                    defaultValue={selectedData.judul}
                />
                <InputFields
                    title="Isi Berita"
                    name="alamat"
                    defaultValue={selectedData.isi}
                />
                <InputFields
                    title="Gambar"
                    name="gambar"
                    defaultValue={selectedData.gambar}
                />
            </Modal>
        </DefaultLayout>
    )
}

export default Page;