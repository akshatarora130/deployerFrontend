"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Appbar from "@/components/Appbar";
import projectType from "../lib/projectType";
import { HoverEffect } from "../../components/ui/card-hover-effect";

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
      <div className="bg-black w-screen min-h-[92vh] flex flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={projects} />
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
