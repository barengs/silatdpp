"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import UserLists from "@/components/UserLists/UserLists";


// For development purpose
interface User {
  id: string,
  name: string,
  position: string,
  role: string,
}

const userData: User[] = [
  {
    id: "1",
    name: "Alvin Setya Pranata",
    position: "Kepala Dinas",
    role: "Admin"
  }
]

const Chart: React.FC = () => {

  

  return (
    <>
      <Breadcrumb pageName="Managemen Pengguna" />


      <div className="px-4 py-12">

      <table className="bg-white w-full">
        <thead>
          <th className="py-4">Nama</th>
          <th className="py-4">Jabatan</th>
          <th className="py-4">Role</th>
          <th className="py-4">Aksi</th>
        </thead>
        <tbody>
          {userData.map(((user: User, index: number) => (
            <UserLists key={index} {...user} />
          )))

          }
        </tbody>
      </table>
      </div>
    </>
  );
};

export default Chart;
