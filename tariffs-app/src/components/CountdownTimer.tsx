"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  onExpire: () => void;
}

function StarIcon() {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 text-[#FFBB00]"
      style={{
        width: 14,
        height: 14,
        fontSize: 10,
        lineHeight: 1,
        borderRadius: "0.71px",
      }}
    >
      ✦
    </span>
  );
}

export default function CountdownTimer({ initialSeconds, onExpire }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, onExpire]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  const isWarning = seconds <= 30 && seconds > 0;
  const isExpired = seconds <= 0;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-white text-sm font-medium leading-tight tracking-wide">
        Успейте открыть пробную неделю
      </span>
      {isExpired ? (
        <span
          className="text-gray-400 tracking-widest"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "1.6rem", letterSpacing: "0.15em" }}
        >
          ВРЕМЯ ВЫШЛО
        </span>
      ) : (
        <span
          className={`tracking-widest transition-colors inline-flex items-center gap-1.5 ${
            isWarning ? "animate-blink-timer text-[#ef4444]" : "text-[#E8A04A]"
          }`}
          style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", letterSpacing: "0.12em" }}
        >
          <StarIcon />
          {pad(mins)} : {pad(secs)}
          <StarIcon />
        </span>
      )}
    </div>
  );
}
