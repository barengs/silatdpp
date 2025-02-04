import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import BudgetPage from "@/components/pages/Budget/page"
import React from "react"
import { BUDGET_DEFAULT_DATA } from "@/utils/constans"
import { Metadata } from "next"

export const metadata: Metadata = {
    title:
      "SILATDPP - List Data Biaya",
  };
  

const Page: React.FC = async () => {

    let data = [BUDGET_DEFAULT_DATA]
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/biaya`, { cache: 'no-store'})
    
    if (res.ok) {
        data = await res.json()
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data tingkat biaya" />
            <BudgetPage data={data.data}/>
        </DefaultLayout>
    )
}

export default Page