"use client";

import {
  ArrowLeftRight,
  Banknote,
  ChevronLeft,
  CheckCircle,
  CreditCard,
  Home as HomeIcon,
  PiggyBank,
  Receipt,
  TrendingUp,
  Wallet,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { ComponentType, ReactNode } from "react";

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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const quickActions: { label: string; icon: IconComponent; href: string }[] = [
  { label: "Переводы", icon: ArrowLeftRight, href: "/transfers" },
  { label: "Платежи", icon: Receipt, href: "#payments" },
  { label: "Карты", icon: CreditCard, href: "/cards" },
  { label: "Депозиты", icon: PiggyBank, href: "/deposits" },
  { label: "Ипотека", icon: HomeIcon, href: "/mortgage" },
];

const products: { title: string; text: string; cta: string; icon: IconComponent; featured?: boolean }[] = [
  {
    title: "Банковские карты",
    text: "Кешбэк с каждой покупки. Visa, Mastercard и ArCa — бесконтактная оплата в Армении и за рубежом. Обслуживание бесплатно.",
    cta: "Выбрать карту",
    icon: CreditCard,
  },
  {
    title: "Кредиты",
    text: "Решение за 1 минуту онлайн. До 10 000 000 AMD без залога и поручителей — прямо в приложении, круглосуточно.",
    cta: "Рассчитать кредит",
    icon: Banknote,
    featured: true,
  },
  {
    title: "Депозиты",
    text: "До 10% годовых в AMD. Проценты каждый месяц на счёт. Открыть онлайн за 5 минут, закрыть в любой момент.",
    cta: "Открыть депозит",
    icon: TrendingUp,
  },
  {
    title: "Ипотека",
    text: "От 8.5% годовых на 30 лет. Государственные льготные программы для молодых семей. Одобрение без визита в офис.",
    cta: "Узнать условия",
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
    title: "Обновление мобильного приложения InecoMobile",
    date: "28 марта 2026",
    text: "Новая версия приложения получила redesign интерфейса и поддержку Face ID для входа.",
  },
];

const testimonials = [
  {
    name: "Арман Г.",
    role: "Предприниматель, Ереван",
    initials: "АГ",
    quote: "Открыл ИП и счёт в один день — всё онлайн. Ни одного визита в банк за полгода. Переводы контрагентам проходят мгновенно.",
    stars: 5,
  },
  {
    name: "Наталья К.",
    role: "Переехала из России",
    initials: "НК",
    quote: "Как релокант, мне было важно быстро открыть счёт. InecoBank сделал всё дистанционно за один день. Карту привезли домой.",
    stars: 5,
  },
  {
    name: "Давид М.",
    role: "IT-специалист",
    initials: "ДМ",
    quote: "Взял 1CLICK кредит прямо в приложении — одобрили за 40 секунд. Деньги на счету через минуту. Без бумаг и поручителей.",
    stars: 5,
  },
];

const TAG_COLORS: Record<string, string> = {
  "Продукты": "bg-emerald-50 text-emerald-700",
  "Партнёрство": "bg-blue-50 text-blue-700",
  "Технологии": "bg-purple-50 text-purple-700",
};

function tagColorClass(tag: string): string {
  return TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600";
}

// ── App tabs data ──────────────────────────────────────────────────────────────
type AppItem = { key: string; name: string; detail: string; icon: IconComponent; amount: string; btnLabel: string };
type AppTab = { label: string; items: AppItem[] };

const appTabs: AppTab[] = [
  {
    label: "Платежи",
    items: [
      { key: "vivacell", name: "VivaCell", detail: "Мобильная связь", icon: Receipt, amount: "3 000 AMD", btnLabel: "Оплатить" },
      { key: "electricity", name: "Электричество", detail: "АЕСК", icon: Receipt, amount: "5 200 AMD", btnLabel: "Оплатить" },
      { key: "internet", name: "Интернет", detail: "Ucom", icon: Receipt, amount: "4 500 AMD", btnLabel: "Оплатить" },
    ],
  },
  {
    label: "Переводы",
    items: [
      { key: "armen", name: "Армен А.", detail: "Клиент InecoBank", icon: ArrowLeftRight, amount: "50 000 AMD", btnLabel: "Отправить" },
      { key: "visa", name: "На карту Visa", detail: "Другой банк", icon: CreditCard, amount: "100 000 AMD", btnLabel: "Отправить" },
      { key: "russia", name: "За рубеж", detail: "Western Union", icon: ArrowLeftRight, amount: "200 USD", btnLabel: "Отправить" },
    ],
  },
  {
    label: "Вклады",
    items: [
      { key: "deposit_term", name: "Срочный вклад", detail: "10% годовых в AMD", icon: TrendingUp, amount: "500 000 AMD", btnLabel: "Открыть" },
      { key: "deposit_flex", name: "Гибкий вклад", detail: "8% годовых в AMD", icon: PiggyBank, amount: "200 000 AMD", btnLabel: "Открыть" },
      { key: "inecosave", name: "INECOSAVE", detail: "Накопительный", icon: Wallet, amount: "1 000 AMD/мес", btnLabel: "Открыть" },
    ],
  },
];

// ── Phone shell ────────────────────────────────────────────────────────────────
function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[260px] rounded-[2.4rem] bg-gray-900 p-[10px] shadow-2xl ring-1 ring-white/10">
      {/* Speaker notch */}
      <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-gray-700" />
      {/* Screen */}
      <div className="overflow-hidden rounded-[1.75rem] bg-white">
        {children}
      </div>
      {/* Home bar */}
      <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gray-700" />
    </div>
  );
}

