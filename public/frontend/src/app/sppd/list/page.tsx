"use client"

import Table from "@/components/Table"
import { SppdDataType } from "@/types/pages/sppd"
import React, { useEffect, useState } from "react"
import { getDateTime } from "@/utils/data"
import { DEFAULT_SPPD_DATA } from "@/utils/constans"
import useFetch from "@/hooks/useFetch"
import { toast } from "react-toastify"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumb"
import { useDispatch, useStore } from "react-redux"
import { setSppd } from "@/store/servicesSlice"
import { fetchSppd } from "@/services/common"
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields"
import SelectFields from "@/components/Fields/SelectFields"
import FilesFields from "@/components/Fields/FileFields"
import TextFields from "@/components/Fields/TextFields"


const SppdPage: React.FC = () => {
    const store = useStore();
    const dispatch = useDispatch()

    const [_, fetchCaller] = useFetch()
    const [data, setData] = useState(store.getState().services.sppd)
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_SPPD_DATA);

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

     useEffect(() => {
            const syncState = async () => {
                dispatch(setSppd(await fetchSppd()));
                setData(setSppd(await fetchSppd()));
            };
    
            syncState();
        }, []);
    


    const columns = [
        {
            name: "Nama Pegawai",
            selector: (row: SppdDataType) => row.user.name,
            sortable: true,
        },
        {
            name: "Tempat Tujuan",
            selector: (row: SppdDataType) => row.tempat_tujuan,
            sortable: true,
        },
        {
            name: "Tanggal Kegiatan",
            selector: (row: SppdDataType) => getDateTime(row.tanggal_kegiatan),
            sortable: true,
        },
        {
            name: "Status Persetujuan",
            cell: (row: SppdDataType) => (
                <div className={`${row.approval ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'} p-2 text-xs font-semibold rounded-md`}>
                    {row.approval ? 'Surat disetujui' : 'Sedang Menunggu'}
                </div>
            )
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
        const getData = async() => {
            await fetchCaller('sppd')
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }

                    toast.error("Galat saat mengambil data sppd", {
                        position: 'top-right'
                    })
                    console.log(res)
                })
                .then(data => data ? setData(data.data.data) : [DEFAULT_SPPD_DATA])
        }

        getData()
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Histori SPPD" />
            <Table addButtonName='Tambah SPPD' addButtonLink='/sppd' name='Daftar Pengajuan SPPD' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/sppd"}}   />
            <Modal 
                url={`buku-tamu/${selectedData.id}`}
                title="Edit Divisi"
                state={showPopup}
                stateSetter={setShowPopup}
                ableDelete={true}
            >
                <InputFields title="Nama Kegiatan" name="nama_kegiatan" />
                <InputFields title="Tempat Tujuan" name="tempat_tujuan" />
                <InputFields title="Tempat Kegiatan" name="tempat_kegiatan" />
                <InputFields title="Tempat Berangkat" name="tempat_berangkat" />
                <TextFields title="Deskripsi Kegiatan" name="maksud_kegiatan" />
                <SelectFields
                    title="Transportasi Perjalanan"
                    name="alat_transportasi_id"
                    options={[]}
                />
                <div className="flex gap-x-4">
                    <InputFields
                        title="Tanggal Berangkat"
                        name="tanggal_berangkat"
                        type="date"
                    />
                    <InputFields
                        title="Tanggal Sampai"
                        name="tanggal_kembali"
                        type="date"
                    />
                </div>
                <InputFields
                    title="Tanggal Kegiatan"
                    name="tanggal_kegiatan"
                    type="date"
                />
               
                <SelectFields
                    title="Biaya Perjalanan"
                    name="tingkat_biaya_id"
                    options={[]}
                />
            </Modal>
        </DefaultLayout>
    )
}


export default SppdPage