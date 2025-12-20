import { ExternalLink } from "lucide-react";
import React from "react";

import hackyuvaImg from "@/assets/certificates/hackyuva.png";
import aiArenaImg from "@/assets/certificates/ai-arena.png";
import aiLiteracyImg from "@/assets/certificates/image.png";

/* -------------------- TYPES -------------------- */
interface Certificate {
  title: string;
  issuer: string;
  year: string;
  image: string;
  link: string;
}

/* -------------------- DATA -------------------- */
const certificates: Certificate[] = [
  {
    title: "Hackvyuha Hackathon Organizer",
    issuer: "HackYuva",
    year: "2025",
    image: hackyuvaImg,
    link: "https://drive.google.com/file/d/1xUvXGksGe_N0P8MgCYY7HP0Y0fQzTLlZ/view",
  },
  {
    title: "AI Arena Hackathon Participation",
    issuer: "AI Arena",
    year: "2025",
    image: aiArenaImg,
    link: "https://drive.google.com/file/d/1xUvXGksGe_N0P8MgCYY7HP0Y0fQzTLlZ/view",
  },
  {
    title: "AI Literacy (Earn a Digital Credential)",
    issuer: "IBM SkillsBuild",
    year: "2025",
    image: aiLiteracyImg,
    link: "https://drive.google.com/file/d/1-p0svBbmqyZotSINraVtljT5ZnjwxRCS/view?usp=sharing",
  },
];

/* -------------------- COMPONENT -------------------- */
const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">

        {/* SECTION TITLE */}
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-yellow-400">
            Certifications
          </h2>
          <p className="text-gray-400 mt-2">
            Hackathons and certifications I have participated in
          </p>
        </div>


        {/* CERTIFICATE GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {cert.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {cert.issuer} • {cert.year}
                </p>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-accent font-medium hover:underline"
                >
                  View Certificate <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;
