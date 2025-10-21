import React, { useEffect, useState } from "react";

export default function GithubContributions() {
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const weekdays = ["Mon", "Wed", "Fri"];

  useEffect(() => {
    const fetchData = async () => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;

      const query = `
        {
          user(login: "chethan025") {
            contributionsCollection(from: "${from}", to: "${to}") {
              contributionCalendar {
                totalContributions
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

        const weeks =
          data.data.user.contributionsCollection.contributionCalendar.weeks;
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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">
        GitHub Contributions ({year})
      </h2>

      {/* Year Selector */}
      <select
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
        style={{ marginBottom: 16, padding: 4 }}
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
        {/* Weekday labels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: 4,
            justifyContent: "space-between",
            height: 12 * 7 + 6 * 6,
          }}
        >
          {weekdays.map((day, i) => (
            <div key={i} style={{ fontSize: 10, color: "#666" }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Month labels */}
          <div style={{ display: "flex", marginBottom: 2, marginLeft: 14 }}>
            {calendar.map((_, i) => {
              const label = monthLabels.find((m) => m.index === i);
              return (
                <div
                  key={i}
                  style={{
                    width: 12 + 2,
                    textAlign: "center",
                    fontSize: 10,
                    color: "#666",
                  }}
                >
                  {label ? label.month : ""}
                </div>
              );
            })}
          </div>

          {/* Contribution squares */}
          <div style={{ display: "flex" }}>
            {calendar.map((week, i) => (
              <div
                key={i}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {week.contributionDays.map((day, j) => (
                  <div
                    key={j}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    style={{
                      backgroundColor: day.color,
                      width: 12,
                      height: 12,
                      margin: 1,
                      borderRadius: 2,
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
