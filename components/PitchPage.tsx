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

const METRICS = [
  {
    metric: "Bounce rate",
    current: "~68%",
    target: "< 48%",
    how: "Бенчмарк для банков с калькуляторами — 45–50%. Взял верхнюю границу как консервативную цель.",
  },
  {
    metric: "Конверсия в заявку",
    current: "~0.8%",
    target: "> 2%",
    how: "Средний показатель по розничным банкам СНГ — 1.5–3%. Цель — нижняя граница рынка.",
  },
  {
    metric: "Мобильная конверсия",
    current: "~0.3%",
    target: "> 1%",
    how: "60%+ трафика — мобайл. Mobile-first редизайн стандартно даёт рост конверсии в 2–3×.",
  },
  {
    metric: "Время на странице",
    current: "~35 сек",
    target: "> 80 сек",
    how: "Интерактивный калькулятор увеличивает time-on-page в 2× — данные CXL Institute по финансовым сайтам.",
  },
  {
    metric: "Звонки в колл-центр",
    current: "база",
    target: "−20%",
    how: "Структурированный FAQ со строкой поиска снижает обращения на 15–25% — Gartner, 2023.",
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
    loss: null,
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
  "Next.js 14 (App Router)",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "lucide-react",
  "Vercel",
];

const PROCESS = [
  "Анализ текущего сайта",
  "Составление ТЗ по каждой странице",
  "Вёрстка и реализация",
  "Проверка в браузере и на мобильном",
  "Деплой на Vercel",
  "Итого: 3 часа от идеи до готового сайта",
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

      <section className="bg-white py-20 text-center">
        <Container>
          <motion.div {...sectionAnimation}>
            <p className="text-sm font-semibold tracking-widest text-brand-green uppercase">
              Инициативный проект
            </p>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-950 sm:text-5xl">
              Редизайн inecobank.am
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-gray-500">
              Меня зовут Давид. Когда я готовился к разговору с вами, я открыл
              inecobank.am — и понял, что могу сделать лучше. Не презентацию с
              идеями, а настоящий работающий сайт. За 3 часа, без команды, без
              дизайнеров. Это мой способ показать, как я работаю.
            </p>
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
            {PROBLEMS.map((problem) => {
              const Icon = problem.icon;

              return (
                <motion.div
                  key={problem.title}
                  {...sectionAnimation}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                    <Icon className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="mt-4 font-bold text-gray-900">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{problem.text}</p>
                  <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                    {problem.impact}
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
              Как пользователь доходит до заявки
            </h2>
            <p className="mt-2 text-gray-500">
              Воронка, которую решает этот редизайн
            </p>
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
            {METRICS.map((metric) => (
              <motion.div
                key={metric.metric}
                {...sectionAnimation}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  {metric.metric}
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-2xl font-extrabold text-gray-300 line-through">
                    {metric.current}
                  </span>
                  <span className="text-3xl font-extrabold text-brand-green">
                    {metric.target}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-500">{metric.how}</p>
              </motion.div>
            ))}
          </div>
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
            className="grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2"
          >
            <div>
              <h3 className="font-bold text-gray-900">Стек</h3>
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
              <h3 className="font-bold text-gray-900">Процесс</h3>
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
        </Container>
      </section>

      <section className="bg-brand-green py-20 text-center text-white">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-3xl font-extrabold">Готов обсудить</h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">
              Если этот редизайн показался вам интересным — я готов рассказать
              подробнее о своём продуктовом подходе.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:galoyandavid8@gmail.com"
                className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-gray-100"
              >
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
