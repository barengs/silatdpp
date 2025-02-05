"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/Table";
import { fetchGuestBook } from "@/services/common";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

const GuestBookPage: React.FC = async () => {
    const dispatch = useDispatch();
    const store = useStore();
    const serviceState = store.getState().services;

    const columns = [
      {
          name: "Nama Tamu",
          selector: (row: Record<string, string>) => row.nama_tamu,
          sortable: true,
      },
      {
          name: "Alamat",
          selector: (row: Record<string, string>) => row.alamat,
          sortable: true,
      },
      {
          name: "No Telpon",
          selector: (row: Record<string, string>) => row.no_telpon,
          sortable: true,
      },
      {
          name: "Keperluan",
          selector: (row: Record<string, string>) => row.keperluan,
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
  ];

    useEffect(() => {
        const syncGuestBookData = async () => {
            dispatch(await fetchGuestBook());
        };

        syncGuestBookData();
    }, []);

    return (
        <DefaultLayout>
          <Table
                addButtonName="Tambah Tamu"
                addButtonLink="/guestBook"
                name="Daftar Tamu"
                column={columns}
                data={serviceState.guestBook}
                detailLink={{ name: "Pengaturan", to: "/guestBook" }}
                excludes={[
                    "id",
                    "created_at",
                    "updated_at",
                    "institusi_tamu_id",
                    "divisi_id",
                    "user",
                    "user_id",
                ]}
            />

        </DefaultLayout>
    );
};

export default GuestBookPage;
