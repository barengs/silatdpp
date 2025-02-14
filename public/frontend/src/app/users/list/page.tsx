"use client";

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchUsers } from "@/services/common";
import { setUsers } from "@/store/servicesSlice";
import { PROFILE_DATA_TYPE } from "@/types/pages/staff";
import { DEFAULT_PROFILE_DATA } from "@/utils/constans";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";

const Page: React.FC = () => {
    const dispatch = useDispatch();
    const store = useStore();
    const [data, setData] = useState(store.getState().services.users)
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_PROFILE_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const columns = [
        {
            name: "Nama Karyawan",
            selector: (row: PROFILE_DATA_TYPE) => row.name,
            sortable: true,
        },
        {
            name: "Role Karyawan",
            selector: (row: PROFILE_DATA_TYPE) => row.roles[0] ? row.roles[0].name : "Belum ditugaskan",
            sortable: true,
        },
        {
            name: "Email Karyawan",
            selector: (row: PROFILE_DATA_TYPE) => row.email,
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

        const syncUserData = async () => {
            dispatch(setUsers(await fetchUsers()));
            setData(store.getState().services.users)
        };

        syncUserData();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Daftar Karyawan" />
            <Table
                name="List karyawan"
                column={columns}
                data={data}
                addButtonName="Tambah Karyawan"
                addButtonLink="/register"
            />
            <Modal
                url={`buku-tamu/${selectedData.id}`}
                title="Detail Karyawan"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields title="Nama Karyawan" name="nama_karyawan" defaultValue={selectedData.name} disabled={true}/>
                <InputFields title="Role Karyawan" name="roles" defaultValue={selectedData.roles[0] ? selectedData.roles[0].name : "Belum ditugaskan"} disabled={true}/>
                <InputFields title="Email Karyawan" name="email" defaultValue={selectedData.email} disabled={true}/>
            </Modal>
        </DefaultLayout>
    );
};

export default Page;
