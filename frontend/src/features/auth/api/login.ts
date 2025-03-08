'use client';

import { FormState, SignInFormSchema } from "@/entities/user/lib/definitions";
import { FormData } from "../models/types";
import { signIn } from "next-auth/react";

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
        await signIn('Credentials', { redirectUrl: '/dashboard', email: formData.email, password: formData.password });
    } catch (error) {
        console.log(error);

    }
}