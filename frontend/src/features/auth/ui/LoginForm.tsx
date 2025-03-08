'use client'

import Link from "next/link";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";
import { loginViaGoogle } from "../api/login-via-google";
import { signin } from "../api/login";

const LoginForm = () => {
    const [state, action, pending] = useActionState(signin, undefined);
    const [googleLoginState, googleLoginAction, googleLoginPending] = useActionState(loginViaGoogle, undefined);

    return (
        <div className='flex flex-col items-center justify-center w-full h-[100vh]'>
            <div className="bg-white px-16 py-10 w-[40vw]">
                <div className="flex flex-col gap-2">
                    <div className="text-slate-400 text-md">Please enter your details</div>
                    <div className="text-slate-800 font-bold text-3xl">Welcome back</div>
                </div>
                <form method="post" action={action} className="flex flex-col gap-4 py-8">
                    <div className="flex flex-col gap-2">
                        <input type="email" id="email" name="email" className="p-2 bg-white border border-slate-300 border- text-slate-700" placeholder="Email address" />
                        {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <input type="password" id="password" name="password" className="p-2 bg-white border border-slate-300 border- text-slate-700" placeholder="Password" />
                        {state?.errors?.password && (
                            <div>
                                <p className="text-red-500 text-sm">Password must:</p>
                                <ul>
                                    {state.errors.password.map((error) => (
                                        <li className="text-red-500 text-sm" key={error}>- {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center gap-2">
                            <input className="p-2" type="checkbox" />
                            <p className="text-sm text-slate-600">Remember me</p>
                        </div>
                        <div className="text-sm text-blue-600 underline">
                            <Link href="/forgot-password">Forgot password</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <button type="submit" className="p-2 bg-blue-600 text-white w-full rounded-md cursor-pointer" disabled={pending}>Sign in</button>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-sm text-slate-600">Don&apos;t have an account? <Link href={"/signup"} className="text-blue-600 underline text-sm">Sign up</Link></p>
                    </div>
                </form>
                <button className="p-2 bg-white text-slate-700 w-full rounded-md border border-slate-300 cursor-pointer relative" disabled={googleLoginPending} onClick={googleLoginAction}>
                    <FcGoogle className="absolute top-1/2 left-[35%] -translate-y-1/2" />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    )
}

export default LoginForm