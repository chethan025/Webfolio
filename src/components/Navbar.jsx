import React, { useEffect, useState } from "react";
import "../styles/main.scss";
import "../styles/Navbar.scss";

function Navbar() {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const headerSection = document.getElementById("header-section");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSolid(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (headerSection) observer.observe(headerSection);

    return () => {
      if (headerSection) observer.unobserve(headerSection);
    };
  }, []);

  return (
    <nav className={`navbar ${isSolid ? "solid" : ""}`}>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
