import GuestBookDetail from "@/components/pages/GuestBook/Detail/page";


// Generate static paths for guestBook/[id]
export async function generateStaticParams() {
  return [{id: "1"}, {id: "2"}, {id: "3"}]
}

// Render the dynamic page
export default function Page({ params }: { params: { id: string } }) {
  return <GuestBookDetail params={params} />;
}
