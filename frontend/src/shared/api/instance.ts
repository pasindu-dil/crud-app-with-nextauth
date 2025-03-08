import axios from 'axios'
import { apiHeaders, baseUrl } from '../config/api-requests'

export const api = axios.create({
    baseURL: baseUrl,
    headers: apiHeaders
})

// Add a request interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)