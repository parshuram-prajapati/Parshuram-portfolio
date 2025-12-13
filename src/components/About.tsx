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
      { threshold: 0.4 }
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
    <section id="about" className="py-24">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white">
            About <span className="text-accent">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl border border-white/10">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hi, I’m <span className="text-white font-semibold">Parshuram Prajapati</span>,
                a Computer Science undergraduate specializing in
                <span className="text-accent"> AI & Machine Learning</span> at
                BLDEA College of Engineering, Vijayapur.
              </p>

              <p className="text-gray-400 mt-4 leading-relaxed">
                I enjoy building modern web applications and continuously improving
                my problem-solving skills using C++, Java, and Python, while learning
                the fundamentals of AI & ML.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-white font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-accent hover:border-accent transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-black transition"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT STATS */}
          <div ref={ref} className="grid sm:grid-cols-2 gap-6">

            <div className="glass-card p-6 rounded-xl hover:-translate-y-1 transition">
              <Code2 className="text-accent mb-3" />
              <h3 className="text-3xl font-bold text-white">{projects}+</h3>
              <p className="text-gray-400 text-sm">Web Projects</p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:-translate-y-1 transition">
              <Brain className="text-purple-400 mb-3" />
              <h3 className="text-3xl font-bold text-white">{experience}+</h3>
              <p className="text-gray-400 text-sm">Year Learning</p>
            </div>

            <div className="glass-card p-6 rounded-xl sm:col-span-2 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                <GraduationCap size={28} />
              </div>
              <div>
                <h4 className="text-white font-semibold">BLDEA College of Engineering</h4>
                <p className="text-green-400 text-sm">B.E. – CSE (AI & ML)</p>
                <p className="text-gray-500 text-xs">Vijayapur, Karnataka</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
