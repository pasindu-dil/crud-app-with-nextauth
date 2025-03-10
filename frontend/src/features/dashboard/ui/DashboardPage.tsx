import { signOut, useSession } from "next-auth/react";

const DashboardPage = () => {
    const { data: session } = useSession();

    return (
        <>
            <div>DashboardPage</div>
            <div>
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
            </div>
            <button onClick={() => signOut()} >Logout</button>
        </>
    )
}

export default DashboardPage