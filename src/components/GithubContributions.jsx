import React from "react";
import data from "../utils/data.json";
import GC from "./GC";
import GR from "./GR";
import GD from "./GD";
import "../styles/main-about.scss";

export default function GithubC() {
  return (
    <>
      <div className="abc github-contributions" id="github">
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
