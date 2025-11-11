import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Navbar.scss";

function Navbar() {
  const [isSolid, setIsSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = document.getElementById("header-section");
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSolid(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(header);
    return () => observer.unobserve(header);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar ${isSolid ? "solid" : ""}`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="nav-inner">
          {/* Desktop Pills Menu */}
          <ul className="desktop-menu">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button className="hamburger" onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>
      </motion.nav>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <Dialog open={open} onClose={setOpen} className="relative z-50">
            <div className="fixed inset-0 bg-black/40" />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="drawer"
            >
              <button className="close-btn" onClick={() => setOpen(false)}>
                ×
              </button>
              <ul className="drawer-links">
                <li>
                  <a href="#home" onClick={() => setOpen(false)}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={() => setOpen(false)}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={() => setOpen(false)}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Contact
                  </a>
                </li>
              </ul>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
