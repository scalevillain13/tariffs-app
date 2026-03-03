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
        relative cursor-pointer flex flex-col items-center text-center
        rounded-[40px] border-2 transition-all duration-300
        pt-[70px] pr-[21px] pb-[26px] pl-[21px] gap-4
        max-[320px]:pt-10 max-[320px]:pr-3 max-[320px]:pb-4 max-[320px]:pl-3
        ${isSelected
          ? "border-[#E8A04A] bg-[#313637] shadow-[0_0_12px_rgba(232,160,74,0.25)]"
          : "border-[#484D4E] bg-[#313637] hover:border-[#606668]"
        }
      `}
      style={{ minHeight: 280 }}
    >
      {/* Discount badge */}
      <div className="absolute top-[-12px] left-1/2 -translate-x-1/2">
        <span className="bg-[#E05C3A] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          -{discount}%
        </span>
      </div>

      {/* Period */}
      <p className="text-white font-semibold text-base leading-snug">{tariff.period}</p>

      {/* Price */}
      <div className="flex flex-col items-center gap-1">
        <PriceDisplay
          price={tariff.price}
          fullPrice={tariff.full_price}
          timerExpired={timerExpired}
          priceColor="white"
        />
      </div>

      {/* Text */}
      <p className="text-gray-400 text-xs leading-snug mt-auto">{tariff.text}</p>

      {/* Radio indicator */}
      <div
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
          transition-all duration-300
          ${isSelected ? "border-[#E8A04A]" : "border-gray-600"}
        `}
      >
        {isSelected && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8A04A]" />
        )}
      </div>
    </div>
  );
}
