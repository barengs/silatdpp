"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useStore } from "react-redux";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter()
  const store = useStore()

  useEffect(() => {
    const authState = store.getState().auth

    if (authState.token && authState.user) return

    router.push("/login")
  },[])

  return (
    <>
     
      <div className="flex">
       

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      

        {/* touchable overlay sidebar control */}
        <div className={`w-screen h-screen fixed left-0 top-0 bg-black z-99 lg:hidden bg-opacity-75 ${sidebarOpen ? 'block' : 'hidden'}`}></div>

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="flex flex-col flex-1 max-h-screen overflow-y-auto">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 space-y-8">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
