import { prisma } from "@/lib/prisma";


export async function GET() {
    const users = await prisma.user.findMany();
    if (!users) {
        return new Response("No users found", { status: 404 });
    }

    console.log(JSON.stringify(users));
    return new Response(JSON.stringify(users), { status: 200 });
}