import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import DataTable from "react-data-table-component";
import { cleanColumnName } from "../../../utils/data";

type detailLinkType = {
    name: string;
    to: string;
};

interface TableProps {
    name: string;
    addButtonName: string;
    addButtonLink: string;
    column: Record<string, unknown>[];
    data: Record<string, string>[];
    detailLink?: detailLinkType;
}

// const formatColumn = (column: string[][]) => {
//     const res = []

//     column.map(column => )
// }

const Table: React.FC<TableProps> = ({
    name,
    addButtonName,
    addButtonLink,
    column,
    data,
    detailLink = { name: "Pengaturan", to: "#" },
}) => {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [category, setCategory] = useState("name");

    // Handle search input change
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);

        const filtered = data.filter((item) => 
          item[category].toLowerCase().includes(searchValue)
        )

        
        if (searchValue == "") {
            setFilteredData(data)
        } else {  
          setFilteredData(filtered)
        }
    };

    const customStyles = {
        rows: {
            style: {
                fontSize: "1rem", // Increase row font size
            },
        },
        headCells: {
            style: {
                fontSize: "1rem", // Increase header font size
                fontWeight: "bold",
            },
        },
        cells: {
            style: {
                fontSize: "1rem", // Increase cell font size
            },
        },
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>
        setCategory(event.target.value);

    const handleErase = () => {
      setSearchText("")
      setFilteredData(data)
    }

    return (
        <div className="w-full bg-white px-4 py-2">
            <div className="flex w-full flex-col border-b-[1px] border-b-slate-400 py-2 lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-lg font-semibold text-black">{name}</h1>
                <div className="flex lg:justify-end">
                    <Link
                        href={addButtonLink}
                        className="mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-sm text-white"
                    >
                        {addButtonName}
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-4 py-6">
                <div className="col-span-2 flex items-center rounded-md border-[1.5px] border-slate-300 px-2 py-2 text-sm">
                    <input
                        className="w-full flex-1 outline-none"
                        onChange={handleSearch}
                        value={searchText}
                        type="text"
                        placeholder="Cari data"
                    />
                    <button onClick={handleErase} className={`${searchText == "" ? "hidden" : "block"}`}>
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
                </div>
                <select
                    onChange={handleSelectChange}
                    value={category}
                    className="rounded-md px-3 py-2 text-sm font-medium"
                    name=""
                    id=""
                >
                    <option value="" disabled>
                        Kategori
                    </option>
                    {Object.keys(data[0]).map((option, index) => (
                        <option key={index} value={option}>
                            {cleanColumnName(option)}
                        </option>
                    ))}
                </select>
                <button className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium">
                    Export
                </button>
            </div>

            <DataTable
                title=""
                className="mt-4"
                data={filteredData}
                columns={column}
                pagination
                highlightOnHover
                customStyles={customStyles}
            />
        </div>
    );
};

export default Table;
