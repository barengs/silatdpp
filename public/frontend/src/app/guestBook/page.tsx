import DefaultLayout from '@/components/Layouts/DefaultLayout'
import GuestBook from '@/pages/GuestBook/page'
import { GuestBookGetInstance } from '@/types/pages/guest'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'


export const getGuestData: GetServerSideProps<{data: GuestBookGetInstance|null}> = async () => {

  try {
    const res = await fetch(`${process.env.BASE_API_URL}/buku-tamu`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data: GuestBookGetInstance = await res.json();

    return {
      props: {
        data
      }
    };
  } catch (error) {
    console.error('Error fetching guest data:', error);
    return {
      props: {
        data: null
      }
    };
  }


}

const GuestBookPage: React.FC<InferGetServerSidePropsType<typeof getGuestData>> = ({ data }) => {
  return (
    <DefaultLayout>
      <GuestBook {...data} />
    </DefaultLayout>
  );
};



export default GuestBookPage
