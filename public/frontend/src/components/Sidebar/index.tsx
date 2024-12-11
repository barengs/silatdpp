"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
    {
        name: "",
        menuItems: [
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                        />
                    </svg>
                ),
                label: "Dashboard",
                route: "/",
            },
            {
                icon: (
                    <svg
                        className="size-6 shrink-0 fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                            fill=""
                        />
                        <path
                            d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                            fill=""
                        />
                    </svg>
                ),
                label: "Manajemen Pengguna",
                route: "/users",
            },
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                    </svg>
                ),
                label: "Daftar Tamu",
                route: "/guestBook",
            },
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                    </svg>
                ),
                label: "Daftar Instansi",
                route: "/institution",
            },
        ],
    },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();
    const [pageName, setPageName] = useLocalStorage(
        "selectedMenu",
        "dashboard",
    );

    return (
        <aside
            className={`fixed z-999 flex h-screen w-72.5 flex-col overflow-hidden bg-black duration-300 ease-linear dark:bg-boxdark ${
                sidebarOpen
                    ? "w-4/8 fixed z-9999 duration-500 ease-in lg:static"
                    : "fixed z-9999 w-[0px] duration-500 ease-in lg:static lg:w-[80px]"
            }`}
        >
            <div className="flex w-full items-center justify-between overflow-hidden pl-8 pr-4 pt-12">
                <h1
                    className={`overflow-hidden text-2xl font-bold text-white ${sidebarOpen ? "" : ""}`}
                >
                    {sidebarOpen ? "SILATDPP" : "S"}
                </h1>
                <button onClick={() => setSidebarOpen(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="block size-6 stroke-white lg:hidden"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                        />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col overflow-y-auto">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 overflow-hidden px-4 py-4 lg:mt-9 lg:px-6">
                    {menuGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                {group.name}
                            </h3>

                            <ul className="mb-6 flex flex-col gap-y-6">
                                {group.menuItems.map((menuItem, menuIndex) => (
                                    <SidebarItem
                                        key={menuIndex}
                                        item={menuItem}
                                        pageName={pageName}
                                        setPageName={setPageName}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
