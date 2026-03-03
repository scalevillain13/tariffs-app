"use client";

import { Tariff } from "@/types/tariff";
import PriceDisplay from "./PriceDisplay";

interface TariffCardBestProps {
  tariff: Tariff;
  isSelected: boolean;
  timerExpired: boolean;
  onClick: () => void;
}

function calcDiscount(price: number, fullPrice: number): number {
  return Math.round((1 - price / fullPrice) * 100);
}

export default function TariffCardBest({
  tariff,
  isSelected,
  timerExpired,
  onClick,
}: TariffCardBestProps) {
  const discount = calcDiscount(tariff.price, tariff.full_price);

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300
        ${isSelected
          ? "border-[#E8A04A] bg-[#2c3030] shadow-[0_0_20px_rgba(232,160,74,0.2)]"
          : "border-[#3a3a3a] bg-[#2c3030] hover:border-[#505a50]"
        }
      `}
    >
      {/* Badges row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#E05C3A] text-white text-xs font-bold px-2 py-0.5 rounded">
          -{discount}%
        </span>
        <span className="ml-auto text-[#E8A04A] text-xs font-bold uppercase tracking-wide border border-[#E8A04A] px-2 py-0.5 rounded">
          хит!
        </span>
      </div>

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-white font-bold text-xl mb-2">{tariff.period}</p>
          <PriceDisplay
            price={tariff.price}
            fullPrice={tariff.full_price}
            timerExpired={timerExpired}
            largeText
          />
        </div>

        {/* Radio indicator */}
        <div
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0
            transition-all duration-300
            ${isSelected ? "border-[#E8A04A]" : "border-gray-600"}
          `}
        >
          {isSelected && (
            <div className="w-3 h-3 rounded-full bg-[#E8A04A]" />
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-3 leading-relaxed">{tariff.text}</p>
    </div>
  );
}
