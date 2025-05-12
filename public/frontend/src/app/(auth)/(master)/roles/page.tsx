"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { DEFAULT_ROLE_DATA } from "@/utils/constans";
import Modal from "@/components/Modal";
import { useState } from "react";
import { useGetRolesQuery, useUpdateRoleMutation } from "@/services/role";

const Page: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_ROLE_DATA);

    const { data: roleData } = useGetRolesQuery()
    const [updateRole] = useUpdateRoleMutation()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Role",
            selector: (row) => row.name,
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
    ];


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Manajemen Tugas" />
            <Table
                name="Data Tugas"
                addButtonLink="/roles/addData"
                addButtonName="Tambah Tugas"
                column={columns}
                data={roleData ? roleData.data : []}
            />
            <Modal
                idItem={selectedData.id}
                mutation={updateRole}
                title="Detail SPPD"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Nama Role"
                    name="name"
                    defaultValue={selectedData.name}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
