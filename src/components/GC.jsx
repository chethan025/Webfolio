import React, { useEffect, useState } from "react";

export default function GithubContributions() {
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const weekdays = ["Mon", "Wed", "Fri"];

  // Dark mode mapping logic
  const mapToDarkColor = (color) => {
    const lightToDark = {
      "#ebedf0": "#909692", // high
    };
    return lightToDark[color] || color; // fallback if GitHub changes palette
  };

  useEffect(() => {
    const fetchData = async () => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;

      const query = `
        {
          user(login: "chethan025") {
            contributionsCollection(from: "${from}", to: "${to}") {
              contributionCalendar {
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (!data.data) {
          console.error("GraphQL error:", data);
          return;
        }

        // process color mapping BEFORE rendering
        const weeks =
          data.data.user.contributionsCollection.contributionCalendar.weeks.map(
            (week) => ({
              ...week,
              contributionDays: week.contributionDays.map((day) => ({
                ...day,
                color: mapToDarkColor(day.color.replace("ff", "")), // strip alpha if present
              })),
            })
          );

        setCalendar(weeks);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [year]);

  // Month labels
  const getMonthLabels = () => {
    const labels = [];
    let lastMonth = "";
    calendar.forEach((week, i) => {
      const firstDay = new Date(week.contributionDays[0].date);
      const month = firstDay.toLocaleString("default", { month: "short" });
      if (month !== lastMonth) {
        labels.push({ index: i, month });
        lastMonth = month;
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="p-4 gccc" style={{ color: "#d1d1d1" }}>
      <select
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
        style={{
          marginBottom: 16,
          padding: 4,
          backgroundColor: "#0d1117",
          color: "#c9d1d9",
          border: "1px solid #30363d",
          borderRadius: 4,
        }}
      >
        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
          (y) => (
            <option key={y} value={y}>
              {y}
            </option>
          )
        )}
      </select>

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: 5,
            justifyContent: "space-around",
            height: 12 * 7 + 6 * 6,
          }}
        >
          {weekdays.map((day, i) => (
            <div key={i} style={{ fontSize: 10, color: "#E4EBE6" }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", marginBottom: 2, marginLeft: 14 }}>
            {calendar.map((_, i) => {
              const label = monthLabels.find((m) => m.index === i);
              return (
                <div
                  key={i}
                  style={{
                    width: 14,
                    textAlign: "center",
                    fontSize: 10,
                    margin: .5,
                    color: "#E4EBE6",
                  }}
                >
                  {label ? label.month : ""}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex" }}>
            {calendar.map((week, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                {week.contributionDays.map((day, j) => (
                  <div
                    key={j}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    style={{
                      backgroundColor: day.color,
                      width: 12,
                      height: 12,
                      margin: 1.5,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
