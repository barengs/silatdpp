"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/authSlice";
import {
    fetchBudget,
    fetchDivision,
    fetchGuestBook,
    fetchInsitution,
    fetchPartners,
    fetchRoles,
    fetchTransportation,
    fetchUsers,
} from "@/services/common";
import {
    setBudget,
    setDivision,
    setGuestBook,
    setInstitution,
    setPartners,
    setTransportation,
    setRoles,
    setUsers,
} from "@/store/servicesSlice";
import { toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";
import InputFields from "@/components/Fields/InputFields";

export default function Page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isPending, fetchCaller] = useFetch();

    const [errors, setErrors] = useState({});

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
        dispatch(setInstitution(await fetchInsitution()));
        dispatch(setDivision(await fetchDivision()));
        dispatch(setGuestBook(await fetchGuestBook()));
        dispatch(setPartners(await fetchPartners()));
        dispatch(setTransportation(await fetchTransportation()));
        dispatch(setBudget(await fetchBudget()));
        dispatch(setRoles(await fetchRoles()));
        dispatch(setUsers(await fetchUsers()));

        toast.success("Berhasil Masuk!", {
            position: "top-right",
        });

        router.push("/");
    };

    useEffect(() => {
        document.title = "SILATDPP - Login dulu yuk :)";
    }, []);

    return (
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center gap-16 bg-gray-200 lg:flex-row">
            <div className="text-center lg:text-right">
                <h1 className="text-semibold text-black-2 lg:text-lg">
                    "The only way to do great work is to love what you do."
                </h1>
                <span>Steve Jobs</span>
            </div>

            <div className="bg-white px-8 py-12  min-w-[400px]">
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
    );
}
