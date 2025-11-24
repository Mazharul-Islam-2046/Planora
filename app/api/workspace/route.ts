import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const workspace = await prisma.workspace.findMany();

  if (!workspace) {
    return new Response("Workspace not found", { status: 404 });
  }

  return new Response(JSON.stringify(workspace), { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, adminId } = body;

  if (!name || !description) {
    return new Response("Name and description are required", { status: 400 });
  }

  const workspace = await prisma.workspace.create({
    data: { name, description, adminId },
  });

  return new Response(JSON.stringify(workspace), { status: 201 });
}
