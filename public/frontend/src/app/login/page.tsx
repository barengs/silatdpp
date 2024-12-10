"use client"


import { useRouter } from "next/navigation"
import React from "react"



const LoginPage: React.FC = () => {

    const router = useRouter()

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        

        const form = event.target
        const formData = new FormData()

        formData.append("email", form.email.value)
        formData.append("password", form.password.value)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/login`, { 
            method: "POST",
            body: formData
        })
        
        if (!res.ok) {
            alert("Gagal Masuk")
            return
        }


        alert("Berhasil Masuk")
        router.push("/")
    }
    
    return (
        <div className="mx-auto min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white py-12 px-8">
                <h1 className="text-3xl font-semibold text-black text-center">Login</h1>
                <form onSubmit={onSubmit} className="space-y-12 mt-16">
                <div>
                    <h3 className="mb-2 font-medium text-black">Email</h3>
                    <input name="email" type="email" className="w-[400px] py-2 px-2 rounded-md border-[1.5px] border-gray-200"/>
                </div>
                <div>
                    <h3 className="mb-2 font-medium text-black">Password</h3>
                    <input name="password" type="password" className="w-[400px] py-2 px-2 rounded-md border-[1.5px] border-gray-200"/>
                </div>
                <button type="submit" className="w-full py-2 bg-primary
                 text-white rounded-md">Login</button>
                </form>
            </div>
        </div>
    )
}


export default LoginPage