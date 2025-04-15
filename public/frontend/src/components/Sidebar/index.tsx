"use client";

import React, { useEffect } from "react";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useStore } from "react-redux";
import { getSidebar } from "@/utils/components";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}



const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const [pageName, setPageName] = useLocalStorage(
        "selectedMenu",
        "dashboard",
    );

    const store = useStore();
    const state = store.getState();
    const authState = state.auth;


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
                <nav className="mt-5 overflow-x-hidden overflow-y-auto px-4 py-4 lg:mt-9 lg:px-6">
                    {getSidebar(authState.user.role).map((group, groupIndex) => (
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
