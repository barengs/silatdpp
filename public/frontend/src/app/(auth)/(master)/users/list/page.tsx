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
import { useGetAllUserQuery } from "@/services/users";
import { useGetRolesQuery } from "@/services/role";
import SelectFields from "@/components/Fields/SelectFields";

const Page: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_PROFILE_DATA);
    
    const { data: userData } = useGetAllUserQuery() 
    const { data: rolesData } = useGetRolesQuery()


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


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Daftar Karyawan" />
            <Table
                name="List karyawan"
                column={columns}
                data={userData ? userData.data : []}
                addButtonName="Tambah Karyawan"
                addButtonLink="/register"
            />
            <Modal
                idItem={selectedData.id}
                title="Detail Karyawan"
                state={showPopup}
                stateSetter={setShowPopup}
                ableUpdate={true}
                ableDelete={true}
            >
                <InputFields title="Nama Karyawan" name="nama_karyawan" defaultValue={selectedData.name} />
                <SelectFields title="Hak Akses" name="roles" defaultValue={selectedData.roles[0] ? selectedData.roles[0].id : "Belum Ditugaskan"} options={rolesData ? rolesData.data.map(role => { return {name: role.name, value: role.id} }): []} />
                <InputFields title="NIP Karyawan" name="email" defaultValue={selectedData.karyawan.nip} />
                <InputFields title="Nama Depan" name="first_name" defaultValue={selectedData.karyawan.first_name} />
                <InputFields title="Nama Belakang" name="last_name" defaultValue={selectedData.karyawan.last_name} />
                <InputFields title="Nama Lengkap" name="nick_name" defaultValue={selectedData.karyawan.nick_name} />
                <InputFields title="Nama Lengkap" name="nick_name" defaultValue={selectedData.karyawan.nick_name} />
                <InputFields title="Alamat" name="address" defaultValue={selectedData.karyawan.address} />
                <InputFields title="Jenis Kelamin" name="gender" defaultValue={selectedData.karyawan.gender} />
                <InputFields title="Nomor Telepon" name="phone" defaultValue={selectedData.karyawan.phone} />
                <InputFields title="Foto" name="photo" defaultValue={selectedData.karyawan.photo} />
                

            </Modal>
        </DefaultLayout>
    );
};

export default Page;
