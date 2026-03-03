"use client";

import { useState, useCallback } from "react";
import { Tariff } from "@/types/tariff";
import TariffCard from "./TariffCard";
import TariffCardBest from "./TariffCardBest";
import CountdownTimer from "./CountdownTimer";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1D5B43] py-2 px-3 max-[320px]:px-2 sm:px-4">
        <div className="max-w-[1920px] mx-auto flex justify-center lg:max-w-[1200px] 3xl:max-w-[1400px]">
          <CountdownTimer initialSeconds={120} onExpire={handleExpire} />
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-[#232829] pt-16">
        <div className="w-full max-w-full mx-auto px-3 py-6 max-[320px]:px-2 max-[320px]:py-4 sm:px-4 md:px-6 md:py-8 lg:max-w-[1200px] 3xl:max-w-[1400px] 3xl:px-8">
          {/* Section title */}
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 max-[320px]:text-lg max-[320px]:mb-4">
            Выбери подходящий для себя{" "}
            <span className="text-[#E8A04A]">тариф</span>
          </h1>

          {/* Desktop layout */}
          <div className="hidden md:flex gap-4 lg:gap-6 items-start 3xl:gap-8">
            {/* Man image */}
            <div className="shrink-0 w-48 md:w-52 lg:w-56 xl:w-64 3xl:w-72">
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
              <div className="grid grid-cols-3 gap-2 lg:gap-3 3xl:gap-4">
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
              <div className="flex items-start gap-3 bg-[#232829] border border-[#2a3a2a] rounded-[2rem] p-3 lg:p-4">
                <span className="text-[#E8A04A] text-lg font-bold mt-0.5 shrink-0">!</span>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-[320px]:text-xs">
                  Следуя плану на 3 месяца и более, люди получают
                  <br />
                  <span className="font-semibold text-white">в 2 раза лучший результат, чем за 1 месяц</span>
                </p>
              </div>

              {/* Checkbox + privacy (по макету) + кнопка сразу под ним */}
              <div className="flex flex-col items-start gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative shrink-0" style={{ width: 32, height: 32 }}>
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
                        w-full h-full flex items-center justify-center rounded-[4px]
                        ${agreed ? "bg-[#424748] border border-[#FDB056]" : "bg-[#606566] border border-transparent"}
                        ${checkboxError ? "animate-pulse" : ""}
                      `}
                    >
                      {agreed && (
                        <div className="w-3.5 h-3.5" style={{ background: "#FDB056" }} />
                      )}
                    </div>
                  </div>
                  <span
                    className="flex items-end"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: "110%",
                      color: checkboxError ? "#f97373" : "#CDCDCD",
                    }}
                  >
                    Я согласен с&nbsp;
                    <a href="#" className="underline">
                      офертой рекуррентных платежей
                    </a>
                    &nbsp;и&nbsp;
                    <a href="#" className="underline">
                      Политикой конфиденциальности
                    </a>
                  </span>
                </label>

                <button
                  onClick={handleBuy}
                  className="w-full max-w-[352px] flex items-center justify-center bg-[#FDB056] hover:bg-[#f5a845] text-black font-bold text-base lg:text-lg py-5 px-[60px] rounded-[20px] animate-blink-button transition-colors"
                >
                  Купить
                </button>
              </div>

              {/* Fine print */}
              <p className="text-gray-500 text-xs leading-relaxed">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
              </p>

              {/* Guarantee */}
              <div className="border border-[#484D4E] rounded-[2rem] p-5">
                <p className="text-[#81FE95] text-sm font-semibold mb-2 inline-block rounded-full px-4 py-1.5 bg-[#81FE95]/10">
                  гарантия возврата 30 дней
                </p>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                  Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col gap-3 md:hidden max-[320px]:gap-2">
            {/* Man image - compact */}
            <div className="flex justify-center max-[320px]:max-h-[180px]">
              <img
                src={`${basePath}/img.png`}
                alt="Fitness man"
                width={200}
                height={280}
                className="object-contain max-[320px]:max-h-[180px] max-[375px]:max-h-[220px]"
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
            <div className="flex items-start gap-3 bg-[#232829] border border-[#2a3a2a] rounded-[2rem] p-3 max-[320px]:p-2">
              <span className="text-[#E8A04A] text-lg font-bold mt-0.5 shrink-0">!</span>
              <p className="text-gray-200 text-sm leading-relaxed max-[320px]:text-xs">
                Следуя плану на 3 месяца и более, люди получают
                <br />
                <span className="font-semibold text-white">в 2 раза лучший результат, чем за 1 месяц</span>
              </p>
            </div>

            {/* Checkbox + privacy + кнопка сразу под ним (mobile) */}
            <div className="flex flex-col items-start gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative shrink-0" style={{ width: 32, height: 32 }}>
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
                      w-full h-full flex items-center justify-center rounded-[4px]
                      ${agreed ? "bg-[#424748] border border-[#FDB056]" : "bg-[#606566] border border-transparent"}
                      ${checkboxError ? "animate-pulse" : ""}
                    `}
                  >
                    {agreed && (
                      <div className="w-3.5 h-3.5" style={{ background: "#FDB056" }} />
                    )}
                  </div>
                </div>
                <span
                  className="flex items-end"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "110%",
                    color: checkboxError ? "#f97373" : "#CDCDCD",
                  }}
                >
                  Я согласен с&nbsp;
                  <a href="#" className="underline">
                    офертой рекуррентных платежей
                  </a>
                  &nbsp;и&nbsp;
                  <a href="#" className="underline">
                    Политикой конфиденциальности
                  </a>
                </span>
              </label>

              <button
                onClick={handleBuy}
                className="w-full max-w-[352px] flex items-center justify-center bg-[#FDB056] hover:bg-[#f5a845] text-black font-bold text-base py-5 px-[60px] max-[320px]:py-4 max-[320px]:px-8 rounded-[20px] animate-blink-button"
              >
                Купить
              </button>
            </div>

            {/* Fine print */}
            <p className="text-gray-500 text-xs leading-relaxed">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>

            {/* Guarantee */}
            <div className="border border-[#484D4E] rounded-[2rem] p-4 mb-6 max-[320px]:p-3 max-[320px]:mb-4">
              <p className="text-[#81FE95] text-sm font-semibold inline-block rounded-full px-4 py-1.5 bg-[#81FE95]/10">
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
