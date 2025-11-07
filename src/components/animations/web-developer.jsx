import { useEffect, useState } from "react";

export default function MorphTextLoop({
  from = "PORTFOLIO",
  to = "WEB DEVELOPER",
  speed = 190,            // speed of each letter transform
  intervalTime = 3000,   // WAIT time between FULL morphs
  className = "",
  parentClassName = "",
}) {
  const [current, setCurrent] = useState(from);
  const [direction, setDirection] = useState(true); 
  // true = from → to, false = to → from

  // morph one full pass
  const morphOnce = (start, end, done) => {
    let i = 0;
    const max = Math.max(start.length, end.length);

    const interval = setInterval(() => {
      i++;

      const next =
        end.slice(0, i) +
        start.slice(i);

      setCurrent(next.padEnd(max, " "));

      if (i >= max) {
        clearInterval(interval);
        done && done();
      }
    }, speed);
  };

  useEffect(() => {
    const loop = setInterval(() => {
      if (direction) {
        morphOnce(from, to, () => setDirection(false));
      } else {
        morphOnce(to, from, () => setDirection(true));
      }
    }, intervalTime);

    return () => clearInterval(loop);
  }, [direction, from, to, speed, intervalTime]);

  return (
    <span className={parentClassName}>
      {current.split("").map((ch, index) => (
        <span key={index} className={className}>
          {ch}
        </span>
      ))}
    </span>
  );
}
