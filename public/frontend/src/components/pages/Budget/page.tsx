"use client"

import Table from "@/components/Table"
import { BudgetProps } from "@/types/pages/budget"
import Link from "next/link"



const BudgetPage: React.FC<BudgetProps> = ({ data }) => {

    const column = [
        {
            name: "Biaya",
            selector: (row: Record<string, string>) => row.biaya,
            sortable: true,
        }
    ]

    return (
        <>
            <div className="flex justify-end">
                <Link href="/budget/addData" className="bg-primary py-3 px-4 rounded-md text-white text-sm">Tambah Transportasi</Link>
            </div>
            <Table data={data} column={column} name="Budget" addButtonLink="" addButtonName="Tambah Budget" />
        </>
    )
}


export default BudgetPage