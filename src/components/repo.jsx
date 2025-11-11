import React, { useEffect, useState } from "react";
import "../styles/main-about.scss";

export default function GithubRepo({ username, repo }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}`);
        const json = await res.json();

        if (json.message === "Not Found") {
          console.error(`Repo not found: ${username}/${repo}`);
          return;
        }

        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepo();
  }, [username, repo]);

  if (!data) return <p style={{ color: "#888" }}>Loading repo…</p>;

  return (
    <a
      className="grlnk"
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.03)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
      style={{display: "block", width: "18rem", padding:"1rem 2rem 2rem", border: "1px solid #eee", borderRadius: 8,}}
    >
      <h3 className="grh3">{data.name}</h3>

      <p
        style={{
          fontSize: 12,
          color: "#555",
          margin: "4px 0 8px 0",
        }}
      >
        {data.description || "No description"}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span>⭐ {data.stargazers_count}</span>
        <span>🍴 {data.forks_count}</span>
      </div>

      {data.language && (
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "#999",
          }}
        >
          {data.language}
        </div>
      )}
    </a>
  );
}
