import { useState } from "react";



export default function useFetch() {
    const [isPending, setIsPending] = useState(false)


    const callFetch = async (url: string | URL | globalThis.Request, options: RequestInit) => {
        setIsPending(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${url}`, options)

        setIsPending(false)

        return res
    }

    
    return [isPending, callFetch]
}   