'use client'

import { FormState } from "@/entities/user/lib/definitions";
import { FormData } from "../models/types";
import { signIn } from "next-auth/react";

export async function signin(state: FormState, formData: FormData) {
    const callbackUrl = "/dashboard";

    try {
        await signIn('Credentials', { callbackUrl });
    } catch (error) {
        console.log(error);

    }
}