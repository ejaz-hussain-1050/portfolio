import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";
import { readPortfolioData, updateExperiences } from "@/lib/storage";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readPortfolioData();
  return NextResponse.json(data.experiences);
}

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newExperience = await request.json();
    const data = await readPortfolioData();
    
    if (!newExperience.id) {
      newExperience.id = `exp-${Date.now()}`;
    }
    
    data.experiences.push(newExperience);
    await updateExperiences(data.experiences);

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedExperience = await request.json();
    const data = await readPortfolioData();
    
    const index = data.experiences.findIndex((e) => e.id === updatedExperience.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    data.experiences[index] = updatedExperience;
    await updateExperiences(data.experiences);

    return NextResponse.json(updatedExperience);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      );
    }

    const data = await readPortfolioData();
    const filteredExperiences = data.experiences.filter((e) => e.id !== id);

    if (filteredExperiences.length === data.experiences.length) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    await updateExperiences(filteredExperiences);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
