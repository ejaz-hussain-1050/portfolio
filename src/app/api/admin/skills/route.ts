import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";
import { readPortfolioData, updateSkills } from "@/lib/storage";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readPortfolioData();
  return NextResponse.json(data.skills);
}

export async function PUT(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const skills = await request.json();
    await updateSkills(skills);

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}
