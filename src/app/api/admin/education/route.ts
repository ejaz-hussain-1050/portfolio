import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";
import { readPortfolioData, updateEducation } from "@/lib/storage";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readPortfolioData();
  return NextResponse.json(data.education);
}

export async function PUT(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const education = await request.json();
    await updateEducation(education);

    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}
