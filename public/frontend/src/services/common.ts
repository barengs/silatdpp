import { GUEST_BOOK_DEFAULT_DATA, INSTITUTION_DEFAULT_DATA } from "@/utils/constans"

export async function fetchInsitution() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi-tamu`)

    if (!res.ok) return [INSTITUTION_DEFAULT_DATA]

    return await res.json().data
}


export async function fetchGuestBook() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`)

    if (!res.ok) return [GUEST_BOOK_DEFAULT_DATA]

    return await res.json().data.data
}
