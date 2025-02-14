"use client"

import React, { useEffect, useState } from "react"
import { useDispatch, useStore } from "react-redux"
import Table from "@/components/Table"
import { setSppd } from "@/store/servicesSlice"
import { SppdDataType } from "@/types/pages/sppd"
import { getDateTime } from "@/utils/data"
import { DEFAULT_SPPD_DATA } from "@/utils/constans"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumb"
import { fetchSppd } from "@/services/common"
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields"
import SelectFields from "@/components/Fields/SelectFields"
import TextFields from "@/components/Fields/TextFields"

const SppdPage: React.FC = () => {
    const store = useStore();
    const dispatch = useDispatch()
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
                setData(store.getState().services.sppd);
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


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Histori SPPD" />
            <Table addButtonName='Tambah SPPD' addButtonLink='/sppd' name='Daftar Pengajuan SPPD' column={columns} data={data} detailLink={{name: "Pengaturan", to: "/sppd"}}   />
            <Modal 
                url={`buku-tamu/${selectedData.id}`}
                title="Detail SPPD"
                state={showPopup}
                stateSetter={setShowPopup}
            >
                <InputFields title="Tempat Tujuan" name="tempat_tujuan" defaultValue={selectedData.tempat_tujuan} disabled={true}/>
                <InputFields title="Tempat Berangkat" name="tempat_berangkat" defaultValue={selectedData.tempat_berangkat} disabled={true}/>
                <InputFields title="Status Persetujuan" name="approval" defaultValue={selectedData.approval ? selectedData.approval : 'Belum Disetujui'} disabled={true}/>
                <InputFields title="Maksud Kegiatan" name="maksud_kegiatan" defaultValue={selectedData.maksud_kegiatan} disabled={true}/>
                <InputFields
                    title="Transportasi Perjalanan"
                    name="alat_transportasi_id"
                    disabled={true}
                    defaultValue={selectedData.alat_transportasi_id}
                />
                <div className="flex gap-x-4">
                    <InputFields
                        title="Tanggal Berangkat"
                        name="tanggal_berangkat"
                        disabled={true}
                        defaultValue={selectedData.tanggal_berangkat}
                    />
                    <InputFields
                        title="Tanggal Sampai"
                        name="tanggal_kembali"
                        disabled={true}
                        defaultValue={selectedData.tanggal_kembali}
                    />
                </div>
                <InputFields
                    title="Tanggal Kegiatan"
                    name="tanggal_kegiatan"
                    disabled={true}
                    defaultValue={selectedData.tanggal_kegiatan}
                />
               
                <InputFields
                    title="Biaya Perjalanan"
                    name="tingkat_biaya_id"
                    disabled={true}
                    defaultValue={selectedData.tingkat_biaya_id}
                />
                <InputFields
                    title="Status Diterima"
                    name="tingkat_biaya_id"
                    disabled={true}
                    defaultValue={selectedData.approval ? "Disetujui" : "Belum Disetujui"}
                />
                <div className="col-span-2 text-black-2">
                    <h2>Histori Alur</h2>
                    {selectedData.history.map(history => (
                        <div className="mt-4 px-2">
                            <h3 className="font-semibold">{history.nama}</h3>
                            <p className="text-sm text-gray-500">{getDateTime(history.created_at)}</p>
                        </div>
                    ))}
                </div>

            </Modal>
        </DefaultLayout>
    )
}


export default SppdPage