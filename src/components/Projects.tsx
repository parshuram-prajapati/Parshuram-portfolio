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
      liveUrl: "https://parshuram-portfolio-6xjk.vercel.app/", 
    },
    {
      image: websiteProject,
      title: "Professional Website",
      description: "Responsive business website with modern design and animations.",
      liveUrl: "https://basavaraj.onrender.com/",
    },
  ];

  return (
    // Adjusted padding for mobile vs desktop
    <section id="projects" className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Centered Heading on mobile, Left align on desktop */}
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8 md:mb-12 text-center md:text-left">
          My Projects
        </h2>

        {/* Grid: 1 column on mobile, 2 columns on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto md:mx-0">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg group"
            >
              <div className="relative overflow-hidden">
                {/* Image height responsive: shorter on mobile */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="p-5 md:p-6 space-y-3 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm md:text-base text-gray-300">{project.description}</p>
                
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