"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Appbar from "@/components/Appbar";

const Page = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogin = () => {
        router.push("/Login");
    };

    const handleDep = () => {
        router.push("/AllDeployments");
    };

    return (
        <>
            <Appbar />
            <div className="bg-black min-h-screen flex flex-col justify-center items-center text-center">
                <h1 className="text-white text-4xl mb-8 font-extrabold tracking-wide">Welcome to Our Frontend Deployment Service</h1>
                <img
                    src="https://i.ibb.co/t49YTYb/main.png"
                    alt="Frontend Deployment"
                    width={600}
                    height={600}
                    className="rounded-full mb-8 shadow-lg mt-20"
                />
                {!session ? (
                    <button
                        onClick={handleLogin}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
                    >
                        Get Started with Your First Deployment
                    </button>
                ) : (
                    <button
                        onClick={handleDep}
                        className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4"
                    >
                        My Deployments
                    </button>
                )}
            </div>
        </>
    );
};

export default Page;
