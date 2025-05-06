"use client";

import { storeType } from "@/store";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useStore } from "react-redux";


const AUTH_MAPS = {
    superadmin: [],
    administrasi: [
        "/sppd/",
        "/sppd/list/",
        "/guestBook/",
        "/guestBook/list/",
        "/news/",
        "/news/addData/",
    ],
    kadis: ["/sppd/list/", "/news/", "/news/addData/"],
    kabid: ["/sppd/list/", "/news/", "/news/addData/"],
    resepsionis: ["/guestBook/", "/guestBook/list/"],
    staff: ["/sppd/", "/sppd/list/", "/news/", "/news/addData/"],
    kepsek: [
        "/sppd/",
        "/sppd/list/",
        "/certificate/list/",
        "/certificate/",
        "/studentTransfer/",
        "/studentTransfer/list",
        "/recomendation/",
        "/recomendation/list/",
    ],
    adminsekolah: [
        "/sppd/",
        "/sppd/list/",
        "/certificate/list/",
        "/certificate/",
        "/studentTransfer/",
        "/studentTransfer/list",
        "/recomendation/",
        "/recomendation/list/",
    ],
    guru: [
        "/certificate/list/",
        "/certificate/",
        "/studentTransfer/",
        "/studentTransfer/list",
        "/recomendation/",
        "/recomendation/list/",
    ],
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const store = useStore();
    const state = store.getState() as storeType;

    const navigate = useRouter();

    const pathname = usePathname();

    useEffect(() => {

        if (state.auth.user.role.includes("superadmin")) {
            return
        }


        const allowed_pages: string[] = [];

        Object.entries(AUTH_MAPS).filter(([role, urls]) => {
            if (state.auth.user.role.includes(role)) {
                urls.forEach(url => allowed_pages.includes(url) ? undefined : allowed_pages.push(url))
            }
        })

        if (!allowed_pages.includes(pathname)) {
            navigate.push("/login");
        }

    }, []);

    return <div>{children}</div>;
}
