"use server";
import { prisma } from "@/lib/prisma";

interface UserData {
    email: string;
    name: string;
}
export async function saveUserAction(formData: UserData) {
    const createdUser = await prisma.user.create({
        data: {
            email: formData.email as string,
            name: formData.name as string,
        },
    });
    return {
        data: createdUser,
        status: 201,
        message: "User created successfully",
    };
}