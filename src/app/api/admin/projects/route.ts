import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";
import { readPortfolioData, updateProjects } from "@/lib/storage";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readPortfolioData();
  return NextResponse.json(data.projects);
}

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newProject = await request.json();
    const data = await readPortfolioData();
    
    // Generate ID if not provided
    if (!newProject.id) {
      newProject.id = `project-${Date.now()}`;
    }
    
    data.projects.push(newProject);
    await updateProjects(data.projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
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
    const updatedProject = await request.json();
    const data = await readPortfolioData();
    
    const index = data.projects.findIndex((p) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    data.projects[index] = updatedProject;
    await updateProjects(data.projects);

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
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
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const data = await readPortfolioData();
    const filteredProjects = data.projects.filter((p) => p.id !== id);

    if (filteredProjects.length === data.projects.length) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await updateProjects(filteredProjects);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
