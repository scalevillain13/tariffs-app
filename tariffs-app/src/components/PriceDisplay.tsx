"use client";

import { useState, useEffect } from "react";

interface PriceDisplayProps {
  price: number;
  fullPrice: number;
  timerExpired: boolean;
  largeText?: boolean;
}

export default function PriceDisplay({
  price,
  fullPrice,
  timerExpired,
  largeText = false,
}: PriceDisplayProps) {
  const [showDiscount, setShowDiscount] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (timerExpired && showDiscount) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setShowDiscount(false);
        setAnimating(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [timerExpired, showDiscount]);

  const priceClass = largeText
    ? "text-4xl font-bold"
    : "text-2xl font-bold";

  const strikeClass = largeText
    ? "text-base text-gray-400 line-through"
    : "text-sm text-gray-400 line-through";

  if (!showDiscount) {
    return (
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`text-white ${priceClass} price-slide-up`}>
          {fullPrice.toLocaleString("ru-RU")} ₽
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-baseline gap-2 flex-wrap transition-opacity duration-400 ${animating ? "opacity-0" : "opacity-100"}`}>
      <span className={`text-[#E8A04A] ${priceClass}`}>
        {price.toLocaleString("ru-RU")} ₽
      </span>
      <span className={strikeClass}>
        {fullPrice.toLocaleString("ru-RU")} ₽
      </span>
    </div>
  );
}
