import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new Response("Task ID is required", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const subtask = await prisma.subtask.findUnique({
    where: { id },
  });

  if (!subtask) {
    return new Response("Subtask not found", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(subtask), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new Response("Task ID is required", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const subtask = await prisma.subtask.delete({
    where: { id },
  });

  if (!subtask) {
    return new Response("Subtask not found", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(subtask), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new Response("Task ID is required", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const update = await request.json();

  const subtask = await prisma.subtask.update({
    where: { id },
    data: update,
  });

  if (!subtask) {
    return new Response("Subtask not found", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(subtask), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
