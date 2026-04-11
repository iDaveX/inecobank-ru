"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type FaqCategory = "all" | "cards" | "loans" | "deposits" | "mortgage" | "general";

type FaqItem = {
  id: string;
  category: Exclude<FaqCategory, "all">;
  question: string;
  answer: string;
};

const categories: { label: string; value: FaqCategory }[] = [
  { label: "Все", value: "all" },
  { label: "Карты", value: "cards" },
  { label: "Кредиты", value: "loans" },
  { label: "Депозиты", value: "deposits" },
  { label: "Ипотека", value: "mortgage" },
  { label: "Общие", value: "general" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "cards-1",
    category: "cards",
    question: "Как заказать карту онлайн?",
    answer:
      "Откройте раздел «Карты» на сайте или в мобильном приложении InecoBank, выберите нужную карту и нажмите «Оформить карту». Заполните заявку — займёт около 5 минут. Карту выпустим и отправим на ваш адрес в течение 3–5 рабочих дней.",
  },
  {
    id: "cards-2",
    category: "cards",
    question: "Можно ли пользоваться картой за границей?",
    answer:
      "Да. Карты Visa и Mastercard принимаются в 190+ странах. Комиссия за конвертацию — 1.5% от суммы операции. Перед поездкой рекомендуем уведомить банк через приложение — так транзакции не заблокируются.",
  },
  {
    id: "cards-3",
    category: "cards",
    question: "Как заблокировать карту, если потерял её?",
    answer:
      "Заблокируйте карту в мобильном приложении: «Карты» → выберите карту → «Заблокировать». Или позвоните на горячую линию +374 10 510 510 — работает круглосуточно. Перевыпуск занимает 3–5 рабочих дней.",
  },
  {
    id: "cards-4",
    category: "cards",
    question: "Что такое кешбэк и как он начисляется?",
    answer:
      "Кешбэк — процент от суммы покупки, который возвращается на карту. Начисляется раз в месяц — в первый рабочий день следующего месяца. Снятие наличных и переводы в расчёт не входят.",
  },
  {
    id: "loans-1",
    category: "loans",
    question: "Какие документы нужны для потребительского кредита?",
    answer:
      "Для кредита до 2 000 000 AMD достаточно паспорта. Для большей суммы дополнительно потребуется справка о доходах за последние 3 месяца. Всё подаётся онлайн — оригиналы не нужны.",
  },
  {
    id: "loans-2",
    category: "loans",
    question: "Как быстро принимается решение по кредиту?",
    answer:
      "По кредиту 1CLICK — за 60 секунд в мобильном приложении. По потребительскому кредиту — в течение часа в рабочее время. Если заявка подана после 18:00 — ответ придёт утром следующего дня.",
  },
  {
    id: "loans-3",
    category: "loans",
    question: "Можно ли досрочно погасить кредит?",
    answer:
      "Да, в любой момент и без штрафов. Частичное или полное досрочное погашение — через мобильное приложение или в отделении. При частичном погашении можно уменьшить ежемесячный платёж или сократить срок.",
  },
  {
    id: "loans-4",
    category: "loans",
    question: "Что такое эффективная процентная ставка?",
    answer:
      "Эффективная ставка (ԷՏԿ) учитывает не только годовой процент, но и все комиссии — за оформление, страховку, обслуживание счёта. По армянскому законодательству банк обязан сообщить эту ставку до подписания договора.",
  },
  {
    id: "deposits-1",
    category: "deposits",
    question: "Застрахованы ли вклады в InecoBank?",
    answer:
      "Да. Вклады застрахованы государством через Фонд гарантирования вкладов Армении. Максимальная сумма возмещения — 16 000 000 AMD на одного вкладчика в одном банке.",
  },
  {
    id: "deposits-2",
    category: "deposits",
    question: "Могу ли я пополнять вклад после открытия?",
    answer:
      "Это зависит от типа вклада. Классический и Онлайн-вклад — без пополнения. Накопительный — пополняйте в любое время. Условия фиксируются в договоре.",
  },
  {
    id: "deposits-3",
    category: "deposits",
    question: "Что будет, если закрыть вклад досрочно?",
    answer:
      "При закрытии в первые 3 месяца проценты не начисляются — вы получите только основную сумму. После 3 месяцев — пересчитаем по ставке «до востребования» (обычно 0.1%). Подробные условия — в договоре.",
  },
  {
    id: "mortgage-1",
    category: "mortgage",
    question: "Можно ли купить вторичное жильё в ипотеку?",
    answer:
      "Да, по стандартной ипотечной программе — и новостройки, и вторичный рынок. Льготная программа с государственным субсидированием доступна только для первичного рынка.",
  },
  {
    id: "mortgage-2",
    category: "mortgage",
    question: "Кто может получить льготную ипотеку?",
    answer:
      "Семьи, в которых есть хотя бы один ребёнок до 18 лет, и заёмщик является гражданином Республики Армения. Объект — новостройка на первичном рынке. Лимит суммы — до 55 000 000 AMD.",
  },
  {
    id: "mortgage-3",
    category: "mortgage",
    question: "Кто оплачивает оценку недвижимости?",
    answer:
      "InecoBank организует и оплачивает оценку за свой счёт. Вам не нужно самостоятельно искать оценщика — банк работает с аккредитованными компаниями.",
  },
  {
    id: "general-1",
    category: "general",
    question: "Как открыть счёт в InecoBank?",
    answer:
      "Счёт открывается онлайн через мобильное приложение за 5 минут — нужен только паспорт. Или в любом отделении — список адресов на странице «Отделения».",
  },
  {
    id: "general-2",
    category: "general",
    question: "Как связаться с поддержкой?",
    answer:
      "Телефон: +374 10 510 510 — круглосуточно. Чат в мобильном приложении — ответ в течение 5 минут в рабочее время. Email: info@inecobank.am — ответим в течение 1 рабочего дня.",
  },
  {
    id: "general-3",
    category: "general",
    question: "Работает ли мобильное приложение за пределами Армении?",
    answer:
      "Да, приложение работает по всему миру. Вы можете управлять счётами, переводить деньги и контролировать карты из любой точки — нужен только интернет.",
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

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
      >
        <span className="text-sm font-medium text-gray-900">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-green transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`faq-panel-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const filteredItems = useMemo(
    () =>
      FAQ_ITEMS.filter(
        (item) => activeCategory === "all" || item.category === activeCategory,
      ),
    [activeCategory],
  );

  const selectCategory = (category: FaqCategory) => {
    setActiveCategory(category);
    setOpenQuestionId(null);
  };

  return (
    <>
      <section className="bg-white pb-12 pt-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-[26px] font-extrabold text-gray-950 sm:text-4xl">
              Вопросы и ответы
            </h1>
            <p className="mt-3 text-base text-gray-500">
              Здесь собрано всё, что спрашивают чаще всего
            </p>
          </div>
        </Container>
      </section>

      <motion.section className="bg-surface py-16" {...sectionMotion}>
        <Container>
          <div className="mx-auto mb-8 flex max-w-3xl flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => selectCategory(category.value)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-green text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-brand-green"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {filteredItems.map((item) => (
                  <FaqAccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openQuestionId === item.id}
                    onToggle={() =>
                      setOpenQuestionId((current) =>
                        current === item.id ? null : item.id,
                      )
                    }
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </motion.section>

      <section className="bg-brand-green py-12 text-center text-white">
        <Container>
          <h2 className="text-3xl font-bold">Не нашли ответ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Позвоните — ответим на любой вопрос за 5 минут
          </p>
          <a
            href="tel:+37410510510"
            className="mt-8 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-white/90"
          >
            Позвонить в банк
          </a>
        </Container>
      </section>
    </>
  );
}
