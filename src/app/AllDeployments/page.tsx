"use client"

import Appbar from "@/components/Appbar";
import {useRouter} from "next/navigation";

const AllDeployments = () => {
    const router = useRouter();

    const handlenewDep = () => {
        router.push("/NewDeployment")
    }

    return (
        <>
            <Appbar/>
            <div className="bg-black w-screen h-screen flex items-center justify-center">
                <button
                    className=" bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8"
                    onClick={handlenewDep}>New Deployment</button>
            </div>
        </>
    )
}

export default AllDeployments;