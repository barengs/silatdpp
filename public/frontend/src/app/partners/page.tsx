"use client"

import Breadcrumb from "@/components/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchPartners } from "@/services/common";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

const Partner = () => {

    const store = useStore()
    const serviceState = store.getState().services
    const dispatch = useDispatch()


    const columns = [
        {
          name: "Nama Rekan",
          selector: (row: Record<string, string>) => row.nama,
          sortable: true,
        },
        {
          name: "Alamat",
          selector: (row: Record<string, string>) => row.alamat,
          sortable: true,
        },
        {
          name: "Kota",
          selector: (row: Record<string, string>) => row.kota,
          sortable: true,
        },
        {
          name: "Aksi",
          cell: (row: Record<string, string>) => (
            <Link className='text-blue-500 hover:underline' href={`/guestBook/${row.id}`}>Edit</Link>
          ),
        },
      ];

    useEffect(() => {
        const syncPartnerData = async() => {
            dispatch(await fetchPartners())
        }

        syncPartnerData()
        
    }, [])

    

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Rekan" />
            <Table name="Data Rekanan"  column={columns} data={serviceState.partners} addButtonName="Tambah Rekan" addButtonLink="/partners/addData" />
        </DefaultLayout>
    );
};

export default Partner;
