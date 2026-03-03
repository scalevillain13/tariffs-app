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
        pt-[70px] pr-[21px] pb-[26px] pl-[21px] gap-10
        max-[320px]:pt-10 max-[320px]:pr-3 max-[320px]:pb-4 max-[320px]:pl-3
        ${isSelected
          ? "border-[#E8A04A] bg-[#313637] shadow-[0_0_12px_rgba(232,160,74,0.25)]"
          : "border-[#484D4E] bg-[#313637] hover:border-[#606668]"
        }
      `}
      style={{ minHeight: 335, maxWidth: 240 }}
    >
      {/* Discount badge */}
      <div className="absolute top-[-12px] left-1/2 -translate-x-1/2">
        <span className="bg-[#E05C3A] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          -{discount}%
        </span>
      </div>

      {/* Content block (по макету) */}
      <div
        className="flex flex-col items-center gap-10"
        style={{ width: 204, height: 242, fontFamily: "var(--font-montserrat)" }}
      >
        {/* Заголовок + цена */}
        <div className="flex flex-col items-center gap-8" style={{ width: 168, height: 140 }}>
          {/* Заголовок периода */}
          <div className="flex flex-col items-center gap-2" style={{ width: 123, height: 31 }}>
            <p
              className="text-white"
              style={{ fontWeight: 500, fontSize: 26, lineHeight: "120%" }}
            >
              {tariff.period}
            </p>
          </div>

          {/* Цена */}
          <div
            className="flex flex-col items-end"
            style={{ width: 168, height: 79 }}
          >
            {/* Новая цена */}
            <div style={{ width: 168, height: 50 }}>
              <span
                className="text-white"
                style={{ fontWeight: 600, fontSize: 50, lineHeight: "100%" }}
              >
                {tariff.price.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            {/* Старая цена с линией */}
            <div style={{ width: 83, height: 29, position: "relative", marginTop: 4 }}>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 83,
                  height: 29,
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: "120%",
                  color: "#919191",
                }}
              >
                {tariff.full_price.toLocaleString("ru-RU")} ₽
              </span>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 14,
                  width: 83,
                  borderTop: "2px solid #919191",
                }}
              />
            </div>
          </div>
        </div>

        {/* Текст под ценой */}
        <div
          className="flex flex-row justify-center items-start py-[10px]"
          style={{ width: 204, height: 62 }}
        >
          <p
            className="text-white text-center"
            style={{
              width: 204,
              height: 42,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "130%",
            }}
          >
            {tariff.text}
          </p>
        </div>
      </div>
    </div>
  );
}
