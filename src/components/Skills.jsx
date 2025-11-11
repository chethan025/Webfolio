import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../utils/data.json";
import "../styles/main-about.scss";
import useScrollReveal from "./scrollReveal";

const skills = data.about.skills;

export default function SkillSection() {
  const { ref, visible } = useScrollReveal(0.5);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [dialogPos, setDialogPos] = useState({ top: 0, left: 0 });

  const handleSkillClick = (skill, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedSkill(skill);
    setDialogPos({
      top: rect.top - 280,
      left: rect.left + rect.width / 2,
    });
  };

  // Close on outside click
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".skills-dropdown") && !e.target.closest(".skills-container button")) {
        setSelectedSkill(null);
      }
    };

    if (selectedSkill) document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, [selectedSkill]);

  return (
    <>
      <div
        ref={ref}
        className={
          "abc Skills " +
          (visible ? "animate__animated animate__fadeInDown" : "")
        }
        id="skills"
      >
        <h2>Skills</h2>

        <div className="skills-container">
          {skills.map((skill, index) => (
            <button
              key={index}
              onClick={(e) => handleSkillClick(skill, e)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img className="skill-logo" alt={skill.name} src={skill.logo} />
            </button>
          ))}
        </div>
      </div>

      {/* DROPDOWN FLOATS ABOVE EVERYTHING */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            key={selectedSkill.name}
            className="skills-dropdown"
            style={{
              top: dialogPos.top,
              left: dialogPos.left,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.18 }}
          >
            <div className="skill-name">
              <h3 className="skill-h3">
                <img
                  className="skill-logo"
                  alt={selectedSkill.name}
                  src={selectedSkill.logo}
                />
                {selectedSkill.name}
              </h3>

              <button
                className="close-btn"
                onClick={() => setSelectedSkill(null)}
              >
                ✕
              </button>
            </div>

            <p className="skill-desc">{selectedSkill.description}</p>
            <p className="skill-desc">Type: {selectedSkill.type}</p>
            <p className="skill-desc">Skill type: {selectedSkill.skill_type}</p>

            <div className="projects">
              <span className="projects-label">Projects:</span>
              {selectedSkill.projects.map((tag, i) => (
                <span key={i} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
