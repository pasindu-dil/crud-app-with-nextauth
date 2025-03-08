'use server';

import { FormState, SignInFormSchema } from "@/entities/user/lib/definitions";
import { FormData } from "../models/types";
import { api } from "@/shared/api/instance";

export async function signin(state: FormState, formData: FormData) {
    // const validatedFields = SignInFormSchema.safeParse({
    //     email: formData.email,
    //     password: formData.password,
    // });
    
    // if (!validatedFields.success) {
    //     return {
    //         errors: validatedFields.error.flatten().fieldErrors,
    //     }
    // }
    
    try {
        const response = await api.post('/auth/login', { email: formData.email, password: formData.password });
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}