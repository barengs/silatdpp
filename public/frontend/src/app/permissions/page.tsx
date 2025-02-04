import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import PermissionPage from "@/components/pages/Permission/page"
import React from "react"

const Page: React.FC = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/hak-akses`, { cache: 'no-store' });
    if (!res) return <>Data Tidak Tersedia</>;

    const data = await res.json();

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Hak Akses" />
            <PermissionPage data={data.data}  />
        </DefaultLayout>
    )
}


export default Page;