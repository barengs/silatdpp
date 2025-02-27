"use client"

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setToken } from "@/store/authSlice"
import { fetchBudget, fetchDivision, fetchGuestBook, fetchInsitution, fetchPartners, fetchRoles, fetchTransportation, fetchUsers } from "@/services/common"
import { setBudget, setDivision, setGuestBook, setInstitution, setPartners, setTransportation, setRoles, setUsers } from "@/store/servicesSlice"
import { toast } from "react-toastify"
import useFetch from "@/hooks/useFetch"


export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isPending, fetchCaller] = useFetch()

  const onSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
  
      const formData = new FormData(event.target)

      const res = await fetchCaller('login', { 
          method: "POST",
          body: formData
      })
      
      if (!res.ok) {
          toast.error("Gagal Masuk!", {
              position: "top-right"
        });
          return
      }

      const data = await res.json()

      dispatch(setToken(data))     
      dispatch(setInstitution(await fetchInsitution()))
      dispatch(setDivision(await fetchDivision()))
      dispatch(setGuestBook(await fetchGuestBook()))
      dispatch(setPartners(await fetchPartners()))
      dispatch(setTransportation(await fetchTransportation()))
      dispatch(setBudget(await fetchBudget()))
      dispatch(setRoles(await fetchRoles()))
      dispatch(setUsers(await fetchUsers()))


      toast.success("Berhasil Masuk!", {
            position: "top-right"
      });
      
      router.push("/")
  }


  useEffect(() => {
    document.title = "SILATDPP - Login dulu yuk :)"
  }, [])
  
  return (
      <div className="mx-auto min-h-screen flex flex-col lg:flex-row justify-center items-center bg-gray-200 gap-16">

          <div className="text-center lg:text-right">
            <h1 className="lg:text-lg text-black-2 text-semibold">"The only way to do great work is to love what you do."</h1>
            <span>Steve Jobs</span>
          </div>

          <div className="bg-white py-12 px-8">
              <h1 className="text-3xl font-semibold text-black text-center">Login</h1>
              <form onSubmit={onSubmit} className="space-y-12 mt-16">
              <div>
                  <h3 className="mb-2 font-medium text-black">Email</h3>
                  <input name="email" type="email" className="w-[300px] md:w-[400px] py-2 px-2 rounded-md border-[1.5px] border-gray-200"/>
              </div>
              <div>
                  <h3 className="mb-2 font-medium text-black">Password</h3>
                  <input name="password" type="password" className="w-[300px] md:w-[400px] py-2 px-2 rounded-md border-[1.5px] border-gray-200"/>
              </div>
              <button
                    className="flex w-full items-center justify-center gap-x-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-75 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isPending}
                >
                {isPending ? (
                        <>
                            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Memeriksa identitas
                        </>
                    ) : (
                        <>Masuk</>
                    )}
               </button>
              </form>
          </div>
      </div>
  )
}