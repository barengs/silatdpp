import LoginPage from "@/components/pages/Login/page";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:
      "SILATDPP - Login dulu",
  };


export default function Page() {
    return <LoginPage />
}