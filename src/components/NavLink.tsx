import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="text-white font-bold text-lg">
          <span className="text-accent">&lt;</span>Code-By-Parshuram
          <span className="text-accent">/&gt;</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-accent transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire Me Button (Desktop) */}
        <a
          href="#contact"
          className="hidden md:inline-block px-5 py-2 rounded-lg bg-accent text-black font-medium hover:opacity-90 transition"
        >
          Hire Me
        </a>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
          <ul className="flex flex-col px-6 py-6 space-y-5 text-gray-300">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg hover:text-accent transition"
                >
                  {link.name}
                </a>
              </li>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block px-5 py-3 text-center rounded-lg bg-accent text-black font-medium"
            >
              Hire Me
            </a>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
