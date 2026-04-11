"use client";

import { motion } from "framer-motion";
import { Check, Globe, Laptop, PiggyBank, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";

type DepositType = "classic" | "online" | "cumulative" | "multiCurrency";
type Currency = "AMD" | "USD";
type IconComponent = ComponentType<{ className?: string }>;

type DepositProduct = {
  id: DepositType;
  icon: IconComponent;
  name: string;
  rateAMD: string | null;
  rateUSD: string | null;
  term: string;
  minAmount: string;
  badge: string | null;
  points: string[];
};

const DEPOSIT_PRODUCTS: DepositProduct[] = [
  {
    id: "classic",
    icon: PiggyBank,
    name: "Классический",
    rateAMD: "до 11%",
    rateUSD: "до 7%",
    term: "3–24 месяца",
    minAmount: "от 100 000 AMD",
    badge: null,
    points: [
      "Пополнение не предусмотрено",
      "Проценты выплачиваются в конце срока",
      "Досрочное закрытие без штрафа — от 3 месяцев",
    ],
  },
  {
    id: "online",
    icon: Laptop,
    name: "Онлайн-вклад",
    rateAMD: "до 12%",
    rateUSD: null,
    term: "6–12 месяцев",
    minAmount: "от 50 000 AMD",
    badge: "Выгодно",
    points: [
      "+1% к ставке за открытие в приложении",
      "Проценты начисляются ежемесячно",
      "Автопролонгация — включается по желанию",
    ],
  },
  {
    id: "cumulative",
    icon: TrendingUp,
    name: "Накопительный",
    rateAMD: "до 9%",
    rateUSD: "до 5%",
    term: "12–36 месяцев",
    minAmount: "от 10 000 AMD",
    badge: null,
    points: [
      "Пополняйте в любое время",
      "Частичное снятие без потери ставки",
      "Подходит для регулярных накоплений",
    ],
  },
  {
    id: "multiCurrency",
    icon: Globe,
    name: "Мультивалютный",
    rateAMD: null,
    rateUSD: "до 7%",
    term: "3–12 месяцев",
    minAmount: "от 500 USD",
    badge: null,
    points: [
      "Доступен в USD и EUR",
      "Конвертация по курсу банка",
      "Проценты начисляются в той же валюте",
    ],
  },
];

const DEPOSIT_RATES: Record<DepositType, Partial<Record<Currency, number>>> = {
  classic: { AMD: 0.11, USD: 0.07 },
  online: { AMD: 0.12 },
  cumulative: { AMD: 0.09, USD: 0.05 },
  multiCurrency: { USD: 0.07 },
};

const AMOUNT_CONFIG: Record<
  DepositType,
  Partial<Record<Currency, { min: number; max: number; step: number }>>
> = {
  classic: {
    AMD: { min: 100_000, max: 10_000_000, step: 50_000 },
    USD: { min: 500, max: 50_000, step: 100 },
  },
  online: {
    AMD: { min: 50_000, max: 5_000_000, step: 50_000 },
  },
  cumulative: {
    AMD: { min: 10_000, max: 10_000_000, step: 10_000 },
    USD: { min: 100, max: 50_000, step: 100 },
  },
  multiCurrency: {
    USD: { min: 500, max: 50_000, step: 100 },
  },
};

const steps = [
  {
    number: "01",
    title: "Выберите вклад",
    text: "В приложении или на сайте — без похода в банк",
  },
  {
    number: "02",
    title: "Укажите сумму и срок",
    text: "Введите параметры — условия рассчитаются сразу",
  },
  {
    number: "03",
    title: "Переведите деньги",
    text: "С карты или счёта InecoBank — мгновенно",
  },
  {
    number: "04",
    title: "Получите договор",
    text: "Электронный документ — сразу на почту",
  },
];

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function calcInterest(amount: number, months: number, annualRate: number): number {
  return Math.round(amount * annualRate * (months / 12));
}

function availableCurrencies(depositType: DepositType): Currency[] {
  return Object.keys(DEPOSIT_RATES[depositType]) as Currency[];
}

function formatMoney(value: number, currency: Currency) {
  return `${Math.round(value).toLocaleString("ru-RU")} ${currency}`;
}

function DepositCard({ product }: { product: DepositProduct }) {
  const Icon = product.icon;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      {product.badge ? (
        <span className="mb-3 inline-block rounded-full bg-brand-green/10 px-2.5 py-0.5 text-xs font-semibold text-brand-green">
          {product.badge}
        </span>
      ) : null}
      <Icon className="h-7 w-7 text-brand-green" />
      <h3 className="mt-3 text-lg font-bold text-gray-950">{product.name}</h3>
      <div className="mt-4 space-y-2 text-sm">
        {product.rateAMD ? <SpecRow label="Ставка AMD" value={product.rateAMD} /> : null}
        {product.rateUSD ? <SpecRow label="Ставка USD" value={product.rateUSD} /> : null}
        <SpecRow label="Срок" value={product.term} />
        <SpecRow label="Минимум" value={product.minAmount} />
      </div>
      <hr className="my-4 border-gray-100" />
      <div className="space-y-2">
        {product.points.map((point) => (
          <div key={point} className="flex items-start gap-2 text-[13px] text-gray-600">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
            <span>{point}</span>
          </div>
        ))}
      </div>
      <a
        href="#calculator"
        className="mt-5 block w-full rounded-lg bg-brand-green py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
      >
        Открыть
      </a>
    </motion.article>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-200 py-2 text-sm last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-semibold text-gray-900">{value}</span>
    </div>
  );
}

export function DepositsPage() {
  const [depositType, setDepositType] = useState<DepositType>("classic");
  const [currency, setCurrency] = useState<Currency>("AMD");
  const [amount, setAmount] = useState(1_500_000);
  const [term, setTerm] = useState(6);

  const amountConfig = AMOUNT_CONFIG[depositType][currency]!;
  const rate = DEPOSIT_RATES[depositType][currency]!;

  const result = useMemo(() => {
    const interest = calcInterest(amount, term, rate);
    const total = Math.round(amount + interest);

    return { interest, total };
  }, [amount, rate, term]);

  const selectDepositType = (nextType: DepositType) => {
    const nextCurrencies = availableCurrencies(nextType);
    const nextCurrency = nextCurrencies.includes(currency)
      ? currency
      : nextCurrencies[0];
    const nextConfig = AMOUNT_CONFIG[nextType][nextCurrency]!;

    setDepositType(nextType);
    setCurrency(nextCurrency);
    setAmount((current) =>
      Math.min(Math.max(current, nextConfig.min), nextConfig.max),
    );
  };

  const selectCurrency = (nextCurrency: Currency) => {
    const nextConfig = AMOUNT_CONFIG[depositType][nextCurrency];

    if (!nextConfig) {
      return;
    }

    setCurrency(nextCurrency);
    setAmount((current) =>
      Math.min(Math.max(current, nextConfig.min), nextConfig.max),
    );
  };

  return (
    <>
      <section className="bg-white pb-16 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-gray-950 sm:text-4xl lg:text-5xl">
              Депозиты InecoBank
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Откройте вклад онлайн — ставка до 12% в AMD
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#products"
                className="rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
              >
                Открыть депозит
              </a>
              <a
                href="#calculator"
                className="rounded-lg border border-brand-green px-6 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                Рассчитать доход
              </a>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 text-sm text-gray-500 sm:flex-row sm:items-center">
              <span>
                до <strong className="font-semibold text-gray-900">12%</strong>{" "}
                годовых
              </span>
              <span className="hidden text-gray-300 sm:inline">|</span>
              <span>
                от{" "}
                <strong className="font-semibold text-gray-900">
                  50 000 AMD
                </strong>
              </span>
              <span className="hidden text-gray-300 sm:inline">|</span>
              <span>
                открытие за{" "}
                <strong className="font-semibold text-gray-900">5 минут</strong>
              </span>
            </div>
          </div>
        </Container>
      </section>

      <motion.section
        id="products"
        className="bg-[#F5F5F5] py-16"
        {...sectionMotion}
      >
        <Container>
          <h2 className="text-center text-3xl font-bold text-gray-950">
            Выберите вклад
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEPOSIT_PRODUCTS.map((product) => (
              <DepositCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        id="calculator"
        className="bg-white py-16"
        {...sectionMotion}
      >
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-950">
              Рассчитайте доход
            </h2>
            <p className="mt-3 text-gray-500">
              Укажите сумму и срок — покажем, сколько вы заработаете
            </p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2">
                {DEPOSIT_PRODUCTS.map((product) => {
                  const isActive = product.id === depositType;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => selectDepositType(product.id)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-green text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:border-brand-green"
                      }`}
                    >
                      {product.name}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(["AMD", "USD"] as Currency[]).map((item) => {
                  const isActive = item === currency;
                  const isAvailable = Boolean(DEPOSIT_RATES[depositType][item]);

                  return (
                    <button
                      key={item}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => selectCurrency(item)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-green text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:border-brand-green"
                      } ${isAvailable ? "" : "cursor-not-allowed opacity-40"}`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="flex justify-between gap-4">
                  <label
                    htmlFor="deposit-amount"
                    className="font-semibold text-gray-900"
                  >
                    Сумма
                  </label>
                  <span className="font-bold text-brand-green">
                    {formatMoney(amount, currency)}
                  </span>
                </div>
                <input
                  id="deposit-amount"
                  type="range"
                  min={amountConfig.min}
                  max={amountConfig.max}
                  step={amountConfig.step}
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#0A7C3E]"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>{formatMoney(amountConfig.min, currency)}</span>
                  <span>{formatMoney(amountConfig.max, currency)}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between gap-4">
                  <label
                    htmlFor="deposit-term"
                    className="font-semibold text-gray-900"
                  >
                    Срок
                  </label>
                  <span className="font-bold text-brand-green">{term} мес.</span>
                </div>
                <input
                  id="deposit-term"
                  type="range"
                  min={3}
                  max={36}
                  step={3}
                  value={term}
                  onChange={(event) => setTerm(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#0A7C3E]"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>3 мес.</span>
                  <span>36 мес.</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F5F5F5] p-8">
              <p className="text-sm font-semibold text-gray-500">Доход за срок</p>
              <div className="mt-3 text-4xl font-extrabold text-brand-green">
                {formatMoney(result.interest, currency)}
              </div>
              <div className="mt-8">
                <ResultRow label="Сумма вклада" value={formatMoney(amount, currency)} />
                <ResultRow label="Срок" value={`${term} мес.`} />
                <ResultRow
                  label="Ставка"
                  value={`${Math.round(rate * 100)}% годовых`}
                />
                <ResultRow
                  label="Сумма в конце срока"
                  value={formatMoney(result.total, currency)}
                />
              </div>
              <a
                href="#"
                className="mt-6 block w-full rounded-lg bg-brand-green py-3 text-center font-semibold text-white transition-colors hover:bg-brand-green-light"
              >
                Открыть депозит
              </a>
              <p className="mt-4 text-sm leading-6 text-gray-500">
                Расчёт носит информационный характер. Точные условия — после
                консультации с менеджером.
              </p>
            </div>
          </div>
        </Container>
      </motion.section>

      <motion.section className="bg-[#F5F5F5] py-16" {...sectionMotion}>
        <Container>
          <h2 className="text-center text-3xl font-bold text-gray-950">
            Как открыть вклад
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 ? (
                  <div className="absolute right-0 top-8 hidden translate-x-1/2 text-2xl text-gray-300 lg:block">
                    →
                  </div>
                ) : null}
                <div className="text-4xl font-extrabold text-brand-green/20">
                  {step.number}
                </div>
                <h3 className="mt-2 font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-500">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        className="bg-[#0A7C3E] py-12 text-center text-white"
        {...sectionMotion}
      >
        <Container>
          <h2 className="text-3xl font-bold">
            Не знаете, какой вклад выбрать?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Позвоните — расскажем про ставки и условия за 5 минут
          </p>
          <a
            href="tel:+37410510510"
            className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-white/90"
          >
            Позвонить в банк
          </a>
        </Container>
      </motion.section>
    </>
  );
}
