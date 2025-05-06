"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
   
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
