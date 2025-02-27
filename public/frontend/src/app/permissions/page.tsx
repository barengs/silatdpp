"use client"

import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Table from "@/components/Table"
import { fetchPermissions } from "@/services/common"
import { setPermissions } from "@/store/servicesSlice"
import { DEFAULT_PERMISSION_DATA } from "@/utils/constans"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useDispatch, useStore } from "react-redux"
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields"

const Page: React.FC = () => {
    const dispatch = useDispatch()
    const store = useStore()
    const [data, setData] = useState(store.getState().services.permissions)
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_PERMISSION_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Otoritas",
            selector: (row: Record<string, string>) => row.name,
            sortable: true,
          },
          {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleSelectedData(row)}
                >
                    Edit
                </button>
            ),
        },
    ]

    useEffect(() => {
              const syncPermissionData = async () => {
                  dispatch(setPermissions(await fetchPermissions()));
                  setData(store.getState().services.permissions);
              };
      
              syncPermissionData();
          }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Hak Akses" />
            <Table name="Data Otoritas" data={data} column={columns} addButtonLink="/permissions/addData" addButtonName="Tambah Otoritas"/>
            <Modal 
                url={`buku-tamu/${selectedData.id}`}
                title="Detail SPPD"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                 <InputFields title="Otoritas" name="otoritas" defaultValue={selectedData.name} disabled={true}/>
            </Modal>
        </DefaultLayout>
    )
}


export default Page;