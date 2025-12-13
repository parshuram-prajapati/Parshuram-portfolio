import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import portfolioProject from "@/assets/portfolio-project.jpg";
import websiteProject from "@/assets/website-project.jpg";

const Projects = () => {
  const projects = [
    {
      image: portfolioProject,
      title: "Portfolio Website",
      description: "Modern portfolio with HTML/CSS/JS deployed on GitHub Pages.",
      // CHANGED: Renamed key to liveUrl and guessed your GH Pages link
      liveUrl: "https://parshuram-portfolio-6xjk.vercel.app/", 
    },
    {
      image: websiteProject,
      title: "Professional Website",
      description: "Responsive business website with modern design and animations.",
      // CHANGED: Renamed key to liveUrl
      liveUrl: "https://basavaraj.onrender.com/",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-12">My Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
                
                {/* CHANGED: Updated Button to use liveUrl and say "Live Demo" */}
                <Button
                  variant="outline"
                  className="w-full group/btn bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => window.open(project.liveUrl, "_blank")}
                >
                  Live Demo
                  <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;