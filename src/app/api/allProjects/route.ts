import { NextResponse } from 'next/server';
import {allProjects} from "@/app/lib/utils";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const projects = await allProjects(data.userId);
        return NextResponse.json({
            projects: projects,
        })

    } catch (error) {
        console.error('Error during fetching Projects:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
