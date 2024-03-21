"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Appbar from "@/components/Appbar";
import projectType from "../lib/projectType";

const AllDeployments = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.post("/api/allProjects", {
                userId: session?.user.id,
            });
            setProjects(response.data.projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleNewDep = () => {
        router.push("/NewDeployment");
    };

    return (
        <>
            <Appbar />
            <div className="bg-black w-screen min-h-[91.25vh] flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl mb-12 font-extrabold tracking-wide">All Deployment</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
                    {projects.map((project: projectType) => (
                        <div key ={project.id} className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl border-2 border-white rounded-2xl text-white bg-gray-900 p-6">
                            <h2 className="text-white text-lg font-semibold mb-2">{project.id}</h2>
                            <p className="text-gray-400 mb-4">GitHub Link: <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{project.githubLink}</a></p>
                            <p className="text-gray-400">Deployment Link: <a href={project.deploymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{project.deploymentLink}</a></p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleNewDep}
                    className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-8"
                >
                    New Deployment
                </button>
            </div>
        </>
    );
};

export default AllDeployments;
