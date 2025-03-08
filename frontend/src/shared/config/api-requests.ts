// import { cookies } from "next/headers"
// import { decrypt } from "../lib/session"

export const baseUrl = 'http://localhost:8000/api/v1'

// const cookie = (await cookies()).get('session')?.value
// const session = await decrypt(cookie)

export const apiHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

// export const apiHeadersWithToken = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${session}`
// }