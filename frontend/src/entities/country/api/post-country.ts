'use server'

import { FormState } from "@/entities/user/lib/definitions";
import { api } from "@/shared/api/instance";
import { CountryFormData } from "../model/country-types";

export default async function createCountry(formState: FormState, formData: CountryFormData) {  
    try {
        const response = await api.post('/countries', { name: formData.get('name') });
        
        return response.data;
    } catch (error) {
        console.error('Error creating country:', error);
        throw error;
    }
}
