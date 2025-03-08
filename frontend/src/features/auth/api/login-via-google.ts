'use client'

import { signIn } from "next-auth/react";

export const loginViaGoogle = async () => {
    try {
        await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
}