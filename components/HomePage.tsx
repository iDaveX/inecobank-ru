"use client";

import {
  ArrowLeftRight,
  Banknote,
  ChevronLeft,
  CheckCircle,
  CreditCard,
  Home as HomeIcon,
  MapPin,
  PiggyBank,
  Receipt,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { useToast } from "@/components/Toast";

type IconComponent = ComponentType<{ className?: string }>;
type QuizStep = "goal" | "term" | "amount" | "result";
type Goal = "save" | "borrow" | "spend" | "send";
type Term = "short" | "medium" | "long";
type Amount = "small" | "medium" | "large";

interface QuizState {
  goal: Goal | null;
  term: Term | null;
  amount: Amount | null;
}

type Recommendation = {
  title: string;
  text: string;
  href: string;
  cta: string;
};

const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

const quickActions = [
  { label: "Переводы", icon: ArrowLeftRight, href: "/transfers" },
  {
    label: "Обмен валют",
    icon: Receipt,
    toast: "Актуальный курс — в разделе «Переводы»",
  },
  { label: "Депозиты", icon: PiggyBank, href: "/deposits" },
  { label: "Кредиты", icon: Banknote, href: "/loans" },
];

const products = [
  {
    title: "Банковские карты",
    text: "Visa, Mastercard и ArCa для покупок в Армении и за рубежом. Кешбэк, бонусы, бесплатное обслуживание.",
    href: "Выбрать карту →",
    url: "/cards",
    icon: CreditCard,
  },
  {
    title: "Кредиты",
    text: "От 17% годовых. Решение за 1 минуту онлайн. Сумма до 10 000 000 AMD без залога.",
    href: "Рассчитать кредит →",
    url: "/loans",
    icon: Banknote,
  },
  {
    title: "Депозиты",
    text: "До 10% годовых в AMD. Ежемесячная выплата процентов. Онлайн-открытие за 5 минут.",
    href: "Открыть депозит →",
    url: "/deposits",
    icon: TrendingUp,
  },
  {
    title: "Ипотека",
    text: "Ставка от 8.5% годовых. До 30 лет. Государственные программы льготного кредитования.",
    href: "Узнать условия →",
    url: "/mortgage",
    icon: HomeIcon,
  },
];

const GOALS = [
  { id: "save", label: "Накопить", icon: PiggyBank },
  { id: "borrow", label: "Получить кредит", icon: Wallet },
  { id: "spend", label: "Платить картой", icon: CreditCard },
  { id: "send", label: "Переводить деньги", icon: ArrowLeftRight },
] as const;

const TERMS = [
  { id: "short", label: "До 6 месяцев" },
  { id: "medium", label: "От 6 до 24 месяцев" },
  { id: "long", label: "Более 2 лет" },
] as const;

const AMOUNTS = [
  { id: "small", label: "До 500 000 AMD" },
  { id: "medium", label: "500 000 — 5 000 000 AMD" },
  { id: "large", label: "Более 5 000 000 AMD" },
] as const;

const exchangeRates = [
  { currency: "USD / Доллар", code: "USD", buy: "395", sell: "400" },
  { currency: "EUR / Евро", code: "EUR", buy: "430", sell: "436" },
  { currency: "RUB / Рубль", code: "RUB", buy: "4.20", sell: "4.50" },
  { currency: "GBP / Фунт", code: "GBP", buy: "495", sell: "502" },
];

const paymentServices = [
  { text: "ВЭБ", color: "#FF6B35" },
  { text: "Газ", color: "#0055A5" },
  { text: "Свет", color: "#00A651" },
  { text: "Водоканал", color: "#8B5CF6" },
  { text: "Beeline", color: "#EF4444" },
  { text: "Ucom", color: "#F97316" },
  { text: "VivaCell", color: "#3B82F6" },
  { text: "Интернет", color: "#6B7280" },
];

const stats = [
  { icon: Shield, value: "30+ лет", label: "На рынке Армении" },
  { icon: Users, value: "500 000+", label: "Довольных клиентов" },
  { icon: MapPin, value: "80+", label: "Отделений и банкоматов" },
  { icon: Smartphone, value: "24/7", label: "Онлайн-сервис" },
];

const news = [
  {
    tag: "Продукты",
    title: "InecoBank запустил мгновенный онлайн-кредит 1CLICK",
    date: "8 апреля 2026",
    text: "Теперь получить потребительский кредит можно за одну минуту прямо в мобильном приложении без визита в отделение.",
  },
  {
    tag: "Партнёрство",
    title: "Новая программа льготной ипотеки совместно с правительством Армении",
    date: "2 апреля 2026",
    text: "Ставка по программе составит от 6% для молодых семей при покупке первого жилья.",
  },
  {
    tag: "Технологии",
    title: "Обновление мобильного приложения InecoBanking",
    date: "28 марта 2026",
    text: "Новая версия приложения получила redesign интерфейса и поддержку Face ID для входа.",
  },
];

function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section className={className} {...sectionAnimation}>
      {children}
    </motion.section>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function IconCard({
  label,
  icon: Icon,
  href,
  toast,
}: {
  label: string;
  icon: IconComponent;
  href?: string;
  toast?: string;
}) {
  const { showToast } = useToast();

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ y: -4 }}
        className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg bg-white p-4 text-center shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
      >
        <Icon className="h-7 w-7 text-brand-green" />
        <span className="text-sm font-semibold text-gray-800">{label}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (toast) {
          showToast(toast, "info");
        }
      }}
      whileHover={{ y: -4 }}
      className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg bg-white p-4 text-center shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
    >
      <Icon className="h-7 w-7 text-brand-green" />
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </motion.button>
  );
}

function getRecommendation(state: QuizState): Recommendation {
  if (state.goal === "save") {
    return state.term === "long"
      ? {
          title: "Срочный депозит",
          text: "Высокая ставка до 9% годовых на ваши накопления.",
          href: "/deposits",
          cta: "Открыть депозит",
        }
      : {
          title: "Текущий счёт",
          text: "Гибкий доступ к деньгам без ограничений.",
          href: "#",
          cta: "Открыть счёт",
        };
  }

  if (state.goal === "borrow") {
    return state.amount === "large"
      ? {
          title: "Ипотека",
          text: "Ставка от 9% на покупку недвижимости.",
          href: "/mortgage",
          cta: "Рассчитать ипотеку",
        }
      : {
          title: "Потребительский кредит",
          text: "До 10 000 000 AMD без залога.",
          href: "/loans",
          cta: "Рассчитать кредит",
        };
  }

  if (state.goal === "spend") {
    return {
      title: "Карта INECOBANK",
      text: "Cashback, бесконтактная оплата и онлайн-покупки.",
      href: "/cards",
      cta: "Выбрать карту",
    };
  }

  return {
    title: "Переводы",
    text: "Внутри Армении и за рубеж с низкой комиссией.",
    href: "/transfers",
    cta: "Узнать о переводах",
  };
}

function ProductQuiz() {
  const [step, setStep] = useState<QuizStep>("goal");
  const [quiz, setQuiz] = useState<QuizState>({
    goal: null,
    term: null,
    amount: null,
  });
  const { showToast } = useToast();

  const stepIndex =
    step === "result" ? 2 : { goal: 0, term: 1, amount: 2 }[step];
  const rec = getRecommendation(quiz);

  const resetQuiz = () => {
    setQuiz({ goal: null, term: null, amount: null });
    setStep("goal");
  };

  const goBack = () => {
    if (step === "term") {
      setQuiz((current) => ({ ...current, term: null }));
      setStep("goal");
    } else if (step === "amount") {
      setQuiz((current) => ({ ...current, amount: null }));
      setStep("term");
    }
  };

  return (
    <Section className="bg-[#F5F5F5] py-16">
      <Container>
        <motion.div {...sectionAnimation} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-widest text-brand-green uppercase">
            Подбор продукта
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Какой продукт вам подходит?
          </h2>
          <p className="mt-3 text-gray-500">
            Ответьте на 3 вопроса — мы подберём лучший вариант
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-xl">
          {step !== "result" ? (
            <div className="mb-8 flex items-center gap-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    index <= stepIndex ? "bg-brand-green" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          ) : null}

          {step === "term" || step === "amount" ? (
            <button
              type="button"
              onClick={goBack}
              className="mb-4 flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Назад
            </button>
          ) : null}

          {step === "goal" ? (
            <div>
              <p className="mb-4 font-semibold text-gray-900">
                Какова ваша цель?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((goal) => {
                  const Icon = goal.icon;

                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => {
                        setQuiz((current) => ({ ...current, goal: goal.id }));
                        setStep("term");
                      }}
                      className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand-green hover:text-brand-green hover:shadow-md"
                    >
                      <Icon className="h-6 w-6" />
                      {goal.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === "term" ? (
            <div>
              <p className="mb-4 font-semibold text-gray-900">
                На какой срок?
              </p>
              <div className="flex flex-col gap-3">
                {TERMS.map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => {
                      setQuiz((current) => ({ ...current, term: term.id }));
                      setStep("amount");
                    }}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand-green hover:text-brand-green"
                  >
                    {term.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === "amount" ? (
            <div>
              <p className="mb-4 font-semibold text-gray-900">
                Какая сумма?
              </p>
              <div className="flex flex-col gap-3">
                {AMOUNTS.map((amount) => (
                  <button
                    key={amount.id}
                    type="button"
                    onClick={() => {
                      setQuiz((current) => ({ ...current, amount: amount.id }));
                      setStep("result");
                    }}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand-green hover:text-brand-green"
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === "result" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-brand-green/30 bg-white p-8 text-center shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                <CheckCircle className="h-7 w-7 text-brand-green" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {rec.title}
              </h3>
              <p className="mt-3 text-gray-500">{rec.text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {rec.href === "#" ? (
                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        "Заявка на открытие счёта принята. Менеджер свяжется с вами.",
                      )
                    }
                    className="rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                  >
                    {rec.cta}
                  </button>
                ) : (
                  <a
                    href={rec.href}
                    className="rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                  >
                    {rec.cta}
                  </a>
                )}
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  Пройти снова
                </button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

function BankCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mx-auto aspect-[1.58] w-full max-w-[28rem] rotate-[-6deg] rounded-lg bg-brand-green p-6 text-white shadow-2xl sm:p-8"
    >
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.26),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent_48%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold tracking-[0.18em] sm:text-base">
            INECOBANK VISA
          </span>
          <div className="h-8 w-11 rounded-md bg-white/25 ring-1 ring-white/30" />
        </div>
        <div className="text-xl font-semibold tracking-[0.18em] sm:text-2xl">
          •••• •••• •••• 4242
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase text-white/70">Держатель</p>
            <p className="text-sm font-semibold tracking-wide sm:text-base">
              ИВАН ИВАНОВ
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase text-white/70">До</p>
            <p className="text-sm font-semibold sm:text-base">12/28</p>
          </div>
          <svg
            className="h-8 w-14"
            viewBox="0 0 72 28"
            role="img"
            aria-label="Visa"
          >
            <text
              x="0"
              y="22"
              fill="white"
              fontSize="24"
              fontWeight="800"
              fontFamily="Arial, sans-serif"
              letterSpacing="-2"
            >
              VISA
            </text>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const { showToast } = useToast();

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-white pt-20">
        <div className="absolute right-0 top-0 h-[32rem] w-[32rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,#0A7C3E1A,transparent_70%)]" />
        <Container>
          <div className="relative grid min-h-[calc(100vh-80px)] items-center gap-12 py-10 lg:grid-cols-2 lg:py-16">
            <motion.div {...sectionAnimation}>
              <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Ваш банк всегда рядом
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-[#666]">
                Удобный банкинг для жизни
                <br />в Армении и за её пределами
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Заявка на открытие счёта принята. Менеджер свяжется с вами.",
                    )
                  }
                  className="rounded-lg bg-brand-green px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                >
                  Открыть счёт бесплатно
                </button>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Перейдите в раздел «Продукты» в меню навигации",
                      "info",
                    )
                  }
                  className="rounded-lg border border-brand-green px-6 py-3 text-center text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                >
                  Узнать о продуктах
                </button>
              </div>
              <div className="mt-10">
                <p className="text-sm font-semibold text-gray-500">
                  ── Нам доверяют ──
                </p>
                <div className="mt-4 grid gap-3 text-sm font-medium text-gray-700 sm:grid-cols-3">
                  <span>Банк года 2023</span>
                  <span>500 000+ клиентов</span>
                  <span>80+ отделений</span>
                </div>
              </div>
            </motion.div>
            <div className="pb-8 lg:pb-0">
              <BankCard />
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#F5F5F5] py-10 lg:py-16">
        <Container>
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
            Что вы хотите сделать?
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 min-[520px]:grid-cols-3 lg:grid-cols-5">
            {quickActions.map((action) => (
              <IconCard key={action.label} {...action} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white py-10 lg:py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-950 lg:text-4xl">
              Наши продукты
            </h2>
            <p className="mt-3 text-gray-500">
              Всё необходимое для управления финансами
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {products.map(({ icon: Icon, ...product }) => (
              <motion.article
                key={product.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
              >
                <Icon className="h-8 w-8 text-brand-green" />
                <h3 className="mt-5 text-xl font-bold text-gray-950">
                  {product.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">{product.text}</p>
                <a
                  href={product.url}
                  className="mt-5 inline-flex text-sm font-semibold text-brand-green hover:text-brand-green-light"
                >
                  {product.href}
                </a>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      <ProductQuiz />

      <Section className="bg-white py-10 lg:py-16">
        <Container>
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-gray-950">Курсы валют</h2>
              <p className="text-sm text-gray-500">Обновлено: сегодня, 15:00</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left">
                <thead className="bg-gray-50 text-sm text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Валюта</th>
                    <th className="px-5 py-4 font-semibold">Код</th>
                    <th className="px-5 py-4 font-semibold">Покупка</th>
                    <th className="px-5 py-4 font-semibold">Продажа</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {exchangeRates.map((rate) => (
                    <tr key={rate.currency}>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {rate.currency}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block w-8 rounded bg-gray-100 px-1 py-0.5 text-center text-xs font-bold text-gray-500">
                          {rate.code}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-700">{rate.buy}</td>
                      <td className="px-5 py-4 text-gray-700">{rate.sell}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 px-5 py-4">
              <button
                type="button"
                onClick={() =>
                  showToast(
                    "Доступно в мобильном приложении INECOBANK",
                    "info",
                  )
                }
                className="inline-flex rounded-lg border border-brand-green px-5 py-2.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                Полная таблица курсов
              </button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F5F5F5] py-10 lg:py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-950 lg:text-4xl">
              Оплачивайте онлайн
            </h2>
            <p className="mt-3 text-gray-500">
              Коммунальные услуги, интернет, телефон — без очередей
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-4">
            {paymentServices.map((service) => (
              <div
                key={service.text}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm sm:h-20 sm:w-20 sm:text-sm"
                  style={{ backgroundColor: service.color }}
                >
                  {service.text}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-500">
            + 500 других платёжных сервисов
          </p>
        </Container>
      </Section>

      <Section className="bg-brand-green py-10 text-white lg:py-16">
        <Container>
          <h2 className="text-center text-3xl font-bold lg:text-4xl">
            Почему выбирают InecoBank
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto h-8 w-8 text-white/80" />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="mt-4 text-4xl font-extrabold lg:text-5xl"
                >
                  {value}
                </motion.div>
                <p className="mt-2 text-sm text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white py-10 lg:py-16">
        <Container>
          <h2 className="text-3xl font-bold text-gray-950 lg:text-4xl">
            Новости
          </h2>
          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {news.map((item) => (
              <article
                key={item.title}
                className="min-w-[18rem] rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:min-w-0"
              >
                <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                  {item.tag}
                </span>
                <h3 className="mt-5 text-xl font-bold leading-7 text-gray-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-500">{item.date}</p>
                <p className="mt-4 leading-7 text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() =>
                showToast("Доступно в мобильном приложении INECOBANK", "info")
              }
              className="inline-flex rounded-lg border border-brand-green px-6 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
            >
              Все новости
            </button>
          </div>
        </Container>
      </Section>
    </>
  );
}
