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
            <Table data={data} column={column} name="Budget" addButtonLink="/budget/addData" addButtonName="Tambah Biaya" />
        </>
    )
}


export default BudgetPage