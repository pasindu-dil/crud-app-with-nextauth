'use server'

import { FormState } from "@/entities/user/lib/definitions";
import { api } from "@/shared/api/instance";

export default async function createCountry(formState: FormState, formData: FormData) {  
    try {
        const response = await api.post('/countries', { name: formData.get('name') });
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error('Error creating country:', error);
        throw error;
    }
}
