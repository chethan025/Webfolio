import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/projectgrid.css';
import useScrollReveal from './scrollReveal';
export const ProjectGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const { ref, visible } = useScrollReveal(0.1);
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
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
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setSelectedCard(null)
    });
  };

  useEffect(() => {
    if (selectedCard) {
      gsap.fromTo(
        '.modal-content',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [selectedCard]);

  return (
    <div id="projects-section" className="section projects-section">
      <h2>Projects</h2>
      <div
        ref={rootRef}
        className={`chroma-grid ${className}`}
        style={{
          '--r': `${radius}px`,
          '--cols': columns,
          '--rows': rows
        }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {items.map((c, i) => (
          <article
           ref={ref}
            key={i}
            className={"abc0 chroma-card " + (visible ? "abc1 animate__animated animate__zoomIn" : "")}
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c)}
            style={{
              '--card-border': c.borderColor || 'transparent',
              '--card-gradient': c.gradient,
              cursor: 'pointer'
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
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <div className='modalbg' style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.19), #2b2b2b), url(${selectedCard.image})`}}></div>
            <div className='modadetail-box'>
              <h2 className="modal-title">{selectedCard.title}</h2>
              <p>{selectedCard.description}</p>
              <a href={selectedCard.github} target="_blank" rel="noopener noreferrer" className="modal-link"> github repo </a>
              <a href={selectedCard.url} target="_blank" rel="noopener noreferrer" className="modal-link"> live demo </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;