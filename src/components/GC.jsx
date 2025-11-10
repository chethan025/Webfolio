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
          backgroundColor: "#232925",
          color: "#c9d1d9",
          border: "1px solid #30363d07",
          borderRadius: 4,
          justifySelf: "end",
          width: "max-content",
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

      <div className="gcbox">
        <div className="gcwks">
          
          {weekdays.map((day, i) => (
            <div className="gcwkds" key={i}>
              {day}
            </div>
          ))}
        </div>

        <div className="gcmnts">
          <div style={{ display: "flex", marginBottom: 2, marginLeft: 14 }}>
            {calendar.map((_, i) => {
              const label = monthLabels.find((m) => m.index === i);
              return (
                <div
                className="gcmtnm"
                  key={i}
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
                  className="gccntbc"
                    key={j}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    style={{
                      backgroundColor: day.color,
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
