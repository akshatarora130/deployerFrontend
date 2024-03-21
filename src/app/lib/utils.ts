import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const addProject = async (id: string, githubLink: string, deploymentLink: string, userId: string | undefined) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: { id: userId },
        });

        if (!existingUser) {
            console.error(`User with id ${userId} not found.`);
            return;
        }

        const projectData = {
            id: id,
            githubLink: githubLink,
            deploymentLink: deploymentLink,
            userId: userId
        };

        const project = await prisma.project.create({
            data: projectData,
        });

        if (project) {
            console.log("Project added:", project);
            return project;
        } else {
            console.error("Error creating project. Project object is undefined.");
            return undefined;
        }
    } catch (error) {
        console.error("Error adding project:", error);
    }
};

export const allProjects = async (userId: string) => {
    try{
        const response = await prisma.project.findMany({
            where: {
                userId: userId
            }
        })

        return response;
    }
    catch (error) {
        console.error("Error while fetching projects:", error);
    }
}
