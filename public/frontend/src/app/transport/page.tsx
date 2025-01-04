import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import TransportPage from "@/components/pages/Transport/page"
import React from "react"



const Page: React.FC = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transportasi`)
    const data = await res.json()

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Transportasi" />
            <TransportPage data={data.data} />
        </DefaultLayout>
    )
}

export default Page