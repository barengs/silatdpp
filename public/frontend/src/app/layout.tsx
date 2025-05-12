"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "@/utils/errorMaps"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timeout)
  }, []);

  return (
    <html lang="en">
      <head>
        <title>SILATDPP</title>
      </head>

      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <ToastContainer limit={3} transition={Zoom}/>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {loading ? <Loader /> : children}
            </PersistGate>
          </Provider>
        </div>
      </body>
    </html>
  );
}
