import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PartnerPage from "@/components/pages/PartnerPage/page";
import Link from "next/link";

const Partner = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/rekanan`, { cache: 'no-store' });
    if (!res) return <>Data Not Available</>;

    const data = await res.json();

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Rekan" />
            <div className="flex justify-end">
                <Link
                    href="/partners/addData"
                    className="rounded-md bg-primary px-2 py-3 text-sm text-white"
                >
                    Tambah Data
                </Link>
            </div>
            <PartnerPage data={data.data} />
        </DefaultLayout>
    );
};

export default Partner;
