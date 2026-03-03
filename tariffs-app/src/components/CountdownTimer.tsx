"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  onExpire: () => void;
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
      <span className="text-white text-sm font-medium leading-tight">
        Успейте открыть пробную неделю
      </span>
      {isExpired ? (
        <span className="text-gray-400 text-base font-bold tracking-widest">
          Время вышло
        </span>
      ) : (
        <span
          className={`text-base font-bold tracking-widest transition-colors ${
            isWarning ? "animate-blink-timer" : "text-[#E8A04A]"
          }`}
        >
          ✦ {pad(mins)} : {pad(secs)} ✦
        </span>
      )}
    </div>
  );
}
