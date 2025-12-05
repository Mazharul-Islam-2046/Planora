import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function GET() {
    const subtasks = await prisma.subtask.findMany();
  
    if (!subtasks) {
      return new Response("No subtasks found", { status: 404, headers: { "Content-Type": "application/json" } });
    }
  
    return new Response(JSON.stringify(subtasks), { status: 200, headers: { "Content-Type": "application/json" } });
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    const { title, description, status, taskId } = body;
  
    if (!title || !description || !status || !taskId) {
      return new Response("Name, description, status, and userId are required", { status: 400, headers: { "Content-Type": "application/json" } });
    }
  
    const subtask = await prisma.subtask.create({
      data: { title, description, status, taskId },
    });
  
    return new Response(JSON.stringify(subtask), { status: 201, headers: { "Content-Type": "application/json" } });
  }