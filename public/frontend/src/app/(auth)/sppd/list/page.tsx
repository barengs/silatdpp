"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { SppdDataType } from "@/types/pages/sppd";
import { getDateTime } from "@/utils/data";
import { DEFAULT_SPPD_DATA } from "@/utils/constans";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Modal from "@/components/Modal";
import InputFields from "@/components/Fields/InputFields";
import { useGetSppdsQuery } from "@/services/sppd";
import { useGetTransportationsQuery } from "@/services/transporation";
import { useGetBudgetsQuery } from "@/services/budget";
import ProgressLine from "@/components/progressiveBar";
import FilesFields from "@/components/Fields/FileFields";
import { useStore } from "react-redux";
import CustomModal from "@/components/CustomModal";
import { toast } from "react-toastify";

const SppdPage: React.FC = () => {
    const store = useStore();
    const authState = store.getState().auth;

    const [showPopup, setShowPopup] = useState(false);
    const [selectedData, setSelectedData] = useState(DEFAULT_SPPD_DATA);

    const { data: sppdData, isLoading } = useGetSppdsQuery();
    const { data: transporationData } = useGetTransportationsQuery();
    const { data: budgetData } = useGetBudgetsQuery();

    const handleSelectedData = (data) => {
        setShowPopup(true);
        setSelectedData(data);
    };

    const getStatus = (approval: Record<string, string>): [string, string] => {
        switch (approval.nama) {
            case "pengajuan":
                return ["bg-blue-500 text-white", "Pengajuan"];

            case "penanganan":
                return ["bg-yellow-500 text-white", "Penanganan"];

            case "disetujui":
                return ["bg-green-500 text-white", "Disetujui"];

            default:
                return ["", ""];
        }
    };

    const getTransport = () => {
        if (transporationData) {
            const res = transporationData.data.filter(
                (transport) =>
                    transport.id == selectedData.alat_transportasi_id,
            );

            if (res.length < 1) {
                return "";
            }

            return res[0].nama;
        }
    };

    const getBudget = () => {
        if (budgetData) {
            const res = budgetData.data.filter(
                (budget) => budget.id == selectedData.biaya_id,
            );

            if (res.length < 1) {
                return "";
            }

            return res[0].name;
        }
    };

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
            cell: (row: SppdDataType) => {
                const [color, label] = getStatus(
                    row.history[row.history.length - 1],
                );
                // const color = "bg-red-500"
                // const label = "Hello"

                return (
                    <div
                        className={`${color} mx-auto rounded-md p-2 text-xs font-semibold`}
                    >
                        {label}
                    </div>
                );
            },
        },
        {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <div className="flex items-center justify-center gap-x-2">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleSelectedData(row)}
                    >
                        Lihat
                    </button>
                    {row.history[row.history.length - 1].nama ==
                        "disetujui" && (
                        <>
                            <div className="h-[12px] w-[2px] bg-slate-500"></div>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => console.log(row)}
                            >
                                Cetak
                            </button>
                        </>
                    )}
                </div>
            ),
        },
    ];

    function getModal() {
        switch (authState.user.role) {
            case "administrasi":
                const approve = async () => {
                    await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_API_URL}/sppd/${selectedData.id}/proses`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${authState.token}`,
                            },
                        },
                    ).then((res) => {
                        if (res.ok) {
                            toast.success("Berhasil memproses SPPD", {
                                position: "top-right",
                            });
                            setShowPopup(false);
                            return;
                        }

                        toast.error("Gagal memproses SPPD", {
                            position: "top-right",
                        });
                        setShowPopup(false);
                    });
                };

                return (
                    <CustomModal
                        title="Detail SPPD"
                        state={showPopup}
                        stateSetter={setShowPopup}
                        idItem={selectedData.id}
                        buttons={[
                            <button
                                className="flex w-max justify-center rounded bg-blue-500 p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                                onClick={approve}
                            >
                                Proses Pengajuan
                            </button>,
                        ]}
                    >
                        <InputFields
                            title="Tempat Tujuan"
                            name="tempat_tujuan"
                            defaultValue={selectedData.tempat_tujuan}
                            disabled={true}
                        />
                        <InputFields
                            title="Tempat Berangkat"
                            name="tempat_berangkat"
                            defaultValue={selectedData.tempat_berangkat}
                            disabled={true}
                        />
                        <InputFields
                            title="Maksud Kegiatan"
                            name="maksud_kegiatan"
                            defaultValue={selectedData.maksud_kegiatan}
                            disabled={true}
                        />
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
                            defaultValue={
                                selectedData.approval
                                    ? "Disetujui"
                                    : "Belum Disetujui"
                            }
                        />

                        <FilesFields
                            title="Bukti Kegiatan"
                            setter={(file) => null}
                            defaultValue={selectedData.dokumens}
                        />

                        <div className="col-span-2">
                            <h3 className="text-black">Diinput Oleh:</h3>
                            <p className="text-black-2">
                                {selectedData.user.name}
                            </p>
                        </div>

                        <div className="col-span-2 text-black-2">
                            <ProgressLine
                                data={selectedData.history.map((history) => ({
                                    name: history.nama,
                                    desc: history.created_at,
                                }))}
                                filledAt={selectedData.history.length}
                            />
                        </div>
                    </CustomModal>
                );
            case "kabid":
                const kabidApprove = async () => {
                    await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_API_URL}/sppd/${selectedData.id}/approval`,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${authState.token}`,
                            },
                        },
                    ).then((res) => {
                        if (res.ok) {
                            toast.success("Berhasil memproses SPPD", {
                                position: "top-right",
                            });
                            setShowPopup(false);
                            return;
                        }

                        toast.error("Gagal memproses SPPD", {
                            position: "top-right",
                        });
                        setShowPopup(false);
                    });
                };

                return (
                    <CustomModal
                        title="Detail SPPD"
                        state={showPopup}
                        stateSetter={setShowPopup}
                        idItem={selectedData.id}
                        buttons={[
                            <button
                                className="flex w-max justify-center rounded bg-blue-500 p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                                onClick={kabidApprove}
                            >
                                Izinkan Pengajuan
                            </button>,
                        ]}
                    >
                        <InputFields
                            title="Tempat Tujuan"
                            name="tempat_tujuan"
                            defaultValue={selectedData.tempat_tujuan}
                            disabled={true}
                        />
                        <InputFields
                            title="Tempat Berangkat"
                            name="tempat_berangkat"
                            defaultValue={selectedData.tempat_berangkat}
                            disabled={true}
                        />
                        <InputFields
                            title="Maksud Kegiatan"
                            name="maksud_kegiatan"
                            defaultValue={selectedData.maksud_kegiatan}
                            disabled={true}
                        />
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
                            defaultValue={
                                selectedData.approval
                                    ? "Disetujui"
                                    : "Belum Disetujui"
                            }
                        />

                        <FilesFields
                            title="Bukti Kegiatan"
                            setter={(file) => null}
                            defaultValue={selectedData.dokumens}
                        />

                        <div className="col-span-2">
                            <h3 className="text-black">Diinput Oleh:</h3>
                            <p className="text-black-2">
                                {selectedData.user.name}
                            </p>
                        </div>

                        <div className="col-span-2 text-black-2">
                            <ProgressLine
                                data={selectedData.history.map((history) => ({
                                    name: history.nama,
                                    desc: history.created_at,
                                }))}
                                filledAt={selectedData.history.length}
                            />
                        </div>
                    </CustomModal>
                );

            default:
                return (
                    <Modal
                        title="Detail SPPD"
                        state={showPopup}
                        stateSetter={setShowPopup}
                        idItem={selectedData.id}
                        ableUpdate={
                            selectedData.history[
                                selectedData.history.length - 1
                            ].nama == "disetujui"
                                ? false
                                : true
                        }
                    >
                        <InputFields
                            title="Tempat Tujuan"
                            name="tempat_tujuan"
                            defaultValue={selectedData.tempat_tujuan}
                        />
                        <InputFields
                            title="Tempat Berangkat"
                            name="tempat_berangkat"
                            defaultValue={selectedData.tempat_berangkat}
                        />
                        <InputFields
                            title="Maksud Kegiatan"
                            name="maksud_kegiatan"
                            defaultValue={selectedData.maksud_kegiatan}
                        />
                        <InputFields
                            title="Transportasi Perjalanan"
                            name="alat_transportasi_id"
                            defaultValue={getTransport()}
                        />
                        <div className="flex gap-x-4">
                            <InputFields
                                title="Tanggal Berangkat"
                                name="tanggal_berangkat"
                                defaultValue={selectedData.tanggal_berangkat}
                            />
                            <InputFields
                                title="Tanggal Sampai"
                                name="tanggal_kembali"
                                defaultValue={selectedData.tanggal_kembali}
                            />
                        </div>
                        <InputFields
                            title="Tanggal Kegiatan"
                            name="tanggal_kegiatan"
                            defaultValue={selectedData.tanggal_kegiatan}
                        />

                        <InputFields
                            title="Biaya Perjalanan"
                            name="biaya_id"
                            defaultValue={getBudget()}
                        />

                        <FilesFields
                            title="Bukti Kegiatan"
                            setter={(file) => null}
                            defaultValue={selectedData.dokumens}
                        />
                        {/* <p>{JSON.stringify(selectedData.dokumens)}</p> */}

                        <div className="col-span-2">
                            <h3 className="text-black">Diinput Oleh:</h3>
                            <p className="text-black-2">
                                {selectedData.user.name}
                            </p>
                        </div>

                        <div className="col-span-2 text-black-2">
                            <ProgressLine
                                data={selectedData.history.map((history) => ({
                                    name: history.nama,
                                    desc: history.created_at,
                                }))}
                                filledAt={selectedData.history.length}
                            />
                        </div>
                    </Modal>
                );
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="SPPD" />
            <Table
                addButtonName="Tambah SPPD"
                addButtonLink="/sppd"
                name="Daftar Pengajuan SPPD"
                column={columns}
                data={sppdData ? sppdData.data.data : []}
                detailLink={{ name: "Pengaturan", to: "/sppd" }}
                isLoading={isLoading}
            />
            {getModal()}
        </DefaultLayout>
    );
};

export default SppdPage;
