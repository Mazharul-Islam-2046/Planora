import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  console.log('User ID:', id); // Now this will log: "20"
  
  return NextResponse.json({ 
    message: `Fetching user with ID: ${id}`,
    userId: id 
  });
}