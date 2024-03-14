import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Appbar = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleLogin = () => {
        router.push("/Login");
    }

    const handleSignout = () => {
        signOut().then(() => {
            console.log("Logged Out");
        });
    }

    if (!session) {
        return (
            <div className="flex justify-between items-center bg-black text-white p-4 border-b border-gray-700">
                <div className="text-2xl font-semibold">Deployer</div>
                <div>
                    <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white" onClick={handleLogin}>Login/Signup</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center bg-black text-white p-4 border-b border-gray-700">
            <div className="text-2xl font-semibold">Deployer</div>
            <button className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white" onClick={handleSignout}>Signout</button>
            {/* todo button to show all the deployments of the user */}
        </div>
    );
}

export default Appbar;
