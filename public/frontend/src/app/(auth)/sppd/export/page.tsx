"use client"

import LetterHeading from "@/components/Letter/LetterHeading";
import React, { useEffect } from "react";

interface PageProps {}

export default function Page() {

    useEffect(() => {
        window.print()
    }, [])

    return (
        <div className="mx-auto max-w-[800px] bg-white p-8 text-black-2">
            <div className="w-full">
                <LetterHeading />

                <h1 className="text-center text-2xl font-semibold underline">
                    SURAT PERJALANAN DINAS ( SPD )
                </h1>
                <p className="text-center">NO: 093/ dynamic / 432.301/2021</p>

                <main className="px-2">
                    <section className="mb-24 mt-16 text-justify">
                        <table className="w-full table-auto border-collapse border border-black">
                            <tbody>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        1
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        Pejabat berwenang pemberi perintah
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        : Kepala dinas pendidikan dan kebudayaan
                                        kabupaten pamekasan
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        2
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        Nama/NIP pegawai yang diperintah
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        : <br />
                                        NIP:
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        3
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        a. Pangkat/Golongan/Ruang Gaji
                                        <br />
                                        b. Jabatan/Instansi
                                        <br />
                                        c. Tingkat biaya perjalanan dinas
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        :<br />
                                        : Operator RKAS BOS Kecamatan
                                        <br />: Dalam daerah
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        4
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        Maksud perjalanan dinas
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        : Maksud
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        5
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        Alat angkut yang digunakan
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        : Roda dua
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        6
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        a. Tempat berangkat
                                        <br />
                                        b. Tempat tujuan
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        a. <br />
                                        b.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        7
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        a. Lamanya perjalanan dinas
                                        <br />
                                        b. Tanggal berangkat
                                        <br />
                                        c. Tanggal harus kembali/tiba ditempat
                                        yang baru
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        : 1 ( satu ) hari
                                        <br />
                                        : 13 Januari 2021
                                        <br />: 13 Januari 2021
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        8
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        Nama Pengikut
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        NIP:
                                        <br />
                                        Jabatan:
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        9
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        Pembebanan anggaran instansi
                                        <br />
                                        Mata Anggaran
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        : Dinas Pendidikan dan kebudayaan
                                        kabupaten pamekasan
                                        <br />: PNS
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-2 align-top">
                                        10
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        Keterangan Lain
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        :
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="my-10 text-right">
                        <div className="ml-auto w-fit text-left">
                            <div className="mb-2 max-w-[300px]">
                                <p>Dikeluarkan di: pamekasan</p>
                                <p>Tanggal: 13 Januari 2021</p>
                                <p>
                                    Kepala dinas pendidikan dan kebudayaan
                                    kabupeten pamekasan
                                </p>
                            </div>
                            <img
                                src="/images/qr-code.jpg"
                                alt=""
                                className="mb-2 h-[100px] w-[100px]"
                            />
                            <div className="h-[60px]"></div>
                            <p className="font-bold">
                                <span id="namaKepala">
                                    ALVIN SETYA PRANATA, M.T
                                </span>
                            </p>
                            <p>
                                NIP: <span id="nip"></span>
                            </p>
                        </div>
                    </section>
                </main>

            </div>
        </div>
    );
}
