import { signOut } from "next-auth/react";

const DashboardPage = () => {
    return (
        <>
        <div>DashboardPage</div>
        <button onClick={() => signOut()} >Logout</button>
        </>
    )
}

export default DashboardPage