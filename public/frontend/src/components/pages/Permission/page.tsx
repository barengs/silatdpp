"use client"

import Table from "@/components/Table"
import { PermissionPageProps } from "@/types/pages/permissions"
import Link from "next/link"

const PermissionPage: React.FC<PermissionPageProps> = ({ data }) => {

    const columns = [
        {
            name: "Nama Role",
            selector: (row: Record<string, string>) => row.name,
            sortable: true,
          },
          {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <Link
                    className="text-blue-500 hover:underline"
                    href={`/guestBook/${row.id}`}
                >
                    Edit
                </Link>
            ),
        },
    ]

    return (
        <>
            <Table name="Data Hak Akses" data={data} column={columns} addButtonLink="/permissions/addData" addButtonName="Tambah Hak Akses"/>
        </>
    )
}


export default PermissionPage;