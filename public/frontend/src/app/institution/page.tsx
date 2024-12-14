import DefaultLayout from '@/components/Layouts/DefaultLayout'
import InstutionsPage from '@/pages/Institution/page';
import React from 'react'



const Institution: React.FC = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi-tamu`)
  const data = await res.json()

  console.log(data.data)


  return (
    <DefaultLayout>
      <InstutionsPage data={data.data} />
    </DefaultLayout>
  );
};



export default Institution
