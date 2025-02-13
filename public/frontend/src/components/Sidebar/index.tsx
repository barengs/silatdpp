"use client";

import React from "react";
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
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                    </svg>
                ),
                label: "Buku Tamu",
                route: "#",
                children: [
                    { label: "Registrasi Tamu", route: "/guestBook" },
                    { label: "List Tamu", route: "/guestBook/list" },
                ],
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
                label: "Master",
                route: "#",
                children: [
                    { label: "Data Divisi", route: "/division" },
                    { label: "Data Instansi", route: "/institution" },
                    { label: "Data Transportasi", route: "/transport" },
                    { label: "Data Biaya", route: "/budget" },
                    { label: "Data Rekanan", route: "/partners" },
                ],
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
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                ),
                label: "Sppd",
                route: "#",
                children: [
                    { label: "Pengajuan Sppd", route: "/sppd" },
                    { label: "Daftar Sppd", route: "/sppd/list" }
                ],
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
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                ),
                label: "Rekomendasi",
                route: "#",
                children: [
                    { label: "Penggantian Bendahara", route: "/recomendation" }
                ],
            },
            {
                icon: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 shrink-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                ),
                label: "Pengaturan Pengguna",
                route: "#",
                children: [
                    { label: "List Karyawan", route: "/users/list" },
                    { label: "Hak Akses", route: "/permissions" },
                    { label: "List Tugas", route: "/roles" },
                ],
            },
        ],
    },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const [pageName, setPageName] = useLocalStorage(
        "selectedMenu",
        "dashboard",
    );

    return (
        <aside
            className={`fixed z-999 flex h-screen w-72.5 flex-col overflow-hidden overflow-y-auto bg-black duration-300 ease-linear dark:bg-boxdark ${
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
                                        sidebarOpened={sidebarOpen}
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
