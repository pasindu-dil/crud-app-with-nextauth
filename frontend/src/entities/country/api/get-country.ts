'use server'

import { api } from "@/shared/api/instance";

export default async function getCountry({ cursor, search }: { cursor: string; search: string|null }) {
    try {
        const response = await api.get(`/countries?cursor=${cursor}&search=${search}`);

        return response.data;
    } catch (error) {
        console.log(error);

    }
}