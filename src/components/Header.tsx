import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ UPDATED NAV LINKS (Certificates added)
  const navLinks = [
    { name: "Home", path: "/#home" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Projects", path: "/#projects" },
    { name: "Certificates", path: "/#certificates" }, // ✅ ADD THIS
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* LOGO */}
          <Link className="text-2xl font-bold" to="/">
            <span className="text-accent">&lt;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Code-By-Parshuram
            </span>
            <span className="text-accent">/&gt;</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.path.replace("/", ""));
                }}
                className="hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}

            <Link to="/hire-me">
              <Button>Hire Me</Button>
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE NAV */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 w-full z-50 md:hidden">
          <div className="glass backdrop-blur-xl bg-black/60 border-b border-white/10">
            <nav className="flex flex-col gap-6 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.path.replace("/", ""));
                  }}
                  className="text-lg text-white hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <Link
                to="/hire-me"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full text-lg">Hire Me</Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
