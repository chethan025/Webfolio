import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from '../utils/data.json'
import "../styles/main-about.scss";
import useScrollReveal from './scrollReveal';

const skills = data.about.skills;

export default function SkillSection() {
  const { ref, visible } = useScrollReveal(0.5);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [dialogPos, setDialogPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const handleSkillClick = (skill, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedSkill(skill);
    setDialogPos({
      top: rect.top - 250, // adjust offset
      left: rect.left + rect.width / 2,
    });
  };

  // Close on outside click
  useEffect(() => {
    const closeOnOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setSelectedSkill(null);
      }
    };
    if (selectedSkill) document.addEventListener("click", closeOnOutside);
    return () => document.removeEventListener("click", closeOnOutside);
  }, [selectedSkill]);

  return (
    <>
      <div ref={ref} className={"abc Skills " + (visible ? "animate__animated animate__fadeInDown" : "")} id="skills">
        <div>
        <h2>Skills</h2>
        <div
          className="skills-container"
          ref={containerRef}
        >
          
          {skills.map((skill, index) => (
            <button
              key={index}
              onClick={(e) => handleSkillClick(skill, e)}
              
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img className="skill-logo" alt={skill.name} src={skill.logo} />
            </button>
          ))}

          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.2 }}
                className="skills-dropdown"
                style={{
                  top: dialogPos.top,
                  left: dialogPos.left
                }}
              >
                <div className="skill-name">
                  <h3 className="skill-h3" style={{ fontSize: 18 }}>
                    <img className="skill-logo" alt={selectedSkill.name} src={selectedSkill.logo} />
                    {selectedSkill.name}
                  </h3>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#929292",
                      fontSize: 18,
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#929292",
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {selectedSkill.description}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#929292",
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  Type: {selectedSkill.type}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#929292",
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  Skill type: {selectedSkill.skill_type}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span 
                    style={{
                      fontSize: 13,
                      color: "#929292"
                    }}
                  >Projects:</span>
                  {selectedSkill.projects.map((tag, i) => (
                    
                    <span
                      key={i}
                      style={{
                        background: "#929292",
                        color: "#000",
                        padding: "6px 12px",
                        borderRadius: 6,
                        fontSize: 11,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </>
  );
}
/* 
import React from "react";
import data from "../utils/data.json";
import "../styles/main-about.scss";

export default function Skills() {
  return (
    <>
      <div className="abc Skills" id="skills">
        <h2 className="skills-header">nigga</h2>
      </div>
    </>
  );
} */
