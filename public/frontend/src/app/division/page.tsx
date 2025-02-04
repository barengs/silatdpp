import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import DivisonPage from "@/components/pages/Division/page";


export const metadata: Metadata = {
    title:
      "SILATDPP - List data divisi",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
  };
  


const Division: React.FC = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/divisi`, { cache: 'no-store' })
    const data = await res.json()

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Divisi" />
            <DivisonPage data={data.data} />
        </DefaultLayout>
    )
}


export default Division;