"use client";

import Appbar from "@/components/Appbar";
import {useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const NewDeployment = () => {
    const router = useRouter()
    const {data: session} = useSession();

    const [githubLink, setGithubLink] = useState("");
    const [id, setId] = useState("");
    const [uploading, setUploading] = useState(false);
    const [deployed, setDeployed] = useState(false);

    const handleUpload = async () => {
        setUploading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_UPLOAD_URL}deploy`, {
            url: githubLink
        })
        console.log("Uploaded")
        setId(res.data.id);
        setUploading(false);
        const interval = setInterval(async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_UPLOAD_URL}status/?id=${res.data.id}`)
            if(response.data.status === "deployed"){
                console.log("Deployed")
                clearInterval(interval);
                // Upload to database
                const projectAdded = await axios.post("/api/addProject", {
                    id: res.data.id,
                    githubLink: githubLink,
                    deploymentLink: `http://${res.data.id}.deployer.akshatarora130.com:4001/index.html`,
                    userId: session?.user.id
                })
                setDeployed(true);
            }
        }, 2000)
    };

    const handleVisit = () => {

    }

    return (
        <>
            <Appbar />
            <div className="bg-black w-screen h-screen flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl mb-12 font-extrabold tracking-wide">New Deployment</h1>
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto md:h-80 border-2 border-white rounded-2xl text-white bg-gray-900 p-6">
                    <div className="font-extrabold text-lg md:text-xl ">Deploy Your GitHub repository</div>
                    <div className="font-extralight text-xs mt-2">Enter the URL of your GitHub repository to deploy it</div>
                    <div className="font-bold mt-8">GitHub repository URL</div>
                    <input
                        type="text"
                        placeholder="https://github.com/username/repo"
                        className="w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"
                        onChange={(event) => {
                            setGithubLink(event.target.value);
                        }}
                    />
                    <button
                        onClick={handleUpload}
                        className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8"
                        disabled={id !== "" || uploading}
                    >
                        {id ? `Deploying (${id})` : uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
                {deployed && <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto md:h-56 border-2 border-white rounded-2xl text-white bg-gray-900 p-6 mt-10">
                    <div className="font-bold">Deployment URL</div>
                    <input
                        type="text"
                        value={`http://${id}.deployer.akshatarora130.com:4001/index.html`}
                        className="w-full px-4 py-3 mt-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-gray-300 text-black"
                    />
                    <button
                        onClick={handleVisit}
                        className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8"
                    >
                        <a href={`http://${id}.deployer.akshatarora130.com:4001/index.html`} target="_blank">
                            Visit Website
                        </a>
                    </button>
                </div>}
                {deployed && <div>

                </div>}
            </div>
        </>
    );
};

export default NewDeployment;
