"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X as XIcon } from "lucide-react";
import { useMemo, useState } from "react";

type CardType = "visa" | "mastercard" | "arca";
type FilterType = "all" | CardType;

type BankCard = {
  id: string;
  type: CardType;
  name: string;
  tagline: string;
  color: string;
  annualFee: string;
  cashback: string;
  limit: string;
  features: string[];
  badge: string | null;
};

const CARDS: BankCard[] = [
  {
    id: "visa-classic",
    type: "visa",
    name: "Visa Classic",
    tagline: "Без лишних условий — просто платите везде, где принимают Visa",
    color: "#0A7C3E",
    annualFee: "Бесплатно в первый год, затем 3 000 AMD",
    cashback: "Нет",
    limit: "до 5 000 000 AMD",
    features: [
      "Бесконтактная оплата",
      "3D Secure",
      "SMS-уведомления",
      "Управление через интернет-банк",
    ],
    badge: null,
  },
  {
    id: "visa-gold",
    type: "visa",
    name: "Visa Gold",
    tagline: "Кешбэк на всё, страховка в поездках и живая поддержка",
    color: "#B8860B",
    annualFee: "8 000 AMD/год",
    cashback: "1.5% на все покупки",
    limit: "до 15 000 000 AMD",
    features: [
      "Кешбэк 1.5% на все покупки",
      "Страховка при выезде за рубеж",
      "Приоритетная линия поддержки",
      "Консьерж-сервис",
    ],
    badge: "Популярная",
  },
  {
    id: "visa-platinum",
    type: "visa",
    name: "Visa Platinum",
    tagline: "Для тех, кто не хочет думать о лимитах и очередях в аэропорту",
    color: "#1A1A2E",
    annualFee: "24 000 AMD/год",
    cashback: "2% на все покупки",
    limit: "до 50 000 000 AMD",
    features: [
      "Кешбэк 2% на все покупки",
      "Доступ в бизнес-залы аэропортов",
      "Расширенная страховая программа",
      "Персональный менеджер",
    ],
    badge: "Premium",
  },
  {
    id: "mastercard-standard",
    type: "mastercard",
    name: "Mastercard Standard",
    tagline: "Принимается везде — в магазинах, онлайн и за границей",
    color: "#CC0000",
    annualFee: "Бесплатно",
    cashback: "Нет",
    limit: "до 5 000 000 AMD",
    features: [
      "Бесконтактная оплата PayPass",
      "3D Secure для онлайн-покупок",
      "Управление картой в приложении",
      "Мгновенные уведомления",
    ],
    badge: null,
  },
  {
    id: "mastercard-world",
    type: "mastercard",
    name: "Mastercard World",
    tagline: "Больше кешбэка там, где вы тратите в поездках",
    color: "#E65100",
    annualFee: "12 000 AMD/год",
    cashback: "1% везде, 3% в путешествиях",
    limit: "до 20 000 000 AMD",
    features: [
      "Кешбэк 3% на авиа, отели и аренду авто",
      "Страховая программа Mastercard",
      "Скидки у партнёров по всему миру",
      "Поддержка 24/7 на русском языке",
    ],
    badge: "Для путешествий",
  },
  {
    id: "arca-classic",
    type: "arca",
    name: "ArCa Classic",
    tagline: "Карта армянской системы — без комиссий внутри страны",
    color: "#8B5CF6",
    annualFee: "1 500 AMD/год",
    cashback: "Нет",
    limit: "до 3 000 000 AMD",
    features: [
      "Оплата во всех терминалах Армении",
      "Снятие наличных в банкоматах InecoBank бесплатно",
      "Без комиссии за операции в AMD",
      "Удобна для госуслуг и ЖКУ",
    ],
    badge: null,
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "Все карты", value: "all" },
  { label: "Visa", value: "visa" },
  { label: "Mastercard", value: "mastercard" },
  { label: "ArCa", value: "arca" },
];

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function MiniCard({
  label,
  color,
  className,
  delay,
}: {
  label: string;
  color: string;
  className: string;
  delay: number;
}) {
  return (
    <div className={`absolute w-56 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay }}
        className="aspect-[1.58] rounded-lg p-4 text-xs font-bold tracking-[0.16em] text-white shadow-xl"
        style={{ backgroundColor: color }}
      >
        <div className="flex h-full flex-col justify-between">
          <span>{label}</span>
          <span>INECOBANK</span>
        </div>
      </motion.div>
    </div>
  );
}

function ProductCard({
  card,
  onAddToCompare,
}: {
  card: BankCard;
  onAddToCompare: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="h-2" style={{ backgroundColor: card.color }} />
      <div className="px-5 pt-4">
        <div
          className="mx-auto mb-2 aspect-[1.58] w-36 rounded-md p-4 text-xs font-bold text-white shadow-md"
          style={{ backgroundColor: card.color }}
        >
          <div className="flex h-full flex-col justify-between">
            <span>{card.name}</span>
            <span>INECOBANK</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        {card.badge ? (
          <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-xs font-bold text-brand-green">
            {card.badge}
          </span>
        ) : null}
        <h3 className="mt-3 text-lg font-bold text-gray-950">{card.name}</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">{card.tagline}</p>
        <hr className="my-4 border-gray-100" />

        <div className="space-y-2 text-sm text-gray-700">
          <InfoRow text={`Стоимость: ${card.annualFee}`} />
          <InfoRow
            text={`Кешбэк: ${card.cashback}`}
            muted={card.cashback === "Нет"}
          />
          <InfoRow text={`Лимит: ${card.limit}`} />
        </div>

        <div className="mt-3 space-y-2">
          {card.features.map((feature) => (
            <InfoRow key={feature} text={feature} small />
          ))}
        </div>

        <a
          href="#"
          className="mt-5 block w-full rounded-lg bg-brand-green py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
        >
          Оформить карту
        </a>
        <button
          type="button"
          onClick={() => onAddToCompare(card.id)}
          className="mt-2 block w-full text-center text-xs font-semibold text-brand-green underline underline-offset-2"
        >
          Добавить к сравнению
        </button>
      </div>
    </motion.div>
  );
}

function InfoRow({
  text,
  muted = false,
  small = false,
}: {
  text: string;
  muted?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-2 ${small ? "text-[13px]" : "text-sm"} ${
        muted ? "text-gray-400" : "text-gray-700"
      }`}
    >
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
      <span>{text}</span>
    </div>
  );
}

export function CardsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareMessage, setCompareMessage] = useState("");

  const filteredCards = useMemo(
    () =>
      activeFilter === "all"
        ? CARDS
        : CARDS.filter((card) => card.type === activeFilter),
    [activeFilter],
  );

  const selectedCards = useMemo(
    () => compareList.map((id) => CARDS.find((card) => card.id === id)!),
    [compareList],
  );

  const addToCompare = (id: string) => {
    setCompareMessage("");

    if (compareList.includes(id)) {
      return;
    }

    if (compareList.length >= 3) {
      setCompareMessage("Можно сравнивать до 3 карт");
      return;
    }

    setCompareList((current) => [...current, id]);
  };

  const removeFromCompare = (id: string) => {
    setCompareMessage("");
    setCompareList((current) => current.filter((cardId) => cardId !== id));
  };

  return (
    <>
      <section className="bg-white pb-12 pt-24">
        <Container>
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-extrabold text-gray-950 sm:text-4xl lg:text-[40px]">
                Банковские карты
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
                Visa, Mastercard и ArCa — для покупок в Армении и по всему миру
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#"
                  className="rounded-lg bg-brand-green px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                >
                  Открыть карту онлайн
                </a>
                <a
                  href="#compare"
                  className="rounded-lg border border-brand-green px-6 py-3 text-center text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                >
                  Сравнить карты
                </a>
              </div>
            </div>

            <div className="relative h-72 w-full lg:w-1/2">
              <MiniCard
                label="VISA CLASSIC"
                color="#0A7C3E"
                className="left-1/2 top-8 z-10 -translate-x-[70%] -rotate-[8deg]"
                delay={0}
              />
              <MiniCard
                label="MASTERCARD"
                color="#1A1A2E"
                className="left-1/2 top-16 z-20 -translate-x-1/2 -rotate-[2deg]"
                delay={0.15}
              />
              <MiniCard
                label="ArCa"
                color="#8B5CF6"
                className="left-1/2 top-24 z-30 -translate-x-[30%] rotate-[4deg]"
                delay={0.3}
              />
            </div>
          </div>
        </Container>
      </section>

      <motion.section className="bg-surface py-16" {...sectionMotion}>
        <Container>
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-green text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-brand-green"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredCards.map((card) => (
                <ProductCard
                  key={card.id}
                  card={card}
                  onAddToCompare={addToCompare}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </motion.section>

      <motion.section id="compare" className="bg-white py-16" {...sectionMotion}>
        <Container>
          <h2 className="text-3xl font-bold text-gray-950">Сравнение карт</h2>
          {compareMessage ? (
            <p className="mt-3 text-sm font-semibold text-brand-green">
              {compareMessage}
            </p>
          ) : null}

          {selectedCards.length === 0 ? (
            <div className="mt-8 rounded-xl bg-gray-50 px-6 py-14 text-center">
              <p className="text-lg font-semibold text-gray-800">
                Выберите карты для сравнения
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Нажмите «Добавить к сравнению» на карточках выше
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => removeFromCompare(card.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:border-brand-green hover:text-brand-green"
                  >
                    {card.name}
                    <XIcon className="h-4 w-4" />
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full min-w-[48rem] border-collapse bg-white">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Параметр
                      </th>
                      {selectedCards.map((card) => (
                        <th
                          key={card.id}
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                        >
                          <div
                            className="mb-3 aspect-[1.58] w-28 rounded-md p-3 text-xs font-bold text-white"
                            style={{ backgroundColor: card.color }}
                          >
                            {card.name}
                          </div>
                          {card.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <ComparisonRow
                      label="Стоимость"
                      cards={selectedCards}
                      getValue={(card) => card.annualFee}
                    />
                    <ComparisonRow
                      label="Кешбэк"
                      cards={selectedCards}
                      getValue={(card) => card.cashback}
                    />
                    <ComparisonRow
                      label="Лимит"
                      cards={selectedCards}
                      getValue={(card) => card.limit}
                    />
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Возможности
                      </td>
                      {selectedCards.map((card) => (
                        <td
                          key={card.id}
                          className="px-6 py-4 text-sm text-gray-700"
                        >
                          <ul className="space-y-2">
                            {card.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                        —
                      </td>
                      {selectedCards.map((card) => (
                        <td key={card.id} className="px-6 py-4">
                          <a
                            href="#"
                            className="inline-flex rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                          >
                            Оформить
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCompareMessage("");
                  setCompareList([]);
                }}
                className="mt-5 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-500"
              >
                Очистить сравнение
              </button>
            </div>
          )}
        </Container>
      </motion.section>

      <motion.section
        className="bg-brand-green py-12 text-center text-white"
        {...sectionMotion}
      >
        <Container>
          <h2 className="text-3xl font-bold">Не определились с картой?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Позвоните нам или приходите в отделение — поможем выбрать за 10
            минут
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

function ComparisonRow({
  label,
  cards,
  getValue,
}: {
  label: string;
  cards: BankCard[];
  getValue: (card: BankCard) => string;
}) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-semibold text-gray-600">{label}</td>
      {cards.map((card) => (
        <td key={card.id} className="px-6 py-4 text-sm text-gray-700">
          {getValue(card)}
        </td>
      ))}
    </tr>
  );
}
