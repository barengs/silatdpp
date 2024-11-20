import Link from "next/link";
import React, { ChangeEvent, ReactEventHandler, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { cleanColumnName } from "../../../utils/data";



type detailLinkType = {
    name: string,
    to: string,
}

interface TableProps {
    name: string,
    addButtonName: string,
    addButtonLink: string,
    column: Record<string, unknown>[],
    data: Record<string, string>[],
    detailLink?: detailLinkType,
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
    detailLink = {name: "Pengaturan", to: "#"},

}) => {

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [category, setCategory] = useState('name')

  // Handle search input change
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);
    
    const filtered = data.filter(
      item =>
        item[category].toLowerCase().includes(searchValue) 
    );
    setFilteredData(filtered);
  };

    const customStyles = {
        rows: {
          style: {
            fontSize: '1rem', // Increase row font size
          },
        },
        headCells: {
          style: {
            fontSize: '1rem', // Increase header font size
            fontWeight: 'bold',
          },
        },
        cells: {
          style: {
            fontSize: '1rem', // Increase cell font size
          },
        },
      };

      const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => setCategory(event.target.value)


    return (
        <div className="w-full bg-white px-4 py-2">
            <div className="flex w-full justify-between items-center border-b-[1px] border-b-slate-400 py-2">
                <h1 className="font-semibold text-lg text-black">{name}</h1>
                <div className="flex justify-end">
                    <Link
                        href={addButtonLink}
                        className="mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-white text-sm"
                    >
                        {addButtonName}
                    </Link>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <select onChange={handleSelectChange} value={category} className="px-3 py-2 rounded-md font-medium text-sm" name="" id="">
                    <option value="" disabled>Kategori</option>
                    {Object.keys(data[0]).map((option, index) => (
                      <option key={index} value={option}>{cleanColumnName(option)}</option>
                    ))}
                </select>
                <input onChange={handleSearch} value={searchText} type="text" placeholder="Cari data" className="rounded-md px-2 py-2 border-[1.5px] border-slate-300 text-sm"/>
            </div>

            <DataTable  title="" className="mt-6" data={filteredData} columns={column} pagination highlightOnHover customStyles={customStyles} />


        </div>
    );
};

export default Table;
