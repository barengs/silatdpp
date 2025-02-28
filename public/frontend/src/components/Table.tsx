"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { cleanColumnName } from "@/utils/data";
import { exportDocument } from "@/utils/documents";
import Link from "next/link";

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
    isLoading?: boolean
}

const Table: React.FC<TableProps> = ({
    name,
    addButtonName,
    addButtonLink,
    column,
    data,
    detailLink = { name: "Pengaturan", to: "#" },
    excludes = ["id", "created_at", "updated_at"],
    isLoading = false
}) => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [category, setCategory] = useState("");
    const [activedFloating, setActivedFloating] = useState("");

    // Refs
    const exportPopupRef = useRef();
    const filterPopupRef = useRef();

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

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                (exportPopupRef.current &&
                    !exportPopupRef.current.contains(event.target as Node)) ||
                (filterPopupRef.current &&
                    !filterPopupRef.current.contains(event.target as Node))
            ) {
                setActivedFloating("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchText(event.target.value.toLowerCase());

    const handleErase = () => setSearchText("");

    const handleExport = (exportType) =>
        exportDocument(exportType, data, excludes);

    const customStyles = {
        rows: { style: { fontSize: "1rem" } },
        headCells: { style: { fontSize: "1rem", fontWeight: "bold" } },
        cells: { style: { fontSize: "1rem" } },
    };

    return (
        <div className="min-h-screen w-full bg-white px-4 py-2">
            {/* Search and Filter */}
            <div className="flex flex-wrap gap-x-4 gap-y-6 py-6 md:justify-end">
                <div className="relative min-h-full">
                    <button
                        className="w-max h-full hover:cursor-pointer"
                        onClick={() => setActivedFloating("filter")}
                    >
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
                                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                            />
                        </svg>
                    </button>
                    {activedFloating == "filter" && (
                        <div
                            ref={filterPopupRef}
                            className="absolute right-0 z-99 flex min-w-[300px] flex-col items-start gap-y-4 rounded-md border-[1px] border-gray-200 bg-white p-4 text-sm md:right-1/2"
                        >
                            {data.length > 0 &&
                                Object.keys(data[0])
                                    .filter(
                                        (data) =>
                                            !excludes.some(
                                                (exclduedCategory) =>
                                                    data == exclduedCategory,
                                            ),
                                    )
                                    .map((option, index) => (
                                        <button
                                            onClick={() => setCategory(option)}
                                            className={`hover:underline ${category == option ? "font-semibold" : "font-normal"}`}
                                            key={index}
                                        >
                                            {cleanColumnName(option)}
                                        </button>
                                    ))}
                        </div>
                    )}
                </div>
                <div className=" flex items-center rounded-md border-[1.5px] border-slate-300 px-2 py-2">
                    <input
                        className="min-w-[300px] flex-1 text-sm outline-none"
                        onChange={handleSearch}
                        value={searchText}
                        type="text"
                        placeholder={`Cari data berdasarkan ${category}`}
                    />
                    {searchText && (
                        <button onClick={handleErase}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <Link
                    href={addButtonLink}
                    className="rounded-md bg-primary px-2 py-3 text-sm text-white"
                >
                    {addButtonName}
                </Link>

                <div className="relative">
                    <button
                        onClick={() => setActivedFloating("export")}
                        className={`flex h-full items-center gap-x-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white border-[1.5px] ${activedFloating == "export" ? 'bg-white border-primary text-gray-500' : ''}`}
                    >
                        Export
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                    {activedFloating == "export" && (
                        <div
                            ref={exportPopupRef}
                            className="absolute right-0 z-99 mt-2 flex min-w-[300px] flex-col items-start gap-y-4 rounded-md border-[1px] border-gray-200 bg-white p-4 text-sm"
                        >
                            <button
                                className="hover:underline"
                                onClick={() => handleExport("csv")}
                            >
                                Expor ke CSV
                            </button>
                            <button
                                className="hover:underline"
                                onClick={() => handleExport("pdf")}
                            >
                                Expor ke PDF
                            </button>
                        </div>
                    )}
                </div>
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
                progressPending={isLoading}
            />
        </div>
    );
};

export default Table;
