"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect } from "react";
import Table from "../Table/page";
import { cleanColumnName, extractDataColumnName } from "../../../utils/data";
import Link from "next/link";

// For development purpose

const DUMMY_DATA = [
    {
        id: "1",
        name: "Alvin Setya Pranata",
        position: "Kepala Dinas",
        role: "Admin",
    },
    {
        id: "2",
        name: "Wahyudi Firmansyah",
        position: "Kepala Bidang",
        role: "Admin",
    },
    {
        id: "3",
        name: "Wahyudi Romadhoni",
        position: "Staff",
        role: "User",
    },
    {
        id: "4",
        name: "Budi Santoso",
        position: "Staff",
        role: "User",
    },
    {
        id: "5",
        name: "Siti Nurhaliza",
        position: "Kepala Seksi",
        role: "Admin",
    },
    {
        id: "6",
        name: "Ahmad Fauzi",
        position: "Staff",
        role: "User",
    },
    {
        id: "7",
        name: "Dewi Sartika",
        position: "Kepala Bidang",
        role: "Admin",
    },
    {
        id: "8",
        name: "Rina Melati",
        position: "Staff",
        role: "User",
    },
    {
        id: "9",
        name: "Fajar Nugraha",
        position: "Staff",
        role: "User",
    },
    {
        id: "10",
        name: "Diana Rahmawati",
        position: "Kepala Seksi",
        role: "Admin",
    },
    {
        id: "11",
        name: "Hendra Wijaya",
        position: "Staff",
        role: "User",
    },
    {
        id: "12",
        name: "Sari Dewi",
        position: "Kepala Seksi",
        role: "Admin",
    },
    {
        id: "13",
        name: "Eko Prasetyo",
        position: "Staff",
        role: "User",
    },
    {
        id: "14",
        name: "Fitri Handayani",
        position: "Kepala Bidang",
        role: "Admin",
    },
    {
        id: "15",
        name: "Rizky Ramadhan",
        position: "Staff",
        role: "User",
    },
];


const Chart: React.FC = () => {
    // const { columns } = extractDataColumnName(DUMMY_DATA);
    const columns = [
        {
            name: "ID",
            selector: (row: any) => row.id,
            sortable: true
        },
        {
            name: "Name",
            selector: (row: any) => row.name,
            sortable: true
        },
        {
            name: "Position",
            selector: (row: any) => row.position,
            sortable: true
        },
        {
            name: "Role",
            selector: (row: any) => row.role,
            sortable: true
        },
    ]


    return (
        <>
            <Breadcrumb pageName="Managemen Pengguna" />
            <Table addButtonLink="/users/addData" addButtonName="Tambah Pengguna" name="Daftar Pengguna" column={columns} data={DUMMY_DATA} detailLink={{name: "Pengaturan", to: "/users"}}/>
        </>
    );
};

export default Chart;
