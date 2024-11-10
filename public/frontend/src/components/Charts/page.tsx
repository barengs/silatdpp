"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
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
];

const Chart: React.FC = () => {
    const { columns, value } = extractDataColumnName(DUMMY_DATA);

    return (
        <div className="p-6">

            <Breadcrumb pageName="Managemen Pengguna" />

            <div className="flex justify-end">
                <Link
                    href="/users/addData"
                    className="mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-white"
                >
                    Tambah Tamu
                </Link>
            </div>
            <Table column={cleanColumnName(columns)} data={value} />
        </div>
    );
};

export default Chart;
