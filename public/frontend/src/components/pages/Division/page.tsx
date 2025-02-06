"use client"

import Table from "@/components/Table";
import { DivisionProps } from "@/types/pages/division";

const DivisonPage: React.FC<DivisionProps> = ({ data }) => {
    const columns = [
        {
            name: "Nama Bidang",
            selector: (row: Record<string, string>) => row.nama,
            sortable: true,
        },
    ]


    return (
        <>
              <Table data={data} column={columns} name="Data Divisi" addButtonLink="/division/addData" addButtonName="Tambah Divisi" />
        </>
    )
}

export default DivisonPage;