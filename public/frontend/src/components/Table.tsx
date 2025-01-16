"use client";

import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { cleanColumnName } from "@/utils/data";
import { exportDocument } from "@/utils/documents";

type detailLinkType = {
    name: string;
    to: string;
};

type columnType = {
    name: string;
    selector?: (row: Record<string, string>) => string;
    sortable?: boolean;
    cell?: (row: Record<string, string>) => React.JSX.Element;
};

interface TableProps {
    name: string;
    addButtonName: string;
    addButtonLink: string;
    column: columnType[];
    data: Record<string, string>[];
    detailLink?: detailLinkType;
    excludes?: string[];
}


const Table: React.FC<TableProps> = ({
    name,
    addButtonName,
    addButtonLink,
    column,
    data,
    detailLink = { name: "Pengaturan", to: "#" },
    excludes = ["id", "created_at", "updated_at"]
}) => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [category, setCategory] = useState("name");
    const [exportType, setExportType] = useState("pdf")

    useEffect(() => {
        if (!searchText) {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) =>
                item[category]?.toLowerCase().includes(searchText),
            );
            setFilteredData(filtered);
        }
    }, [searchText, category, data]);

    // useEffect(() => console.log(data), [])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchText(event.target.value.toLowerCase());

    const handleErase = () => setSearchText("");

    const handleExport = () => exportDocument(exportType, data, excludes)

    const customStyles = {
        rows: { style: { fontSize: "1rem" } },
        headCells: { style: { fontSize: "1rem", fontWeight: "bold" } },
        cells: { style: { fontSize: "1rem" } },
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>
        setCategory(event.target.value);

    return (
        <div className="w-full bg-white px-4 py-2">

            {/* Search and Filter */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 py-6">
                <div className="col-span-2 flex items-center rounded-md border-[1.5px] border-slate-300 px-2 py-2 text-sm">
                    <input
                        className="w-full flex-1 outline-none"
                        onChange={handleSearch}
                        value={searchText}
                        type="text"
                        placeholder="Cari data"
                    />
                    {searchText && (
                        <button onClick={handleErase}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                <select
                    onChange={handleSelectChange}
                    value={category}
                    className="rounded-md px-3 py-2 text-sm font-medium"
                >
                    <option value="" disabled>
                        Kategori
                    </option>
                    {data.length > 0 &&
                        Object.keys(data[0]).filter(data => !excludes.some(exclduedCategory => data == exclduedCategory)).map((option, index) => (
                            <option key={index} value={option}>
                                {cleanColumnName(option)}
                            </option>
                        ))}
                </select>
                <select
                    className="rounded-md px-3 py-2 text-sm font-medium"
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => setExportType(event.target.value)}
                >
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                </select>
                <button 
                onClick={handleExport}
                className="rounded-md px-3 py-2 text-sm font-medium col-span-2 bg-primary hover:bg-gray-200 text-white hover:text-gray-600">
                    Export
                </button>
            </div>

            {/* Table */}
            <DataTable
                title=""
                className="mt-4"
                data={filteredData}
                columns={column}
                pagination
                highlightOnHover
                customStyles={customStyles}
                noDataComponent="Tidak ada data"
            />
        </div>
    );
};

export default Table;
