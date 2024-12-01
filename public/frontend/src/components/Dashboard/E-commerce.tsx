"use client";
import React from "react";
import Card from "../Card/page";


const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card title="Buku Tamu" link="/guestBook"/>
        <Card title="Manajemen Pengguna" link="/users"/>
      </div>
    </>
  );
};

export default ECommerce;
