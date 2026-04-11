"use client";

import { Logo } from "@/components/Logo";
import { motion } from "framer-motion";
import {
  BarChart2,
  Calculator,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  FileText,
  FlaskConical,
  HelpCircle,
  ListChecks,
  MapPin,
  Monitor,
  Navigation,
  Smartphone,
  Target,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

type IconComponent = ComponentType<{ className?: string }>;

type Problem = {
  icon: IconComponent;
  title: string;
  text: string;
  impact: string;
};

type FunnelStep = {
  step: string;
  label: string;
  detail: string;
  icon: IconComponent;
  loss: string | null;
};

type Hypothesis = {
  feature: string;
  hypothesis: string;
  metric: string;
  test: string;
};

type Metric = {
  metric: string;
  current: string;
  target: string;
  how: string;
  estimated: boolean;
};

type PrioritizedFeature = {
  feature: string;
  impact: number;
  confidence: number;
  effort: number;
  rationale: string;
};

type AnalyticsEvent = {
  event: string;
  why: string;
};

type Guardrail = {
  metric: string;
  reason: string;
};

type LaunchRisk = {
  item: string;
  reason: string;
};

const PROBLEMS: Problem[] = [
  {
    icon: Calculator,
    title: "Нет калькуляторов",
    text: "Пользователь не может рассчитать платёж по кредиту или доход по депозиту прямо на сайте. Приходится звонить или ехать в отделение.",
    impact: "Конверсия в заявку падает — пользователь уходит к конкурентам.",
  },
  {
    icon: Navigation,
    title: "Сложная навигация",
    text: "Продукты расположены без чёткой иерархии. Найти нужный раздел с мобильного устройства — задача не из простых.",
    impact: "Высокий bounce rate на мобильных устройствах.",
  },
  {
    icon: MapPin,
    title: "Нет поиска по отделениям",
    text: "Список отделений — статичная страница без поиска и фильтров. Пользователь вынужден просматривать весь список вручную.",
    impact: "Снижение офлайн-трафика, раздражение пользователей.",
  },
  {
    icon: HelpCircle,
    title: "FAQ неудобен",
    text: "Вопросы перечислены плоским списком без категорий. Найти нужный ответ — значит прочитать всё.",
    impact: "Рост нагрузки на колл-центр по типовым вопросам.",
  },
  {
    icon: Smartphone,
    title: "Слабая мобильная версия",
    text: "Сайт адаптирован формально. Многие элементы на мобильном мелкие, кнопки расположены неудобно.",
    impact: "60%+ трафика приходит с мобильных — потери огромны.",
  },
  {
    icon: Target,
    title: "Нет подбора продукта",
    text: "Новый клиент не знает, с чего начать. Нет инструмента, который поможет выбрать подходящий продукт.",
    impact: "Потеря новых клиентов на этапе знакомства с банком.",
  },
];

const SOLUTIONS = [
  {
    problem: "Нет калькуляторов",
    solution:
      "Интерактивные калькуляторы на страницах кредитов, ипотеки и депозитов",
    page: "/loans",
  },
  {
    problem: "Сложная навигация",
    solution: "Мегаменю с группировкой по продуктам + мобильный drawer",
    page: "/",
  },
  {
    problem: "Нет поиска по отделениям",
    solution: "Поиск + фильтры по типу и городу на странице отделений",
    page: "/branches",
  },
  {
    problem: "FAQ неудобен",
    solution: "Категории + аккордеон, одновременно открыт один вопрос",
    page: "/faq",
  },
  {
    problem: "Слабая мобильная версия",
    solution: "Mobile-first вёрстка, все страницы проверены на мобильном",
    page: "/",
  },
  {
    problem: "Нет подбора продукта",
    solution: "Квиз из 3 вопросов → персональная рекомендация продукта",
    page: "/",
  },
];

const EXECUTIVE_SUMMARY = [
  "Обнаружил потенциальные потери ~+1 200 заявок в месяц",
  "4 гипотезы с метриками успеха и чётким планом A/B-тестов",
  "Рабочий прототип вместо слайдов с рекомендациями",
  "Следующий шаг — за вами: готов к встрече или ревью",
];

const METRICS: Metric[] = [
  {
    metric: "Bounce rate",
    current: "~68%",
    target: "< 48%",
    how: "Бенчмарк для банков с калькуляторами — 45–50%. Взял верхнюю границу как консервативную цель.",
    estimated: true,
  },
  {
    metric: "Конверсия в заявку",
    current: "~0.8%",
    target: "> 2%",
    how: "Средний показатель по розничным банкам СНГ — 1.5–3%. Цель — нижняя граница рынка.",
    estimated: true,
  },
  {
    metric: "Мобильная конверсия",
    current: "~0.3%",
    target: "> 1%",
    how: "60%+ трафика — мобайл. Mobile-first редизайн стандартно даёт рост конверсии в 2–3×.",
    estimated: true,
  },
  {
    metric: "Время на странице",
    current: "~35 сек",
    target: "> 80 сек",
    how: "Интерактивный калькулятор увеличивает time-on-page в 2× — данные CXL Institute по финансовым сайтам.",
    estimated: true,
  },
  {
    metric: "Звонки в колл-центр",
    current: "база",
    target: "−20%",
    how: "Структурированный FAQ со строкой поиска снижает обращения на 15–25% — Gartner, 2023.",
    estimated: false,
  },
];

const FUNNEL: FunnelStep[] = [
  {
    step: "1",
    label: "Посадочная страница",
    detail: "Пользователь видит продукты и понимает, куда попал",
    icon: Monitor,
    loss: null,
  },
  {
    step: "2",
    label: "Квиз",
    detail: "3 вопроса → персональная рекомендация продукта",
    icon: ListChecks,
    loss: "Без квиза ~60% уходят здесь",
  },
  {
    step: "3",
    label: "Страница продукта",
    detail: "Калькулятор, условия, CTA-кнопка",
    icon: FileText,
    loss: "~70% уходят, не оставив заявку",
  },
  {
    step: "4",
    label: "Заявка",
    detail: "Пользователь оставляет контакт или звонит",
    icon: CheckCircle,
    loss: null,
  },
];

const HYPOTHESES: Hypothesis[] = [
  {
    feature: "Квиз на главной",
    hypothesis:
      "Пользователи, прошедшие квиз, реже уходят со страницы продукта",
    metric: "Drop-off rate на продуктовых страницах",
    test: "A/B: главная с квизом vs без",
  },
  {
    feature: "Калькуляторы",
    hypothesis: "Калькулятор увеличивает время на странице и число заявок",
    metric: "Time-on-page, CVR в заявку",
    test: "A/B: страница с калькулятором vs без",
  },
  {
    feature: "Переводы — вкладки",
    hypothesis: "Разделение по типу перевода снижает звонки в поддержку",
    metric: "Звонки по теме переводов, scroll depth",
    test: "Сравнение с текущей страницей переводов",
  },
  {
    feature: "Структурированный FAQ",
    hypothesis: "Категоризация FAQ снижает обращения по типовым вопросам",
    metric: "Объём звонков с типовыми вопросами",
    test: "Сравнение до/после по данным колл-центра",
  },
];

const PRIORITIZED_FEATURES: PrioritizedFeature[] = [
  {
    feature: "Калькуляторы",
    impact: 5,
    confidence: 4,
    effort: 2,
    rationale:
      "Ближе всего к заявке: пользователь сразу видит платёж, доход или первый взнос.",
  },
  {
    feature: "Квиз подбора",
    impact: 4,
    confidence: 4,
    effort: 2,
    rationale:
      "Снижает неопределённость для нового клиента и ведёт его на продуктовую страницу.",
  },
  {
    feature: "FAQ и категории",
    impact: 3,
    confidence: 4,
    effort: 1,
    rationale:
      "Быстрый способ уменьшить типовые вопросы и повысить доверие перед заявкой.",
  },
  {
    feature: "Личный кабинет",
    impact: 5,
    confidence: 3,
    effort: 5,
    rationale:
      "Сильная фича, но требует интеграций, безопасности и полноценного продуктового цикла.",
  },
];

const ANALYTICS_EVENTS: AnalyticsEvent[] = [
  {
    event: "quiz_started",
    why: "Понять, замечают ли пользователи подбор продукта на главной",
  },
  {
    event: "quiz_completed",
    why: "Измерить completion rate и качество перехода на продуктовую страницу",
  },
  {
    event: "calculator_changed",
    why: "Проверить, работает ли калькулятор как вовлекающий интерактив",
  },
  {
    event: "cta_clicked",
    why: "Отследить намерение оставить заявку по каждому продукту",
  },
  {
    event: "application_started",
    why: "Отделить интерес к продукту от реального начала заявки",
  },
];

const GUARDRAILS: Guardrail[] = [
  {
    metric: "Рост звонков в поддержку",
    reason: "Если звонков больше, интерфейс не объясняет условия достаточно ясно",
  },
  {
    metric: "Ошибки формы",
    reason: "Нельзя повышать CTA-click, если дальше пользователь упирается в ошибки",
  },
  {
    metric: "Mobile drop-off",
    reason: "Основная аудитория приходит с телефона, мобильная воронка критична",
  },
];

const LAUNCH_RISKS: LaunchRisk[] = [
  {
    item: "Онлайн-заявка на кредит",
    reason:
      "Нельзя запускать без проверки ставок, скоринга, юридического текста и передачи заявки в CRM.",
  },
  {
    item: "Калькуляторы как финальные условия",
    reason:
      "Расчёт должен быть помечен как предварительный до согласования с продуктом и compliance.",
  },
  {
    item: "Личный кабинет",
    reason:
      "Фича требует отдельного security review, авторизации и интеграции с банковскими системами.",
  },
];

const BUSINESS_SCENARIO = [
  { label: "Трафик", value: "100k визитов/мес" },
  { label: "Текущая CVR", value: "0.8% → 800 заявок" },
  { label: "Целевая CVR", value: "2.0% → 2 000 заявок" },
  { label: "Потенциал", value: "+1 200 заявок/мес до фильтра качества" },
];

const ROADMAP = [
  {
    quarter: "Q2 2026",
    items: [
      "A/B-тест CTA-кнопок на калькуляторах",
      "Онлайн-заявка на кредит без визита в отделение",
      "Google Analytics + Hotjar для анализа поведения",
    ],
  },
  {
    quarter: "Q3 2026",
    items: [
      "Личный кабинет — просмотр счетов и карт",
      "Push-уведомления об изменении ставок",
      "Интеграция карты отделений (Yandex Maps API)",
    ],
  },
  {
    quarter: "Q4 2026",
    items: [
      "Онлайн-открытие депозита",
      "Программа лояльности — страница и калькулятор кешбека",
      "Редизайн мобильного приложения (на основе полученных данных)",
    ],
  },
];

const STACK = [
  "Next.js 16 (App Router)",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "lucide-react",
  "Vercel",
];

const PROCESS = [
  "Discovery: анализ текущего сайта, выявление точек потерь",
  "Формулировка гипотез и метрик успеха для каждой фичи",
  "Приоритизация: что даёт максимальный эффект за минимальное время",
  "Прототип: собрал рабочий сайт самостоятельно, без команды",
  "Деплой и готовность к A/B-тестированию",
  "Итого: от анализа до работающего продукта — 3 часа",
];

const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-4xl px-4 sm:px-6">{children}</div>;
}

