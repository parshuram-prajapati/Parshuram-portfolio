import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";

const Index = () => {
  return (
    // Added bg-transparent explicitly
    <div className="min-h-screen bg-transparent relative">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />
    </div>
  );
};

export default Index;