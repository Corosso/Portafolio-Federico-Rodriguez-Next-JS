import { NextResponse } from 'next/server';
import projectsData from '../../data/projects.json';

export async function GET() {
  try {
    return NextResponse.json(projectsData.projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al cargar los proyectos' },
      { status: 500 }
    );
  }
}