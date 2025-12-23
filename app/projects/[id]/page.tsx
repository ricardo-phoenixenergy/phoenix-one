import ProjectDetailsClient from '../../components/ProjectDetailsClient';
import { projectsData } from '../../data/projectData';

// Required for static export - generates static pages for each project
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params since it's a Promise in Next.js 15+
  const { id } = await params;
  
  // Find project by ID on the server
  const project = projectsData.find(p => p.id === id);
  
  return <ProjectDetailsClient initialProject={project} />;
}