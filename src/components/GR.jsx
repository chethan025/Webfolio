import React, { useEffect, useState } from "react";

export default function GithubPinnedRepos({ usernames }) {
  const [reposByUser, setReposByUser] = useState({}); // { username: [repos] }

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      const allRepos = {};

      for (const username of usernames) {
        const query = `
          {
            user(login: "${username}") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    stargazerCount
                    forkCount
                    primaryLanguage {
                      name
                      color
                    }
                    url
                  }
                }
              }
            }
          }
        `;

        try {
          const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          const data = await res.json();
          if (!data.data) {
            console.error(`GraphQL error for ${username}:`, data);
            continue;
          }

          allRepos[username] = data.data.user.pinnedItems.nodes;
        } catch (err) {
          console.error(`Fetch error for ${username}:`, err);
        }
      }

      setReposByUser(allRepos);
    };

    fetchPinnedRepos();
  }, [usernames]);

  return (
    <div className="mt-6">
      {Object.keys(reposByUser).map((username) => (
        <div key={username} style={{ marginBottom: 40 }}>
          <p className="text-xl font-semibold mb-4">
            Pinned Repositories
          </p>
          <div className="" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {reposByUser[username].map((repo) => (
              <a
              className="grlnk"
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h3 className="grh3">{repo.name}</h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "#555",
                    margin: "4px 0 8px 0",
                  }}
                >
                  {repo.description || "No description"}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                  }}
                >
                  <span>⭐ {repo.stargazerCount}</span>
                  <span>🍴 {repo.forkCount}</span>
                </div>
                {repo.primaryLanguage && (
                  <div
                    style={{
                      marginTop: 6,
                      height: 10,
                      width: 10,
                      borderRadius: "50%",
                      backgroundColor: repo.primaryLanguage.color,
                      display: "inline-block",
                      marginRight: 4,
                    }}
                    title={repo.primaryLanguage.name}
                  ></div>
                )}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
