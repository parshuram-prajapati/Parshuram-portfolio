import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates"; // ✅ ADD THIS

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />

      {/* 🎓 Certificates Section */}
      <Certificates />

    </div>
  );
};

export default Index;
