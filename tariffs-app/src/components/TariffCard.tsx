"use client";

import { Tariff } from "@/types/tariff";
import PriceDisplay from "./PriceDisplay";

interface TariffCardProps {
  tariff: Tariff;
  isSelected: boolean;
  timerExpired: boolean;
  onClick: () => void;
}

function calcDiscount(price: number, fullPrice: number): number {
  return Math.round((1 - price / fullPrice) * 100);
}

export default function TariffCard({
  tariff,
  isSelected,
  timerExpired,
  onClick,
}: TariffCardProps) {
  const discount = calcDiscount(tariff.price, tariff.full_price);

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-[40px] border-2 transition-all duration-300
        pt-[40px] sm:pt-[50px] pr-5 pb-6 pl-5 max-[320px]:pt-8 max-[320px]:pr-3 max-[320px]:pb-4 max-[320px]:pl-3
        ${isSelected
          ? "border-[#E8A04A] bg-[#313637] shadow-[0_0_12px_rgba(232,160,74,0.25)]"
          : "border-[#3a3a3a] bg-[#313637] hover:border-[#505a50]"
        }
      `}
    >
      {/* Discount badge */}
      <div className="absolute -top-3 left-4">
        <span className="bg-[#E05C3A] text-white text-xs font-bold px-2 py-0.5 rounded">
          -{discount}%
        </span>
      </div>

      <div className="flex justify-between items-start mt-1 gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm mb-1">{tariff.period}</p>
          <PriceDisplay
            price={tariff.price}
            fullPrice={tariff.full_price}
            timerExpired={timerExpired}
            priceColor="white"
          />
        </div>

        {/* Radio indicator */}
        <div
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 shrink-0
            transition-all duration-300
            ${isSelected ? "border-[#E8A04A]" : "border-gray-600"}
          `}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8A04A]" />
          )}
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-2 leading-snug">{tariff.text}</p>
    </div>
  );
}
