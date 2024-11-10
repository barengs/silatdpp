import Link from "next/link";
import React from "react";


interface TableProps {
    column: string[],
    data: Record<string, string>[],
    detailLink?: string
}

const Table: React.FC<TableProps> = ({ column, data, detailLink="" }) => {
    return (
        <table className="w-full bg-white">
            <thead>
                <tr>
                    {column.map((column, index) => (
                        <th className="py-4" key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.keys(rowData).map((colData, colIndex) => (
                            <td className="text-center py-4" key={colIndex}>{rowData[colData]}</td>
                        ))}
                        <td className="text-blue-500 underline text-center">
                            <Link href={detailLink}>Pengaturan</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
