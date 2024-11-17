import Link from "next/link";
import React, { useState } from "react";



type detailLinkType = {
    name: string,
    to: string,
}

interface TableProps {
    name: string,
    addButtonName: string,
    addButtonLink: string,
    column: string[],
    data: Record<string, string>[],
    detailLink?: detailLinkType,
}

const Table: React.FC<TableProps> = ({
    name,
    addButtonName,
    addButtonLink,
    column,
    data,
    detailLink = {name: "Pengaturan", to: "#"},

}) => {

    const [pageIndex, setPageIndex] = useState(0)

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
                <select className="px-3 py-2 rounded-md font-medium" name="" id="">
                    <option value="" disabled>Kategori</option>
                    <option value="">Nama</option>
                </select>
                <input type="text" placeholder="Name" className="rounded-md px-2 py-1 border-[1.5px] border-slate-300"/>
            </div>

            <table className="w-full mt-4"> 
                <thead>
                    <tr className="bg-primary text-white">
                        {column.map((column, index) => (
                            <th className="py-4" key={index}>
                                {column}
                            </th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData, rowIndex) => (
                        <tr className={rowIndex % 2 == 0 ? '' : 'bg-gray-200'} key={rowIndex}>
                            {Object.keys(rowData).map((colData, colIndex) => (
                                <td className="py-4 text-center" key={colIndex}>
                                    {rowData[colData]}
                                </td>
                            ))}
                            {detailLink.name && detailLink.to ? 
                            <td className="text-center text-blue-500 underline">
                                <Link href={`${detailLink.to}/${rowData["id"]}`}>{detailLink.name}</Link>
                            </td>
                            
                            : 
                            ""
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-6 px-4 py-2">
                <p className="text-slate-600 font-medium">Menampilkan 1 sampai 10 dari 100 Data</p>
                <div className="flex gap-x-2 text-sm">
                    <button className="bg-primary rounded-md text-white px-4 py-1 font-medium">Prev</button>
                    <button className="bg-primary rounded-md text-white px-4 py-1 font-medium">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Table;