// ── Interactive InecoMobile demo ───────────────────────────────────────────────
function InecoMobileDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [doneItems, setDoneItems] = useState<Set<string>>(new Set());
  const [balanceBump, setBalanceBump] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doneCount = doneItems.size;
  const currentItems = appTabs[activeTab].items;

  function scheduleHint() {
    hintTimer.current = setTimeout(() => {
      if (!hasInteracted) {
        setShowHint(true);
        hintTimer.current = setTimeout(() => {
          setShowHint(false);
          scheduleHint();
        }, 2200);
      }
    }, 2500);
  }

  function markInteracted() {
    if (hasInteracted) return;
    setHasInteracted(true);
    setShowHint(false);
    if (hintTimer.current) clearTimeout(hintTimer.current);
  }

  function triggerBump() {
    setBumpKey((k) => k + 1);
    setBalanceBump(true);
    setTimeout(() => setBalanceBump(false), 450);
  }

  function toggleItem(key: string) {
    markInteracted();
    setDoneItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
        triggerBump();
      }
      return next;
    });
  }

  function switchTab(i: number) {
    setActiveTab(i);
    markInteracted();
  }

  function stepState(index: number) {
    if (index === 0) return doneCount > 0 ? "done" : "active";
    if (index === 1) return doneCount > 0 ? "active" : "idle";
    return "idle";
  }

  useEffect(() => {
    scheduleHint();
    return () => { if (hintTimer.current) clearTimeout(hintTimer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative" onMouseEnter={markInteracted}>
      {/* Hint finger */}
      {showHint && (
        <div className="animate-hint-tap pointer-events-none absolute right-8 top-[48%] z-20 text-3xl drop-shadow-md">
          👆
        </div>
      )}

      <PhoneShell>
        {/* App header */}
        <div className="flex items-center gap-2.5 bg-brand-green px-4 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
            i
          </div>
          <div>
            <p className="text-xs font-bold leading-none text-white">InecoMobile</p>
            <p className="mt-0.5 text-[10px] text-white/70">Inecobank CJSC</p>
          </div>
        </div>

        {/* Balance card */}
        <div className="mx-3 mt-3 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
          <div>
            <p className="text-[10px] text-gray-400">Баланс</p>
            <p
              key={bumpKey}
              className={`mt-0.5 text-[18px] font-extrabold leading-none text-gray-900 ${balanceBump ? "animate-balance-bump text-brand-green" : ""}`}
            >
              523 400 ֏
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              ↑ {doneCount} {doneCount === 1 ? "операция" : doneCount < 5 ? "операции" : "операций"}
            </span>
            <p className="mt-1 text-[10px] text-gray-400">Выполнено</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-3 mt-2.5 flex gap-1.5">
          {appTabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => switchTab(i)}
              className={`flex-1 rounded-xl py-1.5 text-[11px] font-semibold transition-colors ${
                activeTab === i
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="mx-3 mt-2 flex flex-col gap-1.5"
          >
            {currentItems.map((item) => {
              const done = doneItems.has(item.key);
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className={`flex items-center gap-2.5 rounded-xl border px-2.5 py-2 transition-colors ${
                    done ? "animate-card-done border-emerald-200 bg-emerald-50" : "border-gray-100"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      done ? "border-emerald-200 bg-emerald-100 text-emerald-600" : "border-gray-100 bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold text-gray-900">{item.name}</p>
                    <p className="text-[10px] text-gray-400">
                      <span className="font-semibold text-brand-green">{item.amount}</span> · {item.detail}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleItem(item.key)}
                    className={`h-7 w-[52px] shrink-0 rounded-lg text-[11px] font-semibold transition-all active:scale-90 ${
                      done ? "bg-emerald-500 text-white" : "bg-brand-green text-white hover:bg-brand-green-light"
                    }`}
                  >
                    {done ? (
                      <span className="flex items-center justify-center">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      item.btnLabel
                    )}
                  </button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Steps */}
        <div className="mx-3 mb-3 mt-2.5 rounded-xl bg-gray-50 px-3 py-2.5">
          {[
            { label: "Выберите операцию", state: stepState(0) },
            { label: "Подтвердите за 1 касание", state: stepState(1) },
            { label: "Без визита в банк", state: stepState(2) },
          ].map(({ label, state }) => (
            <div key={label} className="flex items-center gap-2 py-1">
              <span
                className={`h-[7px] w-[7px] shrink-0 rounded-full transition-all ${
                  state === "done"
                    ? "bg-emerald-500"
                    : state === "active"
                    ? "bg-brand-green shadow-[0_0_0_3px_rgba(10,124,62,0.18)]"
                    : "bg-gray-200"
                }`}
              />
              <span
                className={`text-[11px] transition-colors ${
                  state === "done"
                    ? "text-emerald-600"
                    : state === "active"
                    ? "font-semibold text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </PhoneShell>
    </div>
  );
}

// ── InecoMobile Section ────────────────────────────────────────────────────────
function InecoMobileSection() {
  return (
    <Section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — text */}
          <motion.div {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              InecoMobile
            </p>
            <h2 className="mt-3 text-4xl font-bold leading-[1.1] text-gray-950 lg:text-5xl">
              Весь банк<br />в смартфоне.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-500">
              Переводы, платежи, вклады — всё в два касания. Без очередей, без визита в отделение. Работает 24/7 из любой точки мира.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Вход по Face ID и отпечатку пальца",
                "Переводы по номеру телефона мгновенно",
                "Кредит 1CLICK — одобрение за 40 секунд",
                "Push-уведомления о каждой операции",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 shrink-0 text-brand-green" />
                  <span className="text-sm">{feat}</span>
                </li>
              ))}
            </ul>

            {/* App download badges */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://apps.apple.com/am/app/inecomobile/id919137872"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-950 px-5 py-3 text-white transition-opacity hover:opacity-90"
              >
                <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.3-2.18 3.87.03 3.07 2.66 4.1 2.69 4.11l-.06.14zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/60">Скачать в</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.sflpro.inecomobile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-950 px-5 py-3 text-white transition-opacity hover:opacity-90"
              >
                <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.18 23.79c.35.2.76.2 1.12.01l11.27-6.51-2.5-2.5-9.89 8.99zm-1.51-20.4C1.44 3.7 1.25 4.07 1.25 4.5v15c0 .43.19.8.42 1.11L13 9.25 1.67 3.39zM20.13 9.7l-2.44-1.41-2.8 2.8 2.8 2.8 2.46-1.42c.7-.4.7-1.37-.02-1.77zM4.3.22L15.57 6.72l-2.5 2.5-9.9-9z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/60">Скачать в</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div>
                <span className="text-sm font-bold text-gray-900">4.8 / 5.0</span>
                <span className="ml-1.5 text-sm text-gray-400">· 14 000+ отзывов</span>
              </div>
            </div>
          </motion.div>

          {/* Right — interactive phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <InecoMobileDemo />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// ── Testimonials section ───────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <Section className="bg-surface py-14 lg:py-20">
      <Container>
        <motion.div {...fadeUp} className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            Отзывы клиентов
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-950 lg:text-4xl">
            Нам доверяют 500 000+ человек
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-7 text-gray-600">«{t.quote}»</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <motion.section id={id} className={className} {...fadeUp}>
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

function getRecommendation(state: QuizState): Recommendation {
  if (state.goal === "save") {
    return state.term === "long"
      ? { title: "Срочный депозит", text: "Высокая ставка до 10% годовых на ваши накопления.", href: "/deposits", cta: "Открыть депозит" }
      : { title: "Текущий счёт", text: "Гибкий доступ к деньгам без ограничений.", href: "#", cta: "Открыть счёт" };
  }
  if (state.goal === "borrow") {
    return state.amount === "large"
      ? { title: "Ипотека", text: "Ставка от 8.5% на покупку недвижимости.", href: "/mortgage", cta: "Рассчитать ипотеку" }
      : { title: "Потребительский кредит", text: "До 10 000 000 AMD без залога. Решение за 1 минуту.", href: "/loans", cta: "Рассчитать кредит" };
  }
  if (state.goal === "spend") {
    return { title: "Карта INECOBANK", text: "Кешбэк, бесконтактная оплата и онлайн-покупки.", href: "/cards", cta: "Выбрать карту" };
  }
  return { title: "Переводы", text: "Внутри Армении и за рубеж с низкой комиссией.", href: "/transfers", cta: "Узнать о переводах" };
}

function ProductQuiz() {
  const [step, setStep] = useState<QuizStep>("goal");
  const [quiz, setQuiz] = useState<QuizState>({ goal: null, term: null, amount: null });

  const stepIndex = step === "result" ? 2 : { goal: 0, term: 1, amount: 2 }[step];
  const rec = getRecommendation(quiz);

  const resetQuiz = () => {
    setQuiz({ goal: null, term: null, amount: null });
    setStep("goal");
  };

  const goBack = () => {
    if (step === "term") { setQuiz((c) => ({ ...c, term: null })); setStep("goal"); }
    else if (step === "amount") { setQuiz((c) => ({ ...c, amount: null })); setStep("term"); }
  };

  return (
    <Section className="bg-surface py-16" id="quiz">
      <Container>
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            Подбор продукта
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            Какой продукт вам подходит?
          </h2>
          <p className="mt-3 text-gray-500">
            Ответьте на 3 вопроса — мы подберём лучший вариант
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-xl">
          {step !== "result" && (
            <div className="mb-8 flex items-center gap-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    index <= stepIndex ? "bg-brand-green" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}

          {(step === "term" || step === "amount") && (
            <button
              type="button"
              onClick={goBack}
              className="mb-4 flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Назад
            </button>
          )}

          {step === "goal" && (
            <div>
              <p className="mb-4 font-semibold text-gray-900">Какова ваша цель?</p>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => { setQuiz((c) => ({ ...c, goal: goal.id })); setStep("term"); }}
                      className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand-green hover:text-brand-green hover:shadow-md"
                    >
                      <Icon className="h-6 w-6" />
                      {goal.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "term" && (
            <div>
              <p className="mb-4 font-semibold text-gray-900">На какой срок?</p>
              <div className="flex flex-col gap-3">
                {TERMS.map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => { setQuiz((c) => ({ ...c, term: term.id })); setStep("amount"); }}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand-green hover:text-brand-green"
                  >
                    {term.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "amount" && (
            <div>
              <p className="mb-4 font-semibold text-gray-900">Какая сумма?</p>
              <div className="flex flex-col gap-3">
                {AMOUNTS.map((amount) => (
                  <button
                    key={amount.id}
                    type="button"
                    onClick={() => { setQuiz((c) => ({ ...c, amount: amount.id })); setStep("result"); }}
                    className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-brand-green hover:text-brand-green"
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "result" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-brand-green/30 bg-white p-8 text-center shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                <CheckCircle className="h-7 w-7 text-brand-green" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{rec.title}</h3>
              <p className="mt-3 text-gray-500">{rec.text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={rec.href}
                  className="rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                >
                  {rec.cta}
                </a>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  Пройти снова
                </button>
              </div>
            </motion.div>
          )}
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
            <p className="text-xs uppercase text-white/90">Держатель</p>
            <p className="text-sm font-semibold tracking-wide sm:text-base">ИВАН ИВАНОВ</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase text-white/90">До</p>
            <p className="text-sm font-semibold sm:text-base">12/28</p>
          </div>
          <svg className="h-8 w-14" viewBox="0 0 72 28" role="img" aria-label="Visa">
            <text x="0" y="22" fill="white" fontSize="24" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="-2">
              VISA
            </text>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-white pt-20">
        <div className="absolute right-0 top-0 h-[36rem] w-[36rem] translate-x-1/3 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,#0A7C3E14,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #0a7c3e 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Container>
          <div className="relative grid min-h-[calc(100vh-80px)] items-center gap-12 py-10 lg:grid-cols-2 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                С 1996 года · Армения
              </p>
              <h1 className="mt-4 max-w-xl text-5xl font-bold leading-[1.1] text-gray-950 sm:text-6xl lg:text-7xl">
                Кредит за<br />1 минуту.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-gray-500">
                Ипотека от 8.5% · Депозиты до 10% · Переводы по всему миру. Всё онлайн, без визита в отделение.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#"
                  className="rounded-lg bg-brand-green px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                >
                  Открыть счёт бесплатно
                </a>
                <a
                  href="#quiz"
                  className="rounded-lg border border-brand-green px-6 py-3 text-center text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                >
                  Подобрать продукт
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                    <CheckCircle className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Банк года 2023</p>
                    <p className="text-xs text-gray-400">по версии Global Finance</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-gray-100" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">500 000+</p>
                  <p className="text-xs text-gray-400">клиентов доверяют нам</p>
                </div>
                <div className="h-10 w-px bg-gray-100" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">80+</p>
                  <p className="text-xs text-gray-400">отделений по Армении</p>
                </div>
              </div>
            </motion.div>
            <div className="pb-8 lg:pb-0">
              <BankCard />
            </div>
          </div>
        </Container>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <Section className="border-y border-gray-100 bg-white py-8">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Что вы хотите сделать?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {quickActions.map(({ label, icon: Icon, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-brand-green hover:text-brand-green"
              >
                <Icon className="h-4 w-4" />
                {label}
              </motion.a>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PRODUCTS ── */}
      <Section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-3xl font-bold text-gray-950 lg:text-4xl">
              Наши продукты
            </h2>
            <p className="text-sm text-gray-400">Всё необходимое для управления финансами</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {products.map(({ icon: Icon, featured, ...product }, i) => (
              <motion.a
                key={product.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl bg-surface p-7 transition-shadow hover:shadow-md"
              >
                <Icon className="absolute -right-4 -top-4 h-32 w-32 text-brand-green/[0.08] transition-transform duration-500 group-hover:scale-110" />
                <div className="relative mt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-950">{product.title}</h3>
                    {featured && (
                      <span className="rounded-full bg-brand-green/10 px-2.5 py-0.5 text-xs font-semibold text-brand-green">
                        Популярное
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-gray-500">{product.text}</p>
                </div>
                <p className="relative mt-6 text-sm font-semibold text-brand-green transition-colors group-hover:text-brand-green-light">
                  {product.cta} →
                </p>
              </motion.a>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── INECOMOBILE ── */}
      <InecoMobileSection />

      {/* ── PRODUCT QUIZ ── */}
      <ProductQuiz />

      {/* ── EXCHANGE RATES ── */}
      <Section className="bg-surface py-14 lg:py-20">
        <Container>
          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-gray-950">Курсы валют</h2>
              <p className="text-sm text-gray-400">Обновлено: сегодня, 15:00</p>
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
                      <td className="px-5 py-4 font-medium text-gray-900">{rate.currency}</td>
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
              <a
                href="#"
                className="inline-flex rounded-lg border border-brand-green px-5 py-2.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                Полная таблица курсов
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── PAYMENTS ── */}
      <Section id="payments" className="bg-white py-14 lg:py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-950 lg:text-4xl">
              Оплачивайте онлайн
            </h2>
            <p className="mt-3 text-gray-500">
              Коммунальные услуги, интернет, телефон — без очередей
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
            {paymentServices.map((service, i) => (
              <motion.div
                key={service.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-xl text-xs font-bold text-white shadow-sm sm:h-20 sm:w-20 sm:text-sm"
                  style={{ backgroundColor: service.color }}
                >
                  {service.text}
                </div>
                <span className="text-xs text-gray-500">{service.text}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">
            + 500 других платёжных сервисов
          </p>
        </Container>
      </Section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── STATS ── */}
      <Section className="bg-brand-green py-16 text-white lg:py-24">
        <Container>
          <h2 className="text-3xl font-bold lg:text-4xl">
            Почему выбирают InecoBank
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[7rem] font-bold leading-none tracking-tight lg:text-[9rem]"
              >
                30+
              </motion.div>
              <p className="mt-4 text-xl font-semibold text-white">лет на рынке Армении</p>
              <p className="mt-3 max-w-sm text-white/60">
                Основан в 1996 году. Один из крупнейших частных банков страны под надзором Центрального банка Армении.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-white/15">
              {[
                { value: "500 000+", label: "Клиентов", sub: "доверяют нам свои финансы" },
                { value: "80+", label: "Отделений", sub: "по всей Армении" },
                { value: "24/7", label: "Онлайн-сервис", sub: "без выходных и праздников" },
              ].map(({ value, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="lg:py-7 lg:first:pt-0 lg:last:pb-0"
                >
                  <div className="text-3xl font-extrabold">{value}</div>
                  <p className="mt-1 font-semibold">{label}</p>
                  <p className="mt-0.5 text-sm text-white/60">{sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── STATS CTA ── */}
      <section className="bg-brand-green pb-16 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-brand-green shadow-md transition-all hover:shadow-lg hover:brightness-95"
        >
          Стать клиентом — это бесплатно →
        </a>
      </section>

      {/* ── NEWS ── */}
      <Section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-gray-950 lg:text-4xl">
              Новости
            </h2>
            <a
              href="#"
              className="text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-light"
            >
              Все новости →
            </a>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col rounded-xl border border-gray-100 bg-white p-7 shadow-sm lg:col-span-3"
            >
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${tagColorClass(news[0].tag)}`}>
                {news[0].tag}
              </span>
              <h3 className="mt-5 text-2xl font-bold leading-snug text-gray-950 lg:text-[1.65rem]">
                {news[0].title}
              </h3>
              <p className="mt-3 text-sm text-gray-400">{news[0].date}</p>
              <p className="mt-4 flex-1 leading-7 text-gray-600">{news[0].text}</p>
              <a href="#" className="mt-7 inline-flex text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-light">
                Читать далее →
              </a>
            </motion.article>
            <div className="flex flex-col gap-6 lg:col-span-2">
              {news.slice(1).map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex flex-1 flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${tagColorClass(item.tag)}`}>
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-bold leading-snug text-gray-950">{item.title}</h3>
                  <p className="mt-2 text-xs text-gray-400">{item.date}</p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
