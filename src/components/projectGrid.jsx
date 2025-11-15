import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "../styles/projectgrid.css";
import "../styles/projectModal.scss"
import useScrollReveal from "./scrollReveal";
import GithubRepos from "./repo";

export const ProjectGrid = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const { refs, visibleList } = useScrollReveal(0.5);
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const [selectedCard, setSelectedCard] = useState(null);

  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tarptaeya.github.io/repo-card/repo-card.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    gsap.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSelectedCard(null),
    });
  };

  useEffect(() => {
    if (selectedCard) {
      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selectedCard]);

  return (
    <div id="projects-section" className={"section projects-section "}>
      <div
        ref={rootRef}
        className={`chroma-grid ${className}`}
        style={{
          "--r": `${radius}px`,
          "--cols": columns,
          "--rows": rows,
        }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {items.map((c, i) => (
          
            <article
              ref={(el) => (refs.current[i] = el)}
              key={i}
              className={
                `abc0 ${c.id} chroma-card ` +
                (visibleList[i]
                  ? "abc1 animate__animated animate__zoomIn"
                  : "")
              }
              onMouseMove={handleCardMove}
              onClick={() => handleCardClick(c)}
              style={{
                "--card-border": c.borderColor || "transparent",
                "--card-gradient": c.gradient,
                cursor: "pointer",
              }}
            >
              <div className="chroma-img-wrapper">
                <img src={c.image} alt={c.title} loading="lazy" />
              </div>
            </article>
        ))}
        <div className="chroma-overlay" />
        <div ref={fadeRef} className="chroma-fade" />
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <div
              className="modalbg"
              style={{
                backgroundImage: `url(${selectedCard.image})`,
              }}
            ></div>
            <div className="modadetail-box">
              <div className="modal-tcontent">
              <h2 className="modal-title">{selectedCard.title}</h2>
              <p className="modal-descp">{selectedCard.description}</p>
            </div>
              <div className="modal-skills-tags">Skills Used:
                {selectedCard.skills.map((tag, i) => (
                <span key={i} className="project-tag">
                  {tag}
                </span>
              ))}

              </div>
              <div className="modal-repo">
                <GithubRepos username={selectedCard.username} repo={selectedCard.repo} />
              </div>
              <div className="modal-demo">
                <a
                  href={selectedCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  {" "}
                  live demo{" "}
                </a>
              </div>
              
              <div className="modal-skills-tags">Skills:</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
