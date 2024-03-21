import { NextResponse } from 'next/server';
import {addProject} from "@/app/lib/utils";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const project: any = await addProject(data.id, data.githubLink, data.deploymentLink, data.userId)
        return NextResponse.json({
            message: "Project Added",
            project: project
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
