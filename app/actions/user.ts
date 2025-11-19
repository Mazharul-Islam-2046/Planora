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


export async function deleteUserAction(userId: string) {
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });
    return {
        status: 200,
        message: "User deleted successfully",
    };
}