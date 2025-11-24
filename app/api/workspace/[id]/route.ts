import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Workspace ID is required" }, { status: 400 });
    }
    const workspace = await prisma.workspace.findUnique({
        where: { id },
    });

    if (!workspace) {
        return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json({ workspace, message: "Workspace found successfully" }, { status: 200 });
}



export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Workspace ID is required" }, { status: 400 });
    }

    const data = await prisma.workspace.delete({
        where: { id },
    })

    if (!data) {
        return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Workspace deleted successfully" }, { status: 200 });
}


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Workspace ID is required" }, { status: 400 });
    }

    const update = await request.json();

    const data = await prisma.workspace.update({
        where: { id },
        data: update,
    })

    if (!data) {
        return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Workspace updated successfully", data }, { status: 200 });
}