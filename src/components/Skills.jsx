import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from '../utils/data.json'

const skills = data.about.skills;

export default function SkillSection() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [dialogPos, setDialogPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const handleSkillClick = (skill, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedSkill(skill);
    setDialogPos({
      top: rect.top - 246, // adjust offset
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
    <div className=" abc Skills" id="skills">
      <h2>Skills</h2>
      <div
        className="skills-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          padding: 16,
          position: "relative",
        }}
        ref={containerRef}
      >
        
        {skills.map((skill, index) => (
          <button
            key={index}
            onClick={(e) => handleSkillClick(skill, e)}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              transition: "0.2s",
              position: "relative",
              color: "#fff",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={skill.logo}  width={40} height={40} />
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
              style={{
                position: "fixed",
                top: dialogPos.top,
                left: dialogPos.left,
                transform: "translate(-50%, -100%)",
                zIndex: 1000,
                background: "#0d1117",
                border: "1px solid #222",
                color: "#fff",
                borderRadius: 12,
                padding: 20,
                width: "22rem",
                boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontSize: 18 }}>{selectedSkill.name}</h3>
                <button
                  onClick={() => setSelectedSkill(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#aaa",
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
                  color: "#aaa",
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {selectedSkill.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selectedSkill.projects.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#1f6feb",
                      color: "#fff",
                      padding: "4px 8px",
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
