"use client";

import { useState, useCallback } from "react";
import { Tariff } from "@/types/tariff";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
import TariffCard from "./TariffCard";
import TariffCardBest from "./TariffCardBest";
import CountdownTimer from "./CountdownTimer";

interface TariffsSectionProps {
  tariffs: Tariff[];
}

export default function TariffsSection({ tariffs }: TariffsSectionProps) {
  const defaultTariff = tariffs.find((t) => t.is_best) ?? tariffs[0];
  const [selectedId, setSelectedId] = useState<string>(defaultTariff?.id ?? "");
  const [agreed, setAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const handleExpire = useCallback(() => {
    setTimerExpired(true);
  }, []);

  const handleBuy = () => {
    if (!agreed) {
      setCheckboxError(true);
      setTimeout(() => setCheckboxError(false), 2000);
      return;
    }
    const selected = tariffs.find((t) => t.id === selectedId);
    alert(`Покупка тарифа: ${selected?.period}`);
  };

  const bestTariff = tariffs.find((t) => t.is_best);
  const regularTariffs = tariffs
    .filter((t) => !t.is_best)
    .sort((a, b) => b.price - a.price);

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1D5B43] py-2 px-4">
        <div className="max-w-5xl mx-auto flex justify-center">
          <CountdownTimer initialSeconds={120} onExpire={handleExpire} />
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-[#1a2a1a] pt-16">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Section title */}
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">
            Выбери подходящий для себя{" "}
            <span className="text-[#E8A04A]">тариф</span>
          </h1>

          {/* Desktop layout */}
          <div className="hidden md:flex gap-6 items-start">
            {/* Man image */}
            <div className="shrink-0 w-56 lg:w-64">
              <img
                src={`${basePath}/img.png`}
                alt="Fitness man"
                width={256}
                height={400}
                className="object-contain w-full h-auto"
              />
            </div>

            {/* Tariff cards */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Best tariff on top */}
              {bestTariff && (
                <TariffCardBest
                  tariff={bestTariff}
                  isSelected={selectedId === bestTariff.id}
                  timerExpired={timerExpired}
                  onClick={() => setSelectedId(bestTariff.id)}
                />
              )}

              {/* Regular tariffs row */}
              <div className="grid grid-cols-3 gap-3">
                {regularTariffs.map((tariff) => (
                  <TariffCard
                    key={tariff.id}
                    tariff={tariff}
                    isSelected={selectedId === tariff.id}
                    timerExpired={timerExpired}
                    onClick={() => setSelectedId(tariff.id)}
                  />
                ))}
              </div>

              {/* Hint */}
              <div className="flex items-start gap-2 bg-[#1e2a1e] border border-[#2a3a2a] rounded-xl p-3">
                <span className="text-[#E8A04A] mt-0.5 shrink-0">!</span>
                <p className="text-gray-300 text-sm">
                  Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
                </p>
              </div>

              {/* Checkbox */}
              <label
                className={`flex items-start gap-3 cursor-pointer group`}
              >
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (e.target.checked) setCheckboxError(false);
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
                      ${agreed
                        ? "bg-[#1D5B43] border-[#1D5B43]"
                        : checkboxError
                          ? "border-red-500 animate-pulse bg-red-500/10"
                          : "border-gray-500 group-hover:border-gray-400"
                      }
                    `}
                  >
                    {agreed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`text-sm transition-colors ${checkboxError ? "text-red-400" : "text-gray-400"}`}>
                  Я согласен с{" "}
                  <a href="#" className="text-gray-300 underline hover:text-white">офертой рекуррентных платежей</a>
                  {" "}и{" "}
                  <a href="#" className="text-gray-300 underline hover:text-white">Политикой конфиденциальности</a>
                </span>
              </label>

              {/* Buy button */}
              <button
                onClick={handleBuy}
                className="w-full bg-[#E8A04A] hover:bg-[#d4903f] text-black font-bold text-lg py-4 rounded-xl animate-blink-button transition-colors"
              >
                Купить
              </button>

              {/* Fine print */}
              <p className="text-gray-500 text-xs leading-relaxed">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
              </p>

              {/* Guarantee */}
              <div className="border border-[#1D5B43] rounded-xl p-4">
                <p className="text-[#4CAF73] text-sm font-semibold mb-2 inline-block border border-[#1D5B43] rounded-full px-3 py-1 bg-[#1D5B43]/20">
                  гарантия возврата 30 дней
                </p>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                  Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col gap-4 md:hidden">
            {/* Man image - compact */}
            <div className="flex justify-center">
              <img
                src={`${basePath}/img.png`}
                alt="Fitness man"
                width={200}
                height={280}
                className="object-contain"
              />
            </div>

            {/* Best tariff */}
            {bestTariff && (
              <TariffCardBest
                tariff={bestTariff}
                isSelected={selectedId === bestTariff.id}
                timerExpired={timerExpired}
                onClick={() => setSelectedId(bestTariff.id)}
              />
            )}

            {/* Regular tariffs stacked */}
            {regularTariffs.map((tariff) => (
              <TariffCard
                key={tariff.id}
                tariff={tariff}
                isSelected={selectedId === tariff.id}
                timerExpired={timerExpired}
                onClick={() => setSelectedId(tariff.id)}
              />
            ))}

            {/* Hint */}
            <div className="flex items-start gap-2 bg-[#1e2a1e] border border-[#2a3a2a] rounded-xl p-3">
              <span className="text-[#E8A04A] mt-0.5 shrink-0">!</span>
              <p className="text-gray-300 text-sm">
                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
              </p>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (e.target.checked) setCheckboxError(false);
                  }}
                  className="sr-only"
                />
                <div
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
                    ${agreed
                      ? "bg-[#1D5B43] border-[#1D5B43]"
                      : checkboxError
                        ? "border-red-500 animate-pulse bg-red-500/10"
                        : "border-gray-500 group-hover:border-gray-400"
                    }
                  `}
                >
                  {agreed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className={`text-sm transition-colors ${checkboxError ? "text-red-400" : "text-gray-400"}`}>
                Я согласен с{" "}
                <a href="#" className="text-gray-300 underline">офертой рекуррентных платежей</a>
                {" "}и{" "}
                <a href="#" className="text-gray-300 underline">Политикой конфиденциальности</a>
              </span>
            </label>

            {/* Buy button */}
            <button
              onClick={handleBuy}
              className="w-full bg-[#E8A04A] hover:bg-[#d4903f] text-black font-bold text-lg py-4 rounded-xl animate-blink-button"
            >
              Купить
            </button>

            {/* Fine print */}
            <p className="text-gray-500 text-xs leading-relaxed">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>

            {/* Guarantee */}
            <div className="border border-[#1D5B43] rounded-xl p-4 mb-8">
              <p className="text-[#4CAF73] text-sm font-semibold inline-block border border-[#1D5B43] rounded-full px-3 py-1 bg-[#1D5B43]/20">
                гарантия возврата 30 дней
              </p>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
