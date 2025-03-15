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

    const { data: newsData, isLoading } = useGetAllNewsQuery();

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
        document.title = "SILATDPP - Login dulu yuk :)";
    }, []);

    useEffect(() => console.log(newsData), [isLoading]);

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex w-full flex-1 flex-col items-center justify-center md:flex-row">
                <div className="hidden h-full w-full flex-1 items-center justify-center bg-primary p-4 lg:flex lg:min-w-[500px]">
                    <div className="rounded-md bg-white px-12 py-8">
                        <h1 className="font-semibold text-black-2 lg:text-xl">
                            Berita Terbaru
                        </h1>

                        <img
                            src={newsData ? newsData.data[0].gambar : ""}
                            alt="berita"
                        />

                        <div className="mt-12 flex h-full flex-col text-left">
                            <p> {newsData ? newsData.data[0].judul : ""}</p>
                            <p>{newsData ? newsData.data[0].isi : ""}</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-1 flex-col justify-center px-4">
                    <div className="w-[350px] lg:w-[450px] mx-auto">
                        <h1 className="text-center text-3xl font-semibold text-black">
                            Login
                        </h1>
                        <form onSubmit={onSubmit} className="mt-16 space-y-12">
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
    );
}
