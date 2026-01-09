import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import SearchInput from "@/components/SearchInput";
import ProjectItem from "@/components/ProjectItem";
import CodeViewer from "@/components/CodeViewer";
import { projects, Project } from "@/data/projects";

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;
    const query = search.toLowerCase();
    return projects.filter((project) =>
      project.title.toLowerCase().includes(query)
    );
  }, [search]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Search */}
          <div className="mb-8 animate-fade-up">
            <SearchInput
              value={search}
              onChange={setSearch}
            />
          </div>

          {/* Project List */}
          <div className="space-y-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProjectItem
                    title={project.title}
                    onClick={() => handleProjectClick(project)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-muted-foreground animate-fade-in">
                No projects found
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Code Viewer */}
      <CodeViewer
        project={selectedProject}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />
    </div>
  );
};

export default Index;
