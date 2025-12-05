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

  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    return new Response("Task not found", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(task), {
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

  const data = await prisma.task.delete({
    where: { id },
  });

  if (!data) {
    return new Response("Task not found", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
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

  const data = await prisma.task.update({
    where: { id },
    data: update,
  });

  if (!data) {
    return new Response("Task not found", {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
