import { AnimatedFolder } from "./Folllder";
// import { AnimatedFolder } from "@/components/ui/3d-folder"
import data from "../utils/data.json";
import "../styles/projects.scss";

const ProjectsData = data.projects;

export default function Project() {
  return (
    <div id="projects" className={"section projects-section "}>
      <h2 className="text-2xl font-bold">Projects</h2>
      <main className="min-h-screen bg-background flex items-center justify-center w-full">
        {/* Main content */}
        <section className="max-w-8xl mx-auto px-4 py-16">
          <div className="gingerpotato">
            {ProjectsData.map((folder) => (
              <AnimatedFolder
                key={folder.title}
                title={folder.title}
                projects={folder.projects}
                url={folder.url}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
