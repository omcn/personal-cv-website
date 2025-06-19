import React from "react";
import { motion } from "framer-motion";

export default function Website() {
  const skills = [
    "HTML", "CSS", "JavaScript", "Java", "C#", "SQL", "C++", "Python", "React (Next.js)", "Node.js"
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
        <p className="text-gray-400 mt-2">Limavady, United Kingdom | oisinmcnicholl4@gmail.com | Full UK Driving License</p>
        <p className="text-sm mt-1 text-gray-500">
          GitHub: <a href="https://github.com/omcn" className="text-cyan-400 hover:underline">omcn</a> |
          Website: <a href="https://forkmyfeelings.com/" className="text-cyan-400 hover:underline">forkmyfeelings.com</a> |
          LinkedIn: <a href="https://www.linkedin.com/in/omcn100/" className="text-cyan-400 hover:underline">omcn100</a>
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        <GlowSection title="Profile">
          <p>
            Computer Science undergraduate at Queen’s University Belfast seeking placement with a strong foundation in programming and full-stack development. Skilled in building interactive applications and solving real-world problems. I am a competitive swimmer who is used to high-pressure environments, and I am eager to contribute to innovative technical teams and continuously develop my professional skills.
          </p>
        </GlowSection>

        <GlowSection title="Education">
          <p><strong>Queen’s University Belfast</strong> — BSc Computer Science (2023 – 2027) | Currently on a 2:1 as of 2nd year exams June 9th 2025.</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Level 2 Relevant Modules: Software Engineering (73%), Data Structures and Algorithms (63%), Professional Skills (68%)</li>
            <li>Level 1 Relevant Modules: Cybersecurity (80%)</li>
            <li>A Levels (2023): Technology and Design (B), Software Systems Development (B), Physics (C)</li>
            <li>AS Levels (2022): Technology and Design (A), Software Systems Development (A), Physics (B)</li>
          </ul>
        </GlowSection>

        <GlowSection title="Technical Skills">
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <span key={skill} className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-cyan-500 transition">
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-400">Tools: Eclipse, MySQL Server, Visual Studio, VS Code, Supabase, GitHub, GitLab, Anaconda, Jupyter Notebook, Pycharm, IntelliJ, Arduino IDE, Vercel</p>
        </GlowSection>

        <GlowSection title="Certificates">
          <ul className="list-disc list-inside ml-4">
            <li>Java Masterclass by Tim Buchalka (Udemy)</li>
            <li>C# Crash Course by Tim Buchalka</li>
            <li>Learn to Create Jarvis AI with Python by Arbaz Khan (Udemy)</li>
          </ul>
        </GlowSection>

        <GlowSection title="Projects">
          <ul className="list-disc list-inside ml-4">
            <li><strong>Fork my Feelings</strong> – Full-stack mood-based recipe app using React (Next.js), Supabase, WebRTC, and Framer Motion.</li>
            <li><strong>Software Engineering Project</strong> – Monopoly-inspired Java game built in Eclipse as part of a 5-person team using GitLab.</li>
            <li><strong>AI Coursework</strong> – Built custom image features and trained models (Logistic Regression, k-NN, Random Forests) for binary classification.</li>
            <li><strong>Unity Game</strong> – Designed multi-genre adventure game (turn-based, survival, platformer) using C# and mesh AI.</li>
            <li><strong>Arduino Reaction Game</strong> – Built a physical reaction game using custom PCBs and Arduino, documented with a 20-page report.</li>
          </ul>
        </GlowSection>
        <GlowSection title="A-Level Technology Coursework Project">
          <p className="mb-4 text-gray-400">
            Full scan of my coursework project: designing and building a custom reaction game device with Arduino, PCB design, and documentation.
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


        <GlowSection title="Work & Volunteering Experience">
          <ul className="list-disc list-inside ml-4">
            <li>Lifeguard Training & Certification: In-depth CPR, rescue coordination, teamwork.</li>
            <li>Seagate Experience Day: Team lead in algorithmic challenge, 1st place finish.</li>
            <li>Bentley Experience Day: Exposure to engineering workflows and innovation.</li>
            <li>QUB Surf Club Safety Officer: Conducted risk assessments and led emergency responses.</li>
            <li>Swim Club Team Captain: Mentored younger swimmers and organized swim galas.</li>
          </ul>
        </GlowSection>

        <GlowSection title="Achievements & Experience">
          <ul className="list-disc list-inside ml-4">
            <li>Top achiever in Software Systems Development and Technology & Design.</li>
            <li>Taught myself SSD syllabus and earned top marks after teacher absence.</li>
            <li>Swimmer of the Year – Achieved national finals while maintaining a 5:30 AM training schedule and balancing academics with personal projects.</li>
          </ul>
        </GlowSection>

        <GlowSection title="Extra-Curricular">
          <p><strong>QUB Clubs:</strong> Surfing, Swimming, Snowsports, Computer Science, Muay Thai</p>
        </GlowSection>
        
          <a
            href="https://omcn.github.io/personal-cv-website/40401731carnival%20(9)/db%20project/index1.html"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed top-5 right-5 z-50 bg-emerald-500 text-white text-2xl p-4 rounded-full shadow-lg hover:bg-emerald-400 transition-all"
            title="Play Game"
          >
            Play a game?
          </a>

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
