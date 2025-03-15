"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useDispatch, useStore } from "react-redux";
import { setToken } from "@/store/authSlice";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const router = useRouter();
    const store = useStore();
    const dispatch = useDispatch();

    useEffect(() => {
        const authState = store.getState().auth;

        // Set timer that will update the token in 59 minutes
        const refreshTimer = setInterval(async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        Authorization: authState.token,
                    },
                },
            );

            if (!res.ok) {
                router.push("/login");
            }

            dispatch(setToken(await res.json()));
        }, 3300000);

        if (!authState.token || !authState.user) {
            router.push("/login");
        }

        return () => clearInterval(refreshTimer);
    }, []);


    return (

            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div
                    className={`fixed left-0 top-0 z-99 h-screen w-screen bg-black bg-opacity-75 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
                ></div>

                <div className="flex max-h-screen flex-1 flex-col overflow-y-auto">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <main>
                        <div className="mx-auto max-w-screen-2xl space-y-8 p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
    );
}
