import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import BudgetPage from "@/pages/Budget/page"
import React from "react"



const Page: React.FC = async () => {

    // const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transport`)

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data tingkat biaya" />
            <BudgetPage />
        </DefaultLayout>
    )
}

export default Page