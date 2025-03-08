'use server'

import { decrypt } from "@/shared/lib/session"
import { cookies } from "next/headers"

export const getCountry = async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    console.log('session',session);
    
    const response = await fetch('http://localhost:8000/api/v1/countries', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session}`
        }
    })
    const data = await response.json()
    console.log(data);
    
    return data
}