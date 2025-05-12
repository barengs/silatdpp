"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/authSlice";
import { toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";
import InputFields from "@/components/Fields/InputFields";
import { useGetAllNewsQuery } from "@/services/news";

export default function Page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isPending, fetchCaller] = useFetch();

    const [errors, setErrors] = useState({});

    const { data: newsData, isError } = useGetAllNewsQuery();

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const res = await fetchCaller("login", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            if (res.status == 401) {
                setErrors({ messege: "Email atau Password salah" });
            }

            toast.error("Gagal Masuk!", {
                position: "top-right",
            });
            return;
        }

        const data = await res.json();

        dispatch(setToken(data));

        toast.success("Berhasil Masuk!", {
            position: "top-right",
        });

        router.push("/");
    };

    useEffect(() => {
        document.title = "SILAT - Login dulu yuk :)";
    }, []);

    return (
        <>
            {/* news */}

            {isError && (
                <div className="z-99 flex w-full items-center gap-x-4 bg-blue-500 px-4 py-4 text-white">
                    <div className="flex-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="size-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <p className="flex-1 text-sm">
                            {isError ? newsData.data[0].isi : ""}
                        </p>
                    </div>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            )}

            <div className="relative flex min-h-screen w-full">
                <div className="flex w-full flex-1 flex-col items-center justify-center md:flex-row">
                    <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-primary p-4 lg:min-w-[500px]">
                        <div className="flex w-full items-center justify-center gap-x-4">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Lambang_Daerah_Kab._Pamekasan%2C_Jawa_Timur.png"
                                alt="logo"
                                className="size-14"
                            />
                            <h1 className="text-3xl font-semibold text-white">
                                SILAT
                            </h1>
                        </div>
                        <h2 className="mt-4 capitalize text-white">
                            Sistem informasi layanan terpadu dinas pendidikan
                            pamekasan
                        </h2>
                    </div>

                    <div className="flex w-full flex-1 flex-col justify-center px-4">
                        <div className="mx-auto w-[350px] lg:w-[450px]">
                            <h1 className="text-center text-3xl font-semibold text-black">
                                Login
                            </h1>

                            <form
                                onSubmit={onSubmit}
                                className="mt-16 space-y-12"
                            >
                                <InputFields
                                    title="Email"
                                    name="email"
                                    error={errors.messege}
                                />
                                <InputFields
                                    title="Password"
                                    name="password"
                                    type="password"
                                    error={errors.messege}
                                />
                                <button
                                    className="flex w-full items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-75"
                                    type="submit"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Memeriksa identitas
                                        </>
                                    ) : (
                                        <>Masuk</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
