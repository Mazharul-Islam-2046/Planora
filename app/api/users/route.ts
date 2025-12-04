import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  if (!users) {
    return new Response("No users found", { status: 404 });
  }

  console.log(JSON.stringify(users));
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email } = body;

  try {
    if (!name || !email) {
      return new Response("Name and email are required", { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });
    if (!user) {
      return new Response("Something Went Worng creating the user", {
        status: 500,
      });
    }

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(error)
  }
}
