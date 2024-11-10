"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import Table from "../Table/page";
import { cleanColumnName, extractDataColumnName } from "../../../utils/data";

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
        <>
            <Breadcrumb pageName="Managemen Pengguna" />

            <div className="px-4 py-12">
                <Table column={cleanColumnName(columns)} data={value} />
            </div>
        </>
    );
};

export default Chart;
