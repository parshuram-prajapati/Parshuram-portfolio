import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Projects", path: "/#projects" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center">
        {/* 1. UPGRADED LOGO: Removed box border, added gradient text */}
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-accent">&lt;</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Code-By-Parshuram
          </span>
          <span className="text-accent">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => {
                if (link.path.startsWith("/#")) {
                  e.preventDefault();
                  scrollToSection(link.path.substring(1));
                }
              }}
              // 2. UPGRADED NAV: Added Yellow hover effect
              className="text-sm font-medium text-foreground/90 hover:text-accent transition-colors duration-300 uppercase tracking-wide cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          
          <Link to="/hire-me">
            <Button className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Hire Me
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/10 absolute w-full">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  if (link.path.startsWith("/#")) {
                    e.preventDefault();
                    scrollToSection(link.path.substring(1));
                  }
                }}
                className="text-foreground hover:text-accent transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <Link to="/hire-me" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Hire Me</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;