import Link from "next/link";
import React from "react";

interface TableProps {
    name: string;
    addButtonName: string;
    column: string[];
    data: Record<string, string>[];
    detailLink?: string;
}

const Table: React.FC<TableProps> = ({
    name,
    addButtonName,
    column,
    data,
    detailLink = "",
}) => {
    return (
        <div className="w-full bg-white px-4 py-2">
            <div className="flex w-full justify-between items-center border-b-[1px] border-b-slate-400 py-2">
                <h1 className="font-semibold text-lg text-black">{name}</h1>
                <div className="flex justify-end">
                    <Link
                        href="/users/addData"
                        className="mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-white text-sm"
                    >
                        {addButtonName}
                    </Link>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <select className="p-3 rounded-md" name="" id="">
                    <option value="" disabled>Kategori</option>
                    <option value="">A</option>
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
                            <td className="text-center text-blue-500 underline">
                                <Link href={detailLink}>Pengaturan</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-6 px-4 py-2">
                <p>Showing 10 Data</p>
                <div className="flex text-sm">
                    <button className="border-2 border-r-0 border-gray-400 px-3 py-1 font-medium">Prev</button>
                    <button className="border-2 border-gray-400 px-3 py-1 font-medium">1</button>
                    <button className="border-2 border-x-0 border-gray-400 px-3 py-1 font-medium">2</button>
                    <button className="border-2 border-gray-400 px-3 py-1 font-medium">3</button>
                    <button className="border-2 border-l-0 border-gray-400 px-3 py-1 font-medium">Next</button>
                    
                </div>
            </div>
        </div>
    );
};

export default Table;
