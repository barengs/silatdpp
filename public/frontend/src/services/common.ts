import { DEFAULT_BUDGET_DATA, DEFAULT_DIVISION_DATA, DEFAULT_PARTNERS_DATA, DEFAULT_TRANSPORTATION, GUEST_BOOK_DEFAULT_DATA, INSTITUTION_DEFAULT_DATA } from "@/utils/constans"


export async function fetchInsitution() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/institusi`)

    if (!res.ok) return [INSTITUTION_DEFAULT_DATA]

    const data = await res.json()

    return data.data
}


export async function fetchGuestBook() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/buku-tamu`)

    if (!res.ok) return [GUEST_BOOK_DEFAULT_DATA]

    const data = await res.json()

    return data.data.data
}


export async function fetchDivision() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/divisi`)

    if (!res.ok) return [DEFAULT_DIVISION_DATA]

    const data = await res.json()

    return data.data
}

export async function fetchPartners() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/rekanan`)

    if (!res.ok) return [DEFAULT_PARTNERS_DATA]

    const data = await res.json()

    return data.data
}

export async function fetchTransportation() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transportasi`)

    if (!res.ok) return [DEFAULT_TRANSPORTATION]

    const data = await res.json()

    return data.data
}

export async function fetchBudget() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/biaya`)

    
    if (!res.ok) return [DEFAULT_BUDGET_DATA]
    
    const data = await res.json()

    return data.data
}