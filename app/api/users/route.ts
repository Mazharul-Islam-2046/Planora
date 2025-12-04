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
        headers: {
            "Content-Type": "application/json"
        }
      });
    }

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error in POST /api/users:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid request", 
          message: "Invalid JSON in request body" 
        }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle Prisma unique constraint violations (duplicate email)
    if (error.code === "P2002") {
      return new Response(
        JSON.stringify({ 
          error: "Conflict", 
          message: "A user with this email already exists" 
        }), 
        { 
          status: 409,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle other Prisma errors
    if (error.code?.startsWith("P")) {
      return new Response(
        JSON.stringify({ 
          error: "Database error", 
          message: "Failed to create user" 
        }), 
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Generic error fallback
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        message: "An unexpected error occurred" 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
