"use client"

import Breadcrumb from "@/components/Breadcrumb"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import Table from "@/components/Table"
import { fetchInsitution, fetchPermissions } from "@/services/common"
import { setPermissions } from "@/store/servicesSlice"
import Link from "next/link"
import React, { useEffect } from "react"
import { useDispatch, useStore } from "react-redux"

const Page: React.FC = () => {
    const dispatch = useDispatch()
    const store = useStore()
    const serviceState = store.getState().services

    const columns = [
        {
            name: "Otoritas",
            selector: (row: Record<string, string>) => row.name,
            sortable: true,
          },
          {
            name: "Aksi",
            cell: (row: Record<string, string>) => (
                <Link
                    className="text-blue-500 hover:underline"
                    href={`/guestBook/${row.id}`}
                >
                    Edit
                </Link>
            ),
        },
    ]

    useEffect(() => {
              const syncPermissionData = async () => {
                  dispatch(setPermissions(await fetchPermissions()));
              };
      
              syncPermissionData();
          }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Data Hak Akses" />
            <Table name="Data Otoritas" data={serviceState.permissions} column={columns} addButtonLink="/permissions/addData" addButtonName="Tambah Otoritas"/>
        </DefaultLayout>
    )
}


export default Page;