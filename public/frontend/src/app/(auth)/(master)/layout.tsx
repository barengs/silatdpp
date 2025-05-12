"use client"

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useStore } from "react-redux";

export default function MasterSecurityLayer({ children } : PropsWithChildren) {
    
    const store = useStore();
    const state = store.getState();
    const authState = state.auth;
    const router = useRouter()

    useEffect(() => {
        if (authState.user.role != "superadmin") {
            router.push("/login")
        }
    }, [])

    
    return (
        <>
            {children}
        </>
    )   
}