import React from "react";
import { motion } from "framer-motion";

export default function Website() {
  const courseworkImages = Array.from({ length: 20 }, (_, i) =>
    `/coursework_pages/full_page_${i + 1}.png`
  );

  const skills = [
    "HTML", "CSS", "Python", "C++", "Java", "JavaScript", "SQL",
    "Git", "Software Development", "Programming"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 px-4 py-10 font-sans">
      <header className="mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"
        >
          Oisin McNicholl
        </motion.h1>
        <p className="text-gray-400 mt-2">Computer Science Student | Queen's University Belfast</p>
        <p className="text-sm mt-1 text-gray-500">Limavady, UK | 07984612053 | oisinmcnicholl4@gmail.com</p>
        <a
          href="https://www.linkedin.com"
          className="text-cyan-400 hover:underline mt-2 inline-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <a
          // href="/Oisin_mcnicholl_-_University_Student Final CV copy (1).pdf"
          download
          className="mt-6 inline-block px-6 py-2 bg-cyan-500 text-white rounded-lg shadow hover:bg-cyan-400 transition-all"
        >
          Download CV
        </a>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        <GlowSection title="About Me">
          <p>
            I'm a computer science student at Queen's University Belfast, building strong foundations in programming and software development. I love solving problems, writing code, and creating tech that works beautifully.
          </p>
        </GlowSection>

        <GlowSection title="Education">
          <p><strong>Queen's University Belfast</strong>, BSc Computer Science (2023–2027)</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Level 1 Modules: Computer Architecture (47%), Databases (52%), Cybersecurity (80%), Web Tech (53%), Programming (55%)</li>
            <li>Level 2 Modules: Software Engineering (63%), Data Structures (62%), Transferable Skills (68%)</li>
          </ul>
          <p className="mt-2">A Levels: Technology & Design (B), Software Systems Development (B), Physics (C)</p>
        </GlowSection>

        <GlowSection title="Skills">
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <span key={skill} className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-cyan-500 transition">
                {skill}
              </span>
            ))}
          </div>
        </GlowSection>

        <GlowSection title="Courses & Certifications">
          <ul className="list-disc list-inside ml-4">
            <li>Java Masterclass – Udemy</li>
            <li>C# Crash Course – Udemy</li>
            <li>C++ Masterclass – Udemy</li>
            <li>RNLI Lifeguard Certification</li>
          </ul>
        </GlowSection>

        <GlowSection title="Achievements">
          <ul className="list-disc list-inside ml-4">
            <li>Top achiever in Software Systems Dev & Technology and Design</li>
            <li>Best project awards in both subjects</li>
            <li>Swimmer of the Year & Swim Team Captain</li>
          </ul>
        </GlowSection>

        <GlowSection title="Projects">
          <ul className="list-disc list-inside ml-4">
            <li>Department store app (C# & SQL)</li>
            <li>Java food-based library app with UML + bug testing</li>
            <li>Unity game combining turn-based, survival & platforming (C# & AI)</li>
            <li>Arduino-powered reaction game with custom PCB</li>
          </ul>
        </GlowSection>

        <GlowSection title="Soft Skills">
          <p>Problem Solving • Teamwork • Adaptability • Leadership • Communication • Work Ethic</p>
        </GlowSection>

        <GlowSection title="Extracurricular Activities">
          <p><strong>QUB Clubs:</strong> Surfing, Swimming, Snowsports, Computer Science, Muay Thai</p>
          <p><strong>Hobbies:</strong> Gaming, Coding Challenges, Brain Teasers, Surfing</p>
        </GlowSection>

        <GlowSection title="Internships">
          <p>Seagate Experience Day – Led team in solving algorithmic challenges efficiently.</p>
        </GlowSection>

        <GlowSection title="A-Level Technology Coursework Project">
          <p className="mb-4 text-gray-400">
          Full scan of my coursework project: designing and building a custom reaction game device with Arduino + PCB + documentation.
          </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 20 }, (_, i) => (
            <img
              key={i}
              src={`${process.env.PUBLIC_URL}/coursework_pages/full_page_${i + 1}.png`}
              alt={`Coursework Page ${i + 1}`}
              className="rounded shadow-md"
            />
          ))}
        </div>
        </GlowSection>

        <a
          href={`${process.env.PUBLIC_URL}/40401731carnival%20(9)/db%20project/index1.html`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-5 right-5 z-50 bg-emerald-500 text-white text-2xl p-4 rounded-full shadow-lg hover:bg-emerald-400 transition-all"
          title="Play Game"
        >
          Play a game?
  
        </a>


        


        <GlowSection title="References">
          <p>Paul Bradley – pbradley948@c2ken.net</p>
          <p>Peter Hill – phill2806@googlemail.com | 0759522779</p>
        </GlowSection>
      </main>
    </div>
  );
}

function GlowSection({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-800 p-6 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        {title}
      </h2>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </motion.section>
  );
}
