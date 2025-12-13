import { useEffect, useRef, useState } from "react";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Code2,
  Brain,
  GraduationCap,
} from "lucide-react";

const About = () => {
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState(0);
  const animated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animate(setProjects, 0, 5, 1200);
          animate(setExperience, 0, 1, 1200);
        }
      },
      { threshold: 0.2 } // Lower threshold for mobile
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animate = (
    setter: (v: number) => void,
    start: number,
    end: number,
    duration: number
  ) => {
    let startTime: number | null = null;
    const step = (t: number) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      setter(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const socials = [
    { icon: Linkedin, link: "https://www.linkedin.com/in/parashuram-prajapati-97659a32a/" },
    { icon: Instagram, link: "https://www.instagram.com/its_me_parshuram_18" },
    { icon: Facebook, link: "https://www.facebook.com/share/15SJ5GW2Da/" },
    { icon: Youtube, link: "https://www.youtube.com/@urbanshorts18" },
  ];

  const skills = ["C", "C++", "Java", "Python", "HTML", "CSS", "JavaScript", "PHP"];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Heading */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            About <span className="text-accent">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-6 md:space-y-8">
            <div className="glass p-6 md:p-8 rounded-2xl border border-white/10">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Hi, I’m <span className="text-white font-semibold">Parshuram Prajapati</span>,
                a Computer Science undergraduate specializing in
                <span className="text-accent"> AI & Machine Learning</span> at
                BLDEA College of Engineering, Vijayapur.
              </p>

              <p className="text-gray-400 mt-4 leading-relaxed text-sm md:text-base">
                I enjoy building modern web applications and continuously improving
                my problem-solving skills using C++, Java, and Python, while learning
                the fundamentals of AI & ML.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-center md:text-left">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-accent hover:border-accent transition cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 justify-center md:justify-start">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-black transition transform hover:scale-110"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT STATS */}
          <div ref={ref} className="grid grid-cols-2 gap-4 md:gap-6">

            <div className="glass-card p-4 md:p-6 rounded-xl hover:-translate-y-1 transition text-center">
              <Code2 className="text-accent mb-3 mx-auto w-8 h-8" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">{projects}+</h3>
              <p className="text-gray-400 text-xs md:text-sm">Web Projects</p>
            </div>

            <div className="glass-card p-4 md:p-6 rounded-xl hover:-translate-y-1 transition text-center">
              <Brain className="text-purple-400 mb-3 mx-auto w-8 h-8" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">{experience}+</h3>
              <p className="text-gray-400 text-xs md:text-sm">Year Learning</p>
            </div>

            <div className="glass-card p-4 md:p-6 rounded-xl col-span-2 flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0">
                <GraduationCap size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-semibold text-sm md:text-base">BLDEA College of Engineering</h4>
                <p className="text-green-400 text-xs md:text-sm">B.E. – CSE (AI & ML)</p>
                <p className="text-gray-500 text-[10px] md:text-xs">Vijayapur, Karnataka</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;