"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Check, FileText, Home, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { useToast } from "@/components/Toast";

type ProgramType = "standard" | "subsidized" | "refinance";
type IconComponent = ComponentType<{ className?: string }>;

type MortgageProduct = {
  id: ProgramType;
  icon: IconComponent;
  name: string;
  rate: string;
  amount: string;
  term: string;
  downPayment: string | null;
  badge: string | null;
  points: string[];
};

const MORTGAGE_PRODUCTS: MortgageProduct[] = [
  {
    id: "standard",
    icon: Home,
    name: "Стандартная",
    rate: "от 10%",
    amount: "до 150 000 000 AMD",
    term: "до 30 лет",
    downPayment: "от 30%",
    badge: null,
    points: [
      "Новостройки и вторичный рынок",
      "Фиксированная ставка на весь срок",
      "Досрочное погашение без штрафов",
    ],
  },
  {
    id: "subsidized",
    icon: BadgeCheck,
    name: "Льготная",
    rate: "от 7%",
    amount: "до 55 000 000 AMD",
    term: "до 20 лет",
    downPayment: "от 10%",
    badge: "Господдержка",
    points: [
      "Для семей с детьми до 18 лет",
      "Пониженная ставка субсидируется государством",
      "Только первичный рынок Армении",
    ],
  },
  {
    id: "refinance",
    icon: RefreshCw,
    name: "Рефинансирование",
    rate: "от 10.5%",
    amount: "до остатка долга",
    term: "до 30 лет",
    downPayment: null,
    badge: null,
    points: [
      "Переведите ипотеку из другого банка",
      "Снижение ставки без смены жилья",
      "Оценка и переоформление — за счёт банка",
    ],
  },
];

const MORTGAGE_CONFIG: Record<
  ProgramType,
  { rate: number; minDown: number; maxAmount: number }
> = {
  standard: { rate: 0.1, minDown: 0.3, maxAmount: 150_000_000 },
  subsidized: { rate: 0.07, minDown: 0.1, maxAmount: 55_000_000 },
  refinance: { rate: 0.105, minDown: 0, maxAmount: 100_000_000 },
};

const borrowerDocs = [
  "Паспорт гражданина РА или ВНЖ",
  "Справка о доходах за последние 6 месяцев",
  "ИНН",
  "Выписка из банковского счёта (опционально)",
];

const propertyDocs = [
  "Свидетельство о праве собственности",
  "Кадастровый план",
  "Отчёт об оценке (организует банк)",
  "Договор купли-продажи или предварительный договор",
];

const steps = [
  {
    number: "01",
    title: "Заполните заявку",
    text: "Онлайн за 10 минут",
  },
  {
    number: "02",
    title: "Получите решение",
    text: "Рассматриваем за 1 рабочий день",
  },
  {
    number: "03",
    title: "Выберите недвижимость",
    text: "Любой объект в Армении",
  },
  {
    number: "04",
    title: "Оценка и одобрение",
    text: "Банк организует оценку за свой счёт",
  },
  {
    number: "05",
    title: "Получите деньги",
    text: "Переводим продавцу в день сделки",
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

function ProductCard({ product }: { product: MortgageProduct }) {
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
        {product.downPayment ? (
          <SpecRow label="Первый взнос" value={product.downPayment} />
        ) : null}
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
        Подать заявку
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

function DocumentColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-gray-900">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MortgagePage() {
  const [programType, setProgramType] = useState<ProgramType>("standard");
  const [propertyValue, setPropertyValue] = useState(50_000_000);
  const [downPercent, setDownPercent] = useState(30);
  const [termYears, setTermYears] = useState(15);
  const { showToast } = useToast();

  const config = MORTGAGE_CONFIG[programType];
  const isRefinance = programType === "refinance";

  const result = useMemo(() => {
    const downAmount = isRefinance
      ? 0
      : Math.round(propertyValue * (downPercent / 100));
    const rawLoanAmount = isRefinance ? propertyValue : propertyValue - downAmount;
    const loanAmount = Math.min(rawLoanAmount, config.maxAmount);
    const months = termYears * 12;
    const monthly = Math.round(calcMonthly(loanAmount, months, config.rate));
    const total = Math.round(monthly * months);
    const overpayment = Math.round(total - loanAmount);

    return { downAmount, loanAmount, monthly, total, overpayment };
  }, [config.maxAmount, config.rate, downPercent, isRefinance, propertyValue, termYears]);

  const selectProgram = (nextType: ProgramType) => {
    const nextConfig = MORTGAGE_CONFIG[nextType];
    setProgramType(nextType);
    setDownPercent((current) =>
      Math.max(current, Math.round(nextConfig.minDown * 100)),
    );
  };

  return (
    <>
      <section className="bg-white pb-16 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-gray-950 sm:text-4xl lg:text-5xl">
              Ипотека InecoBank
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Купите квартиру или дом — ставка от 10% в AMD
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#calculator"
                className="rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
              >
                Рассчитать платёж
              </a>
              <a
                href="#products"
                className="rounded-lg border border-brand-green px-6 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                Программы
              </a>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 text-sm text-gray-500 sm:flex-row sm:items-center">
              <span>
                от <strong className="font-semibold text-gray-900">10%</strong>{" "}
                годовых
              </span>
              <span className="hidden text-gray-300 sm:inline">|</span>
              <span>
                до{" "}
                <strong className="font-semibold text-gray-900">
                  150 000 000 AMD
                </strong>
              </span>
              <span className="hidden text-gray-300 sm:inline">|</span>
              <span>
                срок до{" "}
                <strong className="font-semibold text-gray-900">30 лет</strong>
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
            Ипотечные программы
          </h2>
          <div className="mt-10 overflow-x-auto pb-2 sm:overflow-visible">
            <div className="grid auto-cols-[min(280px,calc(100vw-3rem))] grid-flow-col gap-6 sm:auto-cols-auto sm:grid-cols-2 sm:grid-flow-row md:grid-cols-3">
            {MORTGAGE_PRODUCTS.map((product) => (
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
              Стоимость недвижимости, первый взнос, срок — покажем ежемесячный
              платёж
            </p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2">
                {MORTGAGE_PRODUCTS.map((product) => {
                  const isActive = product.id === programType;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => selectProgram(product.id)}
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

              <div className="mt-6">
                <div className="flex justify-between gap-4">
                  <label
                    htmlFor="property-value"
                    className="font-semibold text-gray-900"
                  >
                    Стоимость недвижимости
                  </label>
                  <span className="font-bold text-brand-green">
                    {formatAmd(propertyValue)}
                  </span>
                </div>
                <input
                  id="property-value"
                  type="range"
                  min={5_000_000}
                  max={200_000_000}
                  step={1_000_000}
                  value={propertyValue}
                  aria-valuetext={formatAmd(propertyValue)}
                  onChange={(event) => setPropertyValue(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-green"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>5 000 000 AMD</span>
                  <span>200 000 000 AMD</span>
                </div>
              </div>

              {!isRefinance ? (
                <div className="mt-6">
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="down-payment"
                      className="font-semibold text-gray-900"
                    >
                      Первоначальный взнос
                    </label>
                    <span className="font-bold text-brand-green">
                      {downPercent}%
                    </span>
                  </div>
                  <input
                    id="down-payment"
                    type="range"
                    min={Math.round(config.minDown * 100)}
                    max={80}
                    step={5}
                    value={downPercent}
                    aria-valuetext={`${downPercent}% (${formatAmd(result.downAmount)})`}
                    onChange={(event) => setDownPercent(Number(event.target.value))}
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-green"
                  />
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>{Math.round(config.minDown * 100)}%</span>
                    <span>80%</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    = {formatAmd(result.downAmount)}
                  </p>
                </div>
              ) : null}

              <div className="mt-6">
                <div className="flex justify-between gap-4">
                  <label htmlFor="mortgage-term" className="font-semibold text-gray-900">
                    Срок
                  </label>
                  <span className="font-bold text-brand-green">
                    {termYears} лет
                  </span>
                </div>
                <input
                  id="mortgage-term"
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={termYears}
                  aria-valuetext={`${termYears} лет`}
                  onChange={(event) => setTermYears(Number(event.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-green"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>1 год</span>
                  <span>30 лет</span>
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
                <ResultRow label="Сумма кредита" value={formatAmd(result.loanAmount)} />
                {!isRefinance ? (
                  <ResultRow
                    label="Первый взнос"
                    value={formatAmd(result.downAmount)}
                  />
                ) : null}
                <ResultRow label="Срок" value={`${termYears} лет`} />
                <ResultRow
                  label="Ставка"
                  value={`${config.rate * 100}% годовых`}
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
                    "Заявка на ипотеку принята. Менеджер свяжется с вами в течение дня.",
                  )
                }
                className="mt-6 block w-full rounded-lg bg-brand-green py-3 text-center font-semibold text-white transition-colors hover:bg-brand-green-light"
              >
                Подать заявку
              </button>
              <p className="mt-4 text-sm leading-6 text-gray-500">
                Расчёт носит информационный характер. Точные условия зависят от
                оценки недвижимости и решения банка.
              </p>
            </div>
          </div>
        </Container>
      </motion.section>

      <motion.section className="bg-surface py-16" {...sectionMotion}>
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-950">Что потребуется</h2>
            <p className="mt-3 text-gray-500">
              Стандартный пакет — без лишних справок
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <DocumentColumn title="Документы заёмщика" items={borrowerDocs} />
            <DocumentColumn title="Документы на недвижимость" items={propertyDocs} />
          </div>
        </Container>
      </motion.section>

      <motion.section className="bg-white py-16" {...sectionMotion}>
        <Container>
          <h2 className="text-center text-3xl font-bold text-gray-950">
            Как получить ипотеку
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
          <h2 className="text-3xl font-bold">Остались вопросы по ипотеке?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Ипотечный специалист объяснит условия и поможет с документами
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
