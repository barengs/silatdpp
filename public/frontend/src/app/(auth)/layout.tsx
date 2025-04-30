"use client"

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useStore } from "react-redux";



const ADMIN_ALLOWED_URL = ["/sppd/", "/sppd/list/", "/guestBook/", "/guestBook/list/", "/news/", "/news/addData/"]

const KABID_ALLOWED_URL = ["/sppd/list/", "/news/", "/news/addData/"]

const RESEPSIONIS_ALLOWED_URL = ["/sppd/", "/sppd/list/", "/certificate/list/", "/certificate/", "/studentTransfer/", "/studentTransfer/list", "/recomendation/", "/recomendation/list/", "/news/", "/news/addData/"]



export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const store = useStore()
    const authState = store.getState().auth

    const navigate = useRouter()

    const pathname = usePathname()

    useEffect(() => {

        switch(authState.user.role) {
            case "superadmin":
                return

            case "administrasi":
                if (!ADMIN_ALLOWED_URL.includes(pathname)){
                    navigate.push("/login")
                }

            case "kabid":
                if (!KABID_ALLOWED_URL.includes(pathname)){
                    navigate.push("/login")
                }

            case "resepsionis":
                if (!RESEPSIONIS_ALLOWED_URL.includes(pathname)){
                    navigate.push("/login")
                }

            default:
                // unrecognized role
                navigate.push("/login")
        }
    }, [])


    return <div>{children}</div>;
}
