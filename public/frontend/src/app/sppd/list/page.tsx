"use client"

import React, { useEffect, useState } from "react"
import Table from "@/components/Table"
import { SppdDataType } from "@/types/pages/sppd"
import { getDateTime } from "@/utils/data"
import { DEFAULT_SPPD_DATA } from "@/utils/constans"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Breadcrumb from "@/components/Breadcrumb"
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields"
import { useGetSppdsQuery } from "@/services/sppd"
import { useGetTransportationsQuery } from "@/services/transporation"
import { useGetBudgetsQuery } from "@/services/budget"
import ProgressLine from "@/components/progressiveBar"

const SppdPage: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_SPPD_DATA);

    const { data: sppdData, isLoading } = useGetSppdsQuery()
    const { data: transporationData } = useGetTransportationsQuery()
    const { data: budgetData } = useGetBudgetsQuery()

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const getTransport = () => {
        if (transporationData) {
            const res = transporationData.data.filter(transport => transport.id == selectedData.alat_transportasi_id)

            if (res.length < 1) {
                return ""
            }

            return res[0].nama
        }
    }


    const getBudget = () => {
        if (budgetData) {
            const res = budgetData.data.filter(budget => budget.id == selectedData.biaya_id) 
            
            if (res.length < 1) {
                return ""
            }

            return res[0].name
        }
    }


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
        transporationData ? console.log(transporationData.data) : ""
    }, [transporationData])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Histori SPPD" />
            <Table addButtonName='Tambah SPPD' addButtonLink='/sppd' name='Daftar Pengajuan SPPD' column={columns} data={sppdData ? sppdData.data.data : []} detailLink={{name: "Pengaturan", to: "/sppd"}} isLoading={isLoading} />
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
                    defaultValue={getTransport()}
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
                    name="biaya_id"
                    disabled={true}
                    defaultValue={getBudget()}
                />
                <InputFields
                    title="Status Diterima"
                    disabled={true}
                    defaultValue={selectedData.approval ? "Disetujui" : "Belum Disetujui"}
                />
                 <div className="col-span-2">
                    <h3>Diinput Oleh:</h3>
                    <p className="text-black-2">{selectedData.user.name}</p>
                </div>
                <div className="col-span-2 text-black-2">

                    {/* <ProgressLine data={[{name: "Pengajuan", desc:}]} /> */}
                    {/* {selectedData.history.map(history => (
                        <div className="mt-4 px-2">
                            <h3 className="font-semibold">{history.nama}</h3>
                            <p className="text-sm text-gray-500">{getDateTime(history.created_at)}</p>
                        </div>
                    ))} */}
                </div>

            </Modal>
        </DefaultLayout>
    )
}


export default SppdPage