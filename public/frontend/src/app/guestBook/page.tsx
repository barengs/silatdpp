"use client";

import Breadcrumb from "@/components/Breadcrumb";
import InputFields from "@/components/Fields/InputFields";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { InstitutionsDataTypes } from "@/types/pages/institution";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { GUEST_BOOK_DEFAULT_DATA, INSTITUTION_DEFAULT_DATA } from "@/utils/constans";
import { getDateTime, trimText } from "@/utils/data";

export default function GuestBookDetail() {
    const router = useRouter();
    const store = useStore();
    const state = store.getState();

    const [formData, setFormData] = useState<Record<string, any>>({});
    const [tableData, setTableData] = useState(GUEST_BOOK_DEFAULT_DATA)
    const [institutionsData, setInstitutionsData] = useState<
        InstitutionsDataTypes[]
    >([INSTITUTION_DEFAULT_DATA]);  
    const [divisionData, setDivisionData] = useState<
        { id: string; nama: string }[]
    >([]);

    const [selectedInstitutionData, setSelectedInstitutionData] =
        useState<InstitutionsDataTypes>(INSTITUTION_DEFAULT_DATA);


    useEffect(() => {
        const getData = async () => {
            try {
                const [lastGuest, institutionRes, divisionRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`),
                    fetch(
                        `${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi-tamu`,
                    ),
                    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/divisi`),
                ]);

                if (lastGuest.ok) {
                    const lastGuestData = await lastGuest.json();

                    if (Object.keys(lastGuestData.data).length > 0) {
                        setTableData(lastGuestData.data.data[0])
                    }
                }

                if (institutionRes.ok) {
                    const institutionsData = await institutionRes.json();

                    if (Object.keys(institutionsData.data).length > 0) {
                        setInstitutionsData(institutionsData.data);
                    }
                }

                if (divisionRes.ok) {
                    const divisionData = await divisionRes.json();

                    if (Object.keys(divisionData.data).length > 0) {
                        setDivisionData(divisionData.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    const handleStoreInput = (name: string, value: string) => {
        if (name === "institusi_tamu_id") {
            const id =
                institutionsData.find(
                    (institution) => institution.nama === value,
                )?.id || null;
            if (id) {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: id,
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else if (name === "divisi_id") {
            const id =
                divisionData.find((division) => division.nama === value)?.id ||
                null;
            if (id) {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: id,
                }));
            }

        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleInstitutionChange = (institutionName: string) => {
        const institutionData = institutionsData.find(
            (data) => data.nama == institutionName,
        );

        if (!institutionData) {
            return;
        }

        setSelectedInstitutionData(institutionData);
    };

    const handleAutoCompleteField = (
        newValue: string,
        attributeName: string,
    ) => {
        selectedInstitutionData[attributeName] = newValue;
    };

    const handlePostData = async () => {
        const data = new FormData();
        Object.keys(formData).forEach((fieldKey) =>
            data.append(fieldKey, formData[fieldKey]),
        );

        if (!isFinite(data.get("institusi_tamu_id"))) {
            data.append("alamat_institusi", selectedInstitutionData.alamat);
            data.append("kontak_institusi", selectedInstitutionData.kontak);
        }

        data.append("user_id", state.userId);

        try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
                body: data,
            },
        );

            if (res.ok) {
                alert("Data berhasil ditambahkan");
                window.location.reload()
            } else {
                console.error("Galat saat menambahkan data");
            }
        } catch (error) {
            console.error("Galat saat menambahkan data:", error);
        }

        router.replace("/guestBook")
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Buku Tamu" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex lg:justify-end">
                    <Link
                        href="/guestBook/list"
                        className="mb-4 mt-2 rounded-md bg-blue-500 px-2 py-3 text-sm text-white"
                    >
                        Histori Buku Tamu
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <InputFields
                        title="Nama Tamu"
                        onValueChange={(value) =>
                            handleStoreInput("nama_tamu", value)
                        }
                    />
                    <InputFields
                        title="Alamat"
                        onValueChange={(value) =>
                            handleStoreInput("alamat", value)
                        }
                    />
                    <InputFields
                        title="No Telepon"
                        onValueChange={(value) =>
                            handleStoreInput("no_telpon", value)
                        }
                    />
                    <InputFields
                        title="Keperluan"
                        onValueChange={(value) =>
                            handleStoreInput("keperluan", value)
                        }
                    />
                    <InputFields
                        title="Instansi Asal"
                        autoCompleteData={institutionsData.map(
                            (field) => field.nama,
                        )}
                        onValueChange={(value) =>
                            handleStoreInput("institusi_tamu_id", value)
                        }
                        onSelectAutoComplete={handleInstitutionChange}
                        addItemPath="/institution/addData"
                    />
                    <InputFields
                        title="Divisi Tujuan"
                        autoCompleteData={divisionData.map(
                            (field) => field.nama,
                        )}
                        onValueChange={(value) =>
                            handleStoreInput("divisi_id", value)
                        }
                    />
                    <InputFields
                        title="Alamat Instansi"
                        autoCompleteData={divisionData.map(
                            (field) => field.nama,
                        )}
                        onValueChange={(value) =>
                            handleAutoCompleteField(value, "alamat")
                        }
                        defaultValue={selectedInstitutionData.alamat}
                    />
                    <InputFields
                        title="Kontak Instansi"
                        autoCompleteData={divisionData.map(
                            (field) => field.nama,
                        )}
                        onValueChange={(value) =>
                            handleAutoCompleteField(value, "kontak")
                        }
                        defaultValue={selectedInstitutionData.kontak}
                    />
                </div>

                <button
                    onClick={handlePostData}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                    Tambahkan tamu
                </button>
            </div>

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-6 pb-12 shadow-default dark:border-strokedark dark:bg-boxdark">
                <h1 className="font-semibold text-black-2">Data terakhir</h1>
                <div className="flex justify-between items-center px-4">
                  <p>{tableData["nama_tamu"]}</p>
                  <p>{trimText(tableData["keperluan"], 20)}</p>
                  <p>{trimText(tableData["institusi_tamu"].nama)}</p>
                  <p>{tableData["divisi"].nama}</p>
                  <p>{getDateTime(tableData["created_at"])}</p>
                </div>
            </div>
        </DefaultLayout>
    );
}
