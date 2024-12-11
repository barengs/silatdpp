'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import InputFields from '@/components/Fields/InputFields';
import SelectFields from '@/components/Fields/SelectFields';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { InstitutionsDataTypes } from '@/types/pages/institution';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { INSTITUTION_DEFAULT_DATA } from '../../../../utils/constans';

export default function GuestBookDetail() {
    const router = useRouter();

    const [formData, setFormData] = useState<Record<string, any>>({});

    const [institutionsData, setInstitutionsData] = useState<InstitutionsDataTypes[]>([INSTITUTION_DEFAULT_DATA]);

    const [divisionData, setDivisionData] = useState<{ id: string; nama: string }[]>([]);

    const [selectedInstitutionData, setSelectedInstitutionData] = useState<InstitutionsDataTypes>(INSTITUTION_DEFAULT_DATA)

    useEffect(() => {
        const getData = async () => {
            try {
                const [institutionRes, divisionRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi-tamu`),
                    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/divisi`),
                ]);

                
                if (institutionRes.ok) {
                    const institutionsData = await institutionRes.json();
                    
                    if (Object.keys(institutionsData.data).length > 0) {
                        setInstitutionsData(institutionsData.data);
                    }
                    
                }

                if (divisionRes.ok) {
                    const divisionData = await divisionRes.json();

                    if (Object.keys(divisionData.data).length > 0){
                        setDivisionData(divisionData.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, []);

    const handleStoreInput = (name: string, value: string) => {
        if (name === 'institusi_tamu_id') {
            const id = institutionsData.find(institution => institution.nama === value)?.id || null;
            if (id) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: id,
                }));
            }
        } else if (name === 'divisi_id') {
            const id = divisionData.find(division => division.nama === value)?.id || null;
            if (id) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: id,
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };


    const handleInstitutionChange = (institutionName: string) => {

        const institutionData = institutionsData.find(data => data.nama == institutionName)

        if (!institutionData) {
            return
        }

        setSelectedInstitutionData(institutionData);
    }

    const handleAutoCompleteField = (newValue: string, attributeName: string) => {
        selectedInstitutionData[attributeName] = newValue
    }


    const handlePostData = async () => {

        const data = new FormData();
        Object.keys(formData).forEach(fieldKey => data.append(fieldKey, formData[fieldKey]));


        


        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEMP_USER_TOKEN}`,
                },
                body: data,
            });

            if (res.ok) {
                alert('Data berhasil ditambahkan');
                router.push('/guestBook'); // Redirect to guestBook page
            } else {
                console.error('Failed to submit data', await res.json());
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <DefaultLayout>
            <Link href="/users" className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </Link>
            <Breadcrumb pageName="Tambah Tamu" />

            <div className="flex flex-col gap-9 rounded-sm border border-stroke bg-white px-6.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-2 gap-3">
                    <InputFields
                        title="Nama Tamu"
                        onValueChange={value => handleStoreInput('nama_tamu', value)}
                    />
                    <InputFields
                        title="Alamat"
                        onValueChange={value => handleStoreInput('alamat', value)}
                    />
                    <InputFields
                        title="No Telepon"
                        onValueChange={value => handleStoreInput('no_telpon', value)}
                    />
                    <InputFields
                        title="Keperluan"
                        onValueChange={value => handleStoreInput('keperluan', value)}
                    />
                    <InputFields
                        title="Instansi Asal"
                        autoCompleteData={institutionsData.map(field => field.nama)}
                        onValueChange={value => handleStoreInput('institusi_tamu_id', value)}
                        onSelectAutoComplete={handleInstitutionChange}
                        addItemPath='/institution/addData'
                    />
                    <InputFields
                        title="Divisi Tujuan"
                        autoCompleteData={divisionData.map(field => field.nama)}
                        onValueChange={value => handleStoreInput('divisi_id', value)}
                    />
                    <InputFields
                        title="Alamat Instansi"
                        autoCompleteData={divisionData.map(field => field.nama)}
                        onValueChange={value => handleAutoCompleteField(value, "alamat")}
                        defaultValue={selectedInstitutionData.alamat}
                    />
                    <InputFields
                        title="Kontak Instansi"
                        autoCompleteData={divisionData.map(field => field.nama)}
                        onValueChange={value => handleAutoCompleteField(value, "kontak")}
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
        </DefaultLayout>
    );
}
