import UserPage from "@/components/pages/Users/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Sistem Informasi Layanan Terpadu",
  description:
    "Sistem layanan yang dimiliki oleh kementrian pendidikan kabupaten pamekasan",
};

const Page: React.FC = () => {

  return (
    <DefaultLayout>
      <UserPage />
    </DefaultLayout>
  );
};

export default Page;
