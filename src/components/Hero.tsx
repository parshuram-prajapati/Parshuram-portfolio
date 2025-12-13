import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Code2, Terminal, Cpu } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleHireMe = () => {
    navigate("/hire-me");
  };

  const downloadCV = () => {
    window.open(
      "https://drive.google.com/file/d/1zGdCcqjs4XNVPDIABYgjbiJgI4M7p9rW/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-transparent pt-20 relative overflow-visible">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <h3 className="text-xl text-accent font-medium tracking-wide flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Hello, I'm
            </h3>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white">
              Parshuram <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Prajapati
              </span>
            </h1>
            
            {/* UPDATED HEADLINE */}
            <div className="text-2xl sm:text-3xl font-semibold text-accent">
              Web Developer<span className="text-white"> & AI Enthusiast</span>
            </div>
            
            {/* UPDATED DESCRIPTION */}
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              Computer Science (AIML) student building modern, responsive web applications while exploring the frontiers of Machine Learning.
            </p>

            {/* NEW SKILLS LINE */}
            <div className="flex flex-wrap gap-2 text-sm font-mono text-gray-400">
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10">C/C++</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Java</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10">Python</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/10">React/JS</span>
              <span className="px-2 py-1 bg-accent/10 text-accent rounded border border-accent/20">Learning AI/ML</span>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={handleHireMe} 
                size="lg" 
                className="font-bold text-md px-8 py-6 shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all duration-300"
              >
                Hire Me <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                onClick={downloadCV}
                variant="outline"
                size="lg"
                className="font-bold text-md px-8 py-6 border-2 border-white/20 bg-transparent text-white hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
              >
                Download CV <Download className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Premium Image Styling */}
          <div className="flex justify-center md:justify-end relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-accent/20 blur-[100px] rounded-full -z-10 opacity-70"></div>
            
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-accent to-primary rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative rounded-[2rem] bg-black p-2 overflow-hidden ring-1 ring-white/10">
                <img
                  src={profileImage}
                  alt="Parshuram Prajapati"
                  className="w-full h-auto rounded-[1.8rem] object-cover shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;