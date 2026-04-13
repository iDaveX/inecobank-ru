"use client";

import { Logo } from "@/components/Logo";
import { motion } from "framer-motion";
import {
  BarChart2,
  Calculator,
  ChevronDown,
  CheckCircle,
  Code2,
  FileText,
  FlaskConical,
  HelpCircle,
  ListChecks,
  ListOrdered,
  Mail,
  Monitor,
  Navigation,
  Smartphone,
  Target,
  TrendingDown,
  TrendingUp,
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
    icon: HelpCircle,
    title: "FAQ без поиска",
    text: "Вопросы разбиты по вкладкам, но найти конкретный ответ быстро не получится: поиска внутри раздела нет, весь текст раскрыт сразу.",
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
    problem: "FAQ без поиска",
    solution: "Поиск по тексту + аккордеон — нужный ответ за секунды",
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
  "Нашёл решения, которые можно сделать лучше, чем на текущем inecobank.am",
  "Сформулировал 4 продуктовые гипотезы и метрики успеха",
  "Собрал работающий прототип вместо презентации с рекомендациями",
  "Следующий шаг: аналитика, compliance review и A/B-тесты",
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

      <section className="relative overflow-hidden border-b border-gray-100 bg-[#f8fbf8] py-20 text-center">
        <div className="absolute inset-x-0 bottom-0 h-px bg-brand-green/20" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,124,62,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(10,124,62,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <Container>
          <motion.div {...sectionAnimation} className="relative">
            <p className="text-sm font-semibold tracking-widest text-brand-green uppercase">
              Инициативный проект
            </p>
            <div className="mx-auto mt-6 flex max-w-xl flex-col items-stretch overflow-hidden rounded-lg bg-white text-left shadow-sm ring-1 ring-brand-green/10 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 bg-gray-950 px-5 py-4 text-white sm:w-1/2">
                <span className="text-[3.5rem] leading-none font-black text-white/90">
                  5
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                    Before
                  </p>
                  <p className="text-sm font-bold">направлений роста</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 text-brand-green sm:w-1/2">
                <span className="text-[3.5rem] leading-none font-black">1</span>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-brand-green/60 uppercase">
                    After
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    рабочий прототип
                  </p>
                </div>
              </div>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-950 sm:text-5xl">
              Редизайн inecobank.am
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 text-gray-600">
              Меня зовут Давид. Готовясь к разговору с вами, я открыл
              inecobank.am и увидел, какие решения можно сделать сильнее: от
              калькуляторов до мобильного опыта. Я не стал делать презентацию с
              рекомендациями — я построил работающий сайт с ключевыми
              улучшениями. Без команды и дизайнеров. За один вечер.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#F5F5F5] py-12">
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

      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">Что было не так</h2>
            <p className="mt-2 text-gray-500">Анализ текущего inecobank.am</p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((problem, index) => {
              const Icon = problem.icon;

              return (
                <motion.div
                  key={problem.title}
                  {...sectionAnimation}
                  className="relative overflow-hidden rounded-lg bg-red-50/30 p-6 shadow-sm"
                >
                  <span className="absolute top-4 left-5 text-5xl leading-none font-black text-gray-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative ml-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="relative mt-5 font-bold text-gray-900">
                    {problem.title}
                  </h3>
                  <p className="relative mt-2 text-xs font-semibold leading-5 text-red-700">
                    {problem.impact}
                  </p>
                  <p className="relative mt-3 text-sm leading-6 text-gray-600">
                    {problem.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">
              Приоритизация
            </h2>
            <p className="mt-2 text-gray-500">
              Что запускать первым, если цель — быстро проверить влияние на
              заявки
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

      <section className="bg-white py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">
              Как пользователь доходит до заявки
            </h2>
            <p className="mt-2 text-gray-500">
              Воронка, которую решает этот редизайн
            </p>
          </motion.div>

          <div className="mt-10 hidden items-start gap-2 lg:flex">
            {FUNNEL.map((item, index) => {
              const Icon = item.icon;
              const isGoal = index === FUNNEL.length - 1;

              return (
                <div key={item.step} className="flex items-start gap-2">
                  <motion.div
                    {...sectionAnimation}
                    className={`flex w-44 flex-col items-center rounded-lg p-4 text-center shadow-sm ${
                      isGoal
                        ? "bg-brand-green text-white"
                        : "bg-white text-gray-900 ring-1 ring-gray-100"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        isGoal ? "bg-white/20" : "bg-brand-green/10"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isGoal ? "text-white" : "text-brand-green"
                        }`}
                      />
                    </div>
                    <p
                      className={`mt-3 text-xs font-semibold ${
                        isGoal ? "text-white/70" : "text-brand-green"
                      }`}
                    >
                      Шаг {item.step}
                    </p>
                    <p className="mt-1 text-sm font-bold">{item.label}</p>
                    <p
                      className={`mt-1 text-xs ${
                        isGoal ? "text-white/75" : "text-gray-500"
                      }`}
                    >
                      {item.detail}
                    </p>
                    {item.loss ? (
                      <p className="mt-2 rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                        {item.loss}
                      </p>
                    ) : null}
                  </motion.div>
                  {index < FUNNEL.length - 1 ? (
                    <span className="mt-9 text-xl font-bold text-gray-300">
                      →
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-2 lg:hidden">
            {FUNNEL.map((item, index) => {
              const Icon = item.icon;
              const isGoal = index === FUNNEL.length - 1;

              return (
                <div key={item.step} className="flex flex-col items-center">
                  <motion.div
                    {...sectionAnimation}
                    className={`w-full rounded-lg p-5 shadow-sm ${
                      isGoal
                        ? "bg-brand-green text-white"
                        : "bg-white text-gray-900 ring-1 ring-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isGoal ? "bg-white/20" : "bg-brand-green/10"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isGoal ? "text-white" : "text-brand-green"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-semibold ${
                            isGoal ? "text-white/70" : "text-brand-green"
                          }`}
                        >
                          Шаг {item.step}
                        </p>
                        <p className="text-sm font-bold">{item.label}</p>
                      </div>
                    </div>
                    <p
                      className={`mt-2 text-sm ${
                        isGoal ? "text-white/75" : "text-gray-500"
                      }`}
                    >
                      {item.detail}
                    </p>
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

      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">
              Продуктовые гипотезы
            </h2>
            <p className="mt-2 text-gray-500">
              Что должна подтвердить или опровергнуть каждая фича
            </p>
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

      <section className="bg-white py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">
              План валидации
            </h2>
            <p className="mt-2 text-gray-500">
              Какие события я бы завёл перед A/B-тестом
            </p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {ANALYTICS_EVENTS.map((item) => (
              <motion.div
                key={item.event}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="font-mono text-sm font-semibold text-brand-green">
                  {item.event}
                </p>
                <p className="mt-2 text-sm text-gray-600">{item.why}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-gray-100 bg-[#F5F5F5] p-6">
            <h3 className="font-bold text-gray-900">Guardrail metrics</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {GUARDRAILS.map((item) => (
                <div key={item.metric}>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">
              Что не запускать сразу
            </h2>
            <p className="mt-2 text-gray-500">
              Ограничения, которые я бы зафиксировал до полноценного релиза
            </p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {LAUNCH_RISKS.map((item) => (
              <motion.div
                key={item.item}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-bold text-gray-900">{item.item}</p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.reason}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">
              Сценарий бизнес-эффекта
            </h2>
            <p className="mt-2 text-gray-500">
              Не прогноз, а пример модели, которую я бы проверил на реальных
              данных
            </p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
            {BUSINESS_SCENARIO.map((item) => (
              <motion.div
                key={item.label}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
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

      <section className="bg-white py-16">
        <Container>
          <motion.h2
            {...sectionAnimation}
            className="text-2xl font-bold text-gray-900"
          >
            Что изменилось
          </motion.h2>
          <motion.div
            {...sectionAnimation}
            className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
          >
            <table className="w-full text-sm">
              <thead className="bg-[#F5F5F5]">
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

      <section className="bg-[#F5F5F5] py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">Метрики успеха</h2>
            <p className="mt-2 text-gray-500">
              Что должен улучшить этот редизайн — и как это измерить
            </p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.map((metric) => {
              const isDownMetric =
                metric.metric === "Bounce rate" ||
                metric.metric === "Звонки в колл-центр";
              const MetricIcon = isDownMetric ? TrendingDown : TrendingUp;

              return (
                <motion.div
                  key={metric.metric}
                  {...sectionAnimation}
                  className="rounded-lg bg-gradient-to-br from-green-50 to-white p-6 shadow-sm ring-1 ring-brand-green/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                      {metric.metric}
                    </p>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-green shadow-sm">
                      <MetricIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-end gap-3">
                    <span className="text-4xl leading-none font-extrabold text-brand-green">
                      {metric.target}
                    </span>
                    <span className="pb-1 text-sm font-semibold text-gray-400 line-through">
                      {metric.current}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {metric.how}
                  </p>
                  {metric.estimated ? (
                    <p className="mt-2 text-xs leading-5 text-gray-400 italic">
                      * Текущий показатель — оценочный, на основе анализа
                      воронки. Точные данные — после подключения GA4.
                    </p>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-gray-400">
            * Текущие показатели — оценочные, на основе визуального анализа
            воронки. Точные данные доступны после подключения аналитики.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-2xl font-bold text-gray-900">Что дальше</h2>
            <p className="mt-2 text-gray-500">Следующие шаги после запуска</p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {ROADMAP.map((roadmap) => (
              <motion.div
                key={roadmap.quarter}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
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

      <section className="bg-[#F5F5F5] py-12">
        <Container>
          <motion.div
            {...sectionAnimation}
            className="grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold text-gray-900">Стек</h3>
              <p className="mt-2 text-sm text-gray-500">
                Умею собирать прототипы самостоятельно — это ускоряет discovery
                и снижает стоимость экспериментов.
              </p>
              <ul className="mt-4 space-y-2">
                {STACK.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <ListOrdered className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold text-gray-900">Процесс</h3>
              <ul className="mt-4 space-y-2">
                {PROCESS.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <p className="mt-8 rounded-r-lg border-l-4 border-brand-green bg-gray-50 p-4 text-sm leading-6 text-gray-600 italic">
            В реальном проекте этот редизайн прошёл бы discovery-сессии с
            командой, согласование с compliance и поэтапный A/B-тест перед
            полным запуском. Прототип — это способ проверить направление, а не
            готовое решение.
          </p>
        </Container>
      </section>

      <section className="bg-brand-green py-20 text-center text-white">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-3xl font-extrabold">
              Покажу, как думаю — на вашем продукте
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">
              Этот редизайн — пример того, как я работаю: нахожу проблему,
              формулирую гипотезы, строю решение и измеряю результат. Готов
              прийти на встречу и рассказать подробнее.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:galoyandavid8@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-brand-green transition-colors hover:bg-gray-100"
              >
                <Mail className="h-4 w-4" />
                Написать письмо
              </a>
              <Link
                href="/"
                className="rounded-lg border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Открыть сайт
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/60">
              Давид Галоян · Москва · +79044049797
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
