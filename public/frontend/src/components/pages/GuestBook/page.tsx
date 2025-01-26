"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Table from "@/components/Table";
import Link from "next/link";
import { GuestBookProps } from "@/types/pages/guest";
import { GUEST_BOOK_DEFAULT_DATA } from "@/utils/constans";


const GuestBook: React.FC<GuestBookProps> = ({ data }) => {
    const [tableData, setTableData] = useState<typeof data>(data ? data : [GUEST_BOOK_DEFAULT_DATA]);

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
                <Link
                    className="text-blue-500 hover:underline"
                    href={`/guestBook/${row.id}`}
                >
                    Edit
                </Link>
            ),
        },
    ];

    if (!data) {
        return <h1>Not Available</h1>;
    }

    return (
        <>
            <Breadcrumb pageName="List Buku Tamu" />
             {/* Header */}
            <Table
                addButtonName="Tambah Tamu"
                addButtonLink="/guestBook/addData"
                name="Daftar Tamu"
                column={columns}
                data={tableData}
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
        </>
    );
};

export default GuestBook;
