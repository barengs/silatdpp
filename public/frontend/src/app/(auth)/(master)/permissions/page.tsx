"use client"

import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Table from "@/components/Table"
import { DEFAULT_PERMISSION_DATA } from "@/utils/constans"
import React, { useEffect, useState } from "react"
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields"
import { useGetPermissionsQuery, useUpdatePermissionMutation } from "@/services/permission"

const Page: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_PERMISSION_DATA);

    const { data } = useGetPermissionsQuery()
    const [updatePermission] = useUpdatePermissionMutation()


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

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Hak Akses" />
            <Table name="Data Otoritas" data={data ? data.data : []} column={columns} addButtonLink="/permissions/addData" addButtonName="Tambah Otoritas"/>
            <Modal 
                idItem={selectedData.id}
                mutation={updatePermission}
                title="Detail Hak Akses"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
            >
                 <InputFields title="Otoritas" name="name" defaultValue={selectedData.name} />
            </Modal>
        </DefaultLayout>
    )
}


export default Page;