"use client";

import { motion } from "framer-motion";
import { Car, Check, RefreshCw, Wallet, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { useToast } from "@/components/Toast";

type LoanType = "consumer" | "express" | "auto" | "refinance";
type IconComponent = ComponentType<{ className?: string }>;

type LoanProduct = {
  id: LoanType;
  icon: IconComponent;
  name: string;
  shortName: string;
  rate: string;
  amount: string;
  term: string;
  badge: string | null;
  points: string[];
};

const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "consumer",
    icon: Wallet,
    name: "Потребительский",
    shortName: "Потребительский",
    rate: "от 17%",
    amount: "до 10 000 000 AMD",
    term: "до 60 месяцев",
    badge: null,
    points: [
      "Без залога и поручителей",
      "Онлайн-заявка за 5 минут",
      "Деньги на карту в день одобрения",
    ],
  },
  {
    id: "express",
    icon: Zap,
    name: "Кредит 1CLICK",
    shortName: "1CLICK",
    rate: "от 19%",
    amount: "до 2 000 000 AMD",
    term: "до 24 месяцев",
    badge: "Быстро",
    points: [
      "Решение за 60 секунд",
      "Только через мобильное приложение",
      "Без документов — только паспорт",
    ],
  },
  {
    id: "auto",
    icon: Car,
    name: "Автокредит",
    shortName: "Автокредит",
    rate: "от 14%",
    amount: "до 25 000 000 AMD",
    term: "до 84 месяцев",
    badge: null,
    points: [
      "Новые и подержанные авто",
      "Первоначальный взнос от 20%",
      "Страховка авто включена в платёж",
    ],
  },
  {
    id: "refinance",
    icon: RefreshCw,
    name: "Рефинансирование",
    shortName: "Рефинансирование",
    rate: "от 15%",
    amount: "до 15 000 000 AMD",
    term: "до 72 месяцев",
    badge: "Выгодно",
    points: [
      "Объединение до 5 кредитов в один",
      "Снижение ежемесячного платежа",
      "Перевод кредита из другого банка",
    ],
  },
];

const LOAN_CONFIG: Record<
  LoanType,
  { minAmount: number; maxAmount: number; defaultRate: number }
> = {
  consumer: { minAmount: 100_000, maxAmount: 10_000_000, defaultRate: 0.17 },
  express: { minAmount: 50_000, maxAmount: 2_000_000, defaultRate: 0.19 },
  auto: { minAmount: 500_000, maxAmount: 25_000_000, defaultRate: 0.14 },
  refinance: { minAmount: 200_000, maxAmount: 15_000_000, defaultRate: 0.15 },
};

const steps = [
  {
    number: "01",
    title: "Заполните заявку",
    text: "Онлайн за 5 минут — без визита в банк",
  },
  {
    number: "02",
    title: "Получите решение",
    text: "Проверяем заявку и звоним вам в течение часа",
  },
  {
    number: "03",
    title: "Подпишите договор",
    text: "В отделении или через мобильное приложение",
  },
  {
    number: "04",
    title: "Получите деньги",
    text: "На карту InecoBank в день подписания",
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

function calcMonthly(amount: number, months: number, annualRate: number): number {
  const r = annualRate / 12;
  if (r === 0) return amount / months;
  return (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function formatAmd(value: number) {
  return `${Math.round(value).toLocaleString("ru-RU")} AMD`;
}

function ProductCard({ product }: { product: LoanProduct }) {
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
        <SpecRow label="Ставка" value={product.rate} />
        <SpecRow label="Сумма" value={product.amount} />
        <SpecRow label="Срок" value={product.term} />
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
        Оформить
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

export function LoansPage() {
  const [loanType, setLoanType] = useState<LoanType>("consumer");
  const [amount, setAmount] = useState(5_000_000);
  const [term, setTerm] = useState(36);
  const { showToast } = useToast();

  const config = LOAN_CONFIG[loanType];
  const activeProduct = LOAN_PRODUCTS.find((product) => product.id === loanType)!;

  const result = useMemo(() => {
    const monthly = Math.round(calcMonthly(amount, term, config.defaultRate));
    const total = Math.round(monthly * term);
    const overpayment = Math.round(total - amount);

    return { monthly, total, overpayment };
  }, [amount, config.defaultRate, term]);

  return (
    <>
      <section className="bg-white pb-16 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-gray-950 sm:text-4xl lg:text-5xl">
              Кредит на любые цели
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Решение за 1 минуту — без похода в отделение
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#calculator"
                className="rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
              >
                Рассчитать кредит
              </a>
              <a
                href="#products"
                className="rounded-lg border border-brand-green px-6 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                Все продукты
              </a>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 text-sm text-gray-500 sm:flex-row sm:items-center">
              <span>
                <strong className="font-semibold text-gray-900">от 17%</strong>{" "}
                годовых
              </span>
              <span className="hidden text-gray-300 sm:inline">|</span>
              <span>
                до{" "}
                <strong className="font-semibold text-gray-900">
                  10 000 000 AMD
                </strong>
              </span>
              <span className="hidden text-gray-300 sm:inline">|</span>
              <span>
                решение за{" "}
                <strong className="font-semibold text-gray-900">1 минуту</strong>
              </span>
            </div>
          </div>
        </Container>
      </section>

      <motion.section
        id="products"
        className="bg-surface py-16"
        {...sectionMotion}
      >
        <Container>
          <h2 className="text-center text-3xl font-bold text-gray-950">
            Выберите подходящий кредит
          </h2>
          <div className="mt-10 overflow-x-auto pb-2 sm:overflow-visible">
            <div className="grid auto-cols-[min(280px,calc(100vw-3rem))] grid-flow-col gap-6 sm:auto-cols-auto sm:grid-cols-2 sm:grid-flow-row lg:grid-cols-4">
            {LOAN_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            </div>
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
              Рассчитайте платёж
            </h2>
            <p className="mt-3 text-gray-500">
              Укажите сумму и срок — покажем примерный ежемесячный платёж
            </p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2">
                {LOAN_PRODUCTS.map((product) => {
                  const isActive = product.id === loanType;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        const nextConfig = LOAN_CONFIG[product.id];
                        setLoanType(product.id);
                        setAmount((current) =>
                          Math.min(
                            Math.max(current, nextConfig.minAmount),
                            nextConfig.maxAmount,
                          ),
                        );
                      }}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-green text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:border-brand-green"
                      }`}
                    >
                      {product.shortName}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="flex justify-between gap-4">
                  <label
                    htmlFor="loan-amount"
                    className="font-semibold text-gray-900"
                  >
                    Сумма кредита
                  </label>
                  <span className="font-bold text-brand-green">
                    {formatAmd(amount)}
                  </span>
                </div>
                <input
                  id="loan-amount"
                  type="range"
                  min={config.minAmount}
                  max={config.maxAmount}
                  step={50_000}
                  value={amount}
                  aria-valuetext={formatAmd(amount)}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-green"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>{formatAmd(config.minAmount)}</span>
                  <span>{formatAmd(config.maxAmount)}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between gap-4">
                  <label htmlFor="loan-term" className="font-semibold text-gray-900">
                    Срок
                  </label>
                  <span className="font-bold text-brand-green">{term} мес.</span>
                </div>
                <input
                  id="loan-term"
                  type="range"
                  min={3}
                  max={84}
                  step={3}
                  value={term}
                  aria-valuetext={`${term} месяцев`}
                  onChange={(event) => setTerm(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-green"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>3 мес.</span>
                  <span>84 мес.</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-8">
              <p className="text-sm font-semibold text-gray-500">
                Ежемесячный платёж
              </p>
              <div className="mt-3 text-4xl font-extrabold text-brand-green">
                {formatAmd(result.monthly)}
              </div>
              <div className="mt-8">
                <ResultRow label="Сумма кредита" value={formatAmd(amount)} />
                <ResultRow label="Срок" value={`${term} мес.`} />
                <ResultRow
                  label="Ставка"
                  value={`${Math.round(config.defaultRate * 100)}% годовых`}
                />
                <ResultRow
                  label="Переплата"
                  value={formatAmd(result.overpayment)}
                />
                <ResultRow
                  label="Общая сумма выплат"
                  value={formatAmd(result.total)}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  showToast(
                    "Заявка принята. Менеджер свяжется с вами в течение дня.",
                  )
                }
                className="mt-6 block w-full rounded-lg bg-brand-green py-3 text-center font-semibold text-white transition-colors hover:bg-brand-green-light"
              >
                Оформить кредит
              </button>
              <p className="mt-4 text-sm leading-6 text-gray-500">
                Расчёт носит информационный характер. Точные условия — после
                рассмотрения заявки.
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Сейчас выбран продукт: {activeProduct.name}
              </p>
            </div>
          </div>
        </Container>
      </motion.section>

      <motion.section className="bg-surface py-16" {...sectionMotion}>
        <Container>
          <h2 className="text-center text-3xl font-bold text-gray-950">
            Как получить кредит
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        className="bg-brand-green py-12 text-center text-white"
        {...sectionMotion}
      >
        <Container>
          <h2 className="text-3xl font-bold">Остались вопросы?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Наши специалисты объяснят условия и помогут с заявкой
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
