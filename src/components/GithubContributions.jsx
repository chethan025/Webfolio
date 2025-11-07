import React from "react";
import data from "../utils/data.json";
import GC from "./GC";
import GR from "./GR";
import GD from "./GD";
import "../styles/main-about.scss";
import useScrollReveal from './scrollReveal';
export default function GithubC() {
  const { ref, visible } = useScrollReveal(0.5);
  return (
    <>
      <div ref={ref} className={"abc github-contributions " + (visible ? "animate__animated animate__fadeInRight" : "")} id="github">
        <h2 className="text-xl font-semibold mb-2">
          GitHub Contributions
        </h2>
        <GC />
        <GR usernames={["chethan025"]} />
        <GD />
      </div>
    </>
  );
}
