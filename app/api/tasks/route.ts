import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
 const tasks = await prisma.task.findMany();

 if (!tasks) {
  return new Response("No tasks found", { status: 404 });
 }

 return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { title, description, status, workspaceId } = body;
  
    if (!title || !description || !status || !workspaceId) {
      return new Response("Name, description, status, and userId are required", { status: 400 });
    }
  
    const task = await prisma.task.create({
      data: { title, description, status, workspaceId },
    });
  
    return new Response(JSON.stringify(task), { status: 201 });
    
}