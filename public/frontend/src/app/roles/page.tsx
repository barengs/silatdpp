"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchRoles } from "@/services/common";
import { setRoles } from "@/store/servicesSlice";
import { DEFAULT_ROLE_DATA } from "@/utils/constans";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

const Page: React.FC = () => {
    const dispatch = useDispatch();
    const store = useStore();

    const [data, setData] = useState(store.getState().services.roles);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_ROLE_DATA);

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

    useEffect(() => {
        const syncRoleData = async () => {
            dispatch(setRoles(await fetchRoles()));
            setData(store.getState().services.roles);
        };

        syncRoleData();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Manajemen Tugas" />
            <Table
                name="Data Tugas"
                addButtonLink="/roles/addData"
                addButtonName="Tambah Tugas"
                column={columns}
                data={data}
            />
            <Modal
                url={`buku-tamu/${selectedData.id}`}
                title="Detail SPPD"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields
                    title="Nama Role"
                    name="name"
                    disabled={true}
                    defaultValue={selectedData.name}
                />
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