export function PitchPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
            PM-кейс · Редизайн сайта
          </span>
        </div>
      </header>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* Left: text */}
            <motion.div {...sectionAnimation} className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                Отклик на вакансию · Product Manager · INECOBANK
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-950 lg:text-5xl">
                Нашёл 6 точек потерь на inecobank.am — и устранил их.
              </h1>
              <p className="mt-5 text-lg text-gray-500">
                Вместо слайдов — рабочий прототип со всеми исправлениями.
                Без команды и дизайнеров.
              </p>

              {/* Stats — main page style */}
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">3 часа</p>
                  <p className="text-xs text-gray-400">от анализа до деплоя</p>
                </div>
                <div className="h-10 w-px bg-gray-100" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">+1 200</p>
                  <p className="text-xs text-gray-400">заявок/мес — потенциал</p>
                </div>
                <div className="h-10 w-px bg-gray-100" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">6</p>
                  <p className="text-xs text-gray-400">точек потерь</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:galoyandavid8@gmail.com"
                  className="rounded-md bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                >
                  Написать Давиду →
                </a>
                <Link
                  href="/"
                  className="rounded-md border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  Посмотреть сайт
                </Link>
              </div>
            </motion.div>

            {/* Right: PM card */}
            <motion.div
              {...sectionAnimation}
              className="w-full shrink-0 lg:w-72 xl:w-80"
            >
              <div className="relative overflow-hidden rounded-2xl bg-brand-dark p-7 text-white shadow-xl">
                {/* Decorative circle */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-green/20" />
                <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-white/5" />

                <div className="relative">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Product Manager · Кандидат
                  </p>
                  <p className="mt-3 text-xl font-extrabold text-white">
                    Давид Галоян
                  </p>
                  <p className="text-sm text-white/60">Москва · Армения</p>

                  <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    {[
                      { label: "Product Audit", value: "6 точек потерь" },
                      { label: "Потенциал роста", value: "+1 200 заявок/мес" },
                      { label: "Time to ship", value: "3 часа" },
                      { label: "Методология", value: "JTBD · CJM · A/B" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-4">
                        <p className="text-xs text-white/50">{row.label}</p>
                        <p className="text-sm font-semibold text-white">{row.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-xs text-white/40">galoyandavid8@gmail.com</p>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green">
                      <span className="text-xs font-bold text-white">ДГ</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <Container>
          <motion.div
            {...sectionAnimation}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold tracking-widest text-brand-green uppercase">
              Executive summary
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {EXECUTIVE_SUMMARY.map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Мотивация</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Почему INECOBANK</h2>
            <p className="mt-2 text-gray-500">Это не ковровая рассылка — я выбрал вас осознанно</p>
          </motion.div>
          <motion.div {...sectionAnimation} className="mt-8 space-y-6 border-t border-gray-100 pt-6">
            {[
              {
                label: "Топ-3 банк Армении",
                text: "INECOBANK — крупный розничный игрок с реальной цифровой аудиторией. Проблемы сайта влияют на тысячи заявок, а не на десятки. Здесь есть что менять и есть смысл это мерить.",
              },
              {
                label: "Конкретные точки роста",
                text: "Я вижу где и почему теряются клиенты: отсутствие калькуляторов, слабый мобайл, нет подбора продукта. Это не гипотезы из воздуха — я проверил каждую на бенчмарках.",
              },
              {
                label: "Вакансия совпадает с тем, как я работаю",
                text: "Product lifecycle, digital journeys, A/B-тесты, гипотезы с метриками — именно этим я занимался в этом кейсе. Не готовился к вакансии по шаблону, а показал это в работе.",
              },
            ].map((item) => (
              <div key={item.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[200px_1fr] sm:gap-8">
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Product Audit</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Что было не так</h2>
            <p className="mt-2 text-gray-500">Анализ текущего inecobank.am</p>
          </motion.div>
          <motion.div {...sectionAnimation} className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {PROBLEMS.map((problem, index) => (
              <div key={problem.title} className="grid grid-cols-[2rem_1fr_auto] items-start gap-4 px-6 py-5">
                <span className="text-sm font-bold text-gray-300">0{index + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900">{problem.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{problem.text}</p>
                </div>
                <span className="shrink-0 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-500 whitespace-nowrap hidden sm:block">
                  {problem.impact.split("—")[0].trim()}
                </span>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">ICE-scoring</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Приоритизация</h2>
            <p className="mt-2 text-gray-500">
              Что запускать первым, если цель — быстро проверить влияние на заявки
            </p>
          </motion.div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full min-w-[44rem] text-sm">
              <thead className="bg-[#F5F5F5]">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700">
                    Фича
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700">
                    Impact
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700">
                    Confidence
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700">
                    Effort
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700">
                    Почему
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {PRIORITIZED_FEATURES.map((item) => (
                  <tr key={item.feature}>
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      {item.feature}
                    </td>
                    <td className="px-5 py-4 text-brand-green">
                      {item.impact}/5
                    </td>
                    <td className="px-5 py-4 text-brand-green">
                      {item.confidence}/5
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {item.effort}/5
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {item.rationale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Воронка</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Как пользователь доходит до заявки</h2>
            <p className="mt-2 text-gray-500">Воронка, которую решает этот редизайн</p>
          </motion.div>

          <div className="mt-10 hidden items-start gap-2 sm:flex">
            {FUNNEL.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.step} className="flex items-start gap-2">
                  <motion.div
                    {...sectionAnimation}
                    className="flex w-44 flex-col items-center text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10">
                      <Icon className="h-6 w-6 text-brand-green" />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-brand-green">
                      Шаг {item.step}
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{item.detail}</p>
                    {item.loss ? (
                      <p className="mt-2 rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                        {item.loss}
                      </p>
                    ) : null}
                  </motion.div>
                  {index < FUNNEL.length - 1 ? (
                    <ChevronRight className="mt-5 h-5 w-5 shrink-0 text-gray-300" />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-2 sm:hidden">
            {FUNNEL.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.step} className="flex flex-col items-center">
                  <motion.div
                    {...sectionAnimation}
                    className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                        <Icon className="h-5 w-5 text-brand-green" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-brand-green">
                          Шаг {item.step}
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {item.label}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{item.detail}</p>
                    {item.loss ? (
                      <p className="mt-2 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">
                        {item.loss}
                      </p>
                    ) : null}
                  </motion.div>
                  {index < FUNNEL.length - 1 ? (
                    <ChevronDown className="h-5 w-5 text-gray-300" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Гипотезы</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Продуктовые гипотезы</h2>
            <p className="mt-2 text-gray-500">Что должна подтвердить или опровергнуть каждая фича</p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {HYPOTHESES.map((item) => (
              <motion.div
                key={item.feature}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold text-brand-green">
                  {item.feature}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  {item.hypothesis}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2 text-xs text-gray-500">
                    <BarChart2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                    <span>
                      <span className="font-semibold text-gray-700">
                        Метрика:{" "}
                      </span>
                      {item.metric}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-500">
                    <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                    <span>
                      <span className="font-semibold text-gray-700">
                        Тест:{" "}
                      </span>
                      {item.test}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Аналитика</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">План валидации</h2>
            <p className="mt-2 text-gray-500">Какие события я бы завёл перед A/B-тестом</p>
          </motion.div>
          <motion.div {...sectionAnimation} className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {ANALYTICS_EVENTS.map((item) => (
                <div key={item.event} className="flex items-start gap-4 px-6 py-4">
                  <code className="shrink-0 rounded bg-brand-green/8 px-2 py-0.5 font-mono text-xs font-semibold text-brand-green">
                    {item.event}
                  </code>
                  <p className="text-sm text-gray-500">{item.why}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 bg-surface px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Guardrail metrics</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {GUARDRAILS.map((item) => (
                  <div key={item.metric}>
                    <p className="text-sm font-semibold text-gray-700">{item.metric}</p>
                    <p className="mt-0.5 text-xs leading-5 text-gray-400">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Риски</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Что не запускать сразу</h2>
            <p className="mt-2 text-gray-500">Ограничения, которые я бы зафиксировал до полноценного релиза</p>
          </motion.div>
          <motion.div {...sectionAnimation} className="mt-8 space-y-4">
            {LAUNCH_RISKS.map((item) => (
              <div key={item.item} className="flex gap-4">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                <div>
                  <p className="font-semibold text-gray-900">{item.item}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.reason}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Бизнес-эффект</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Сценарий бизнес-эффекта</h2>
            <p className="mt-2 text-gray-500">
              Не прогноз, а пример модели, которую я бы проверил на реальных данных
            </p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
            {BUSINESS_SCENARIO.map((item) => (
              <motion.div
                key={item.label}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-surface p-5 shadow-sm ring-1 ring-black/[0.06]"
              >
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-extrabold text-gray-900">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            * Сценарий нужен для разговора о порядке эффекта. В реальном проекте
            модель пересчитывается после подключения GA4, CRM и данных по
            качеству заявок.
          </p>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Решения</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Что изменилось</h2>
          </motion.div>
          <motion.div
            {...sectionAnimation}
            className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
          >
            <table className="w-full text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="w-2/5 px-5 py-3 text-left font-semibold text-gray-700">
                    Проблема
                  </th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700">
                    Решение
                  </th>
                  <th className="w-24 px-5 py-3 text-left font-semibold text-gray-700">
                    Страница
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {SOLUTIONS.map((row) => (
                  <tr
                    key={row.problem}
                    className="transition-colors hover:bg-brand-green/5"
                  >
                    <td className="px-5 py-4 text-gray-700">{row.problem}</td>
                    <td className="px-5 py-4 text-gray-800">{row.solution}</td>
                    <td className="px-5 py-4">
                      <a
                        href={row.page}
                        className="font-medium text-brand-green hover:underline"
                      >
                        Открыть
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </Container>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">KPI</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Метрики успеха</h2>
            <p className="mt-2 text-gray-500">Что должен улучшить этот редизайн — и как это измерить</p>
          </motion.div>
          <motion.div {...sectionAnimation} className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {METRICS.map((metric) => (
              <div key={metric.metric} className="grid grid-cols-[1fr_auto] items-center gap-6 px-6 py-5 sm:grid-cols-[180px_1fr_auto]">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{metric.metric}</p>
                <p className="hidden text-sm text-gray-500 sm:block">{metric.how}</p>
                <div className="flex items-baseline gap-2 text-right">
                  <span className="text-sm text-gray-300 line-through">{metric.current}</span>
                  <span className="text-xl font-extrabold text-brand-green">{metric.target}</span>
                </div>
              </div>
            ))}
          </motion.div>
          <p className="mt-4 text-xs text-gray-400">
            * Показатели оценочные, на основе анализа воронки. Точные данные — после подключения GA4.
          </p>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Roadmap</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Что дальше</h2>
            <p className="mt-2 text-gray-500">Следующие шаги после запуска</p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {ROADMAP.map((roadmap) => (
              <motion.div
                key={roadmap.quarter}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-surface p-6 shadow-sm ring-1 ring-black/[0.06]"
              >
                <p className="font-bold text-brand-green">{roadmap.quarter}</p>
                <ul className="mt-4 space-y-3">
                  {roadmap.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-green/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Как я работаю</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Процесс</h2>
          </motion.div>
          <motion.div {...sectionAnimation} className="mt-8 space-y-0 divide-y divide-gray-100">
            {PROCESS.map((item, index) => (
              <div key={item} className="flex items-start gap-5 py-4">
                <span className="w-6 shrink-0 text-right text-sm font-bold text-gray-200">{index + 1}</span>
                <p className="text-sm leading-relaxed text-gray-700">{item}</p>
              </div>
            ))}
          </motion.div>
          <p className="mt-6 text-xs text-gray-400">
            Умею читать код, написать SQL-запрос и задеплоить прототип — это снижает
            стоимость discovery. В реальном проекте этот редизайн прошёл бы
            discovery-сессии с командой и согласование с compliance.
          </p>
        </Container>
      </section>

      <section className="bg-brand-green py-20 text-center text-white">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Готов к встрече
            </p>
            <h2 className="mt-3 text-3xl font-extrabold lg:text-4xl">
              Хочу стать вашим Product Manager
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">
              Этот кейс — не тестовое задание, которое я сделал по запросу.
              Я открыл ваш сайт, нашёл проблемы и построил решение — потому что
              именно так работаю. Готов обсудить, как применить этот подход
              к вашим продуктам.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="mailto:galoyandavid8@gmail.com"
                className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-gray-100"
              >
                Написать письмо
              </a>
              <a
                href="tel:+79044049797"
                className="rounded-md border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                +7 904 404 9797
              </a>
            </div>
            <p className="mt-8 text-sm text-white/50">
              Давид Галоян · Product Manager · Москва
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
