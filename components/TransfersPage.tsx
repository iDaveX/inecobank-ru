"use client";

import { motion } from "framer-motion";
import { Banknote, Clock, Globe, Smartphone, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";

type TransferTab = "internal" | "domestic" | "international";

type Feature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
};

const TABS: { id: TransferTab; label: string }[] = [
  { id: "internal", label: "Внутри INECOBANK" },
  { id: "domestic", label: "По Армении" },
  { id: "international", label: "За рубеж" },
];

const INTERNAL_FEATURES: Feature[] = [
  { icon: Zap, title: "Мгновенно", text: "Деньги поступают секунды" },
  {
    icon: Banknote,
    title: "Бесплатно",
    text: "0% комиссии между счетами INECOBANK",
  },
  {
    icon: Smartphone,
    title: "В приложении",
    text: "Перевод по номеру телефона или карты",
  },
  {
    icon: Clock,
    title: "Круглосуточно",
    text: "Без ограничений по времени",
  },
];

const DOMESTIC_RATES = [
  {
    method: "На счёт другого банка (AMD)",
    fee: "0.1%, мин. 100 AMD",
    speed: "1 рабочий день",
  },
  {
    method: "На счёт другого банка (USD/EUR)",
    fee: "0.15%, мин. 500 AMD",
    speed: "1-2 рабочих дня",
  },
  {
    method: "Межбанковский перевод ArCa",
    fee: "0.1%, мин. 200 AMD",
    speed: "Мгновенно",
  },
  {
    method: "Через банкомат INECOBANK",
    fee: "Бесплатно",
    speed: "Мгновенно",
  },
];

const SWIFT_INFO = [
  { label: "Комиссия", value: "0.2%, мин. $10" },
  { label: "Срок", value: "1-3 рабочих дня" },
  { label: "Валюты", value: "USD, EUR, RUB, GBP и другие" },
  { label: "Лимит", value: "До $50 000 в день" },
];

const TRANSFER_SYSTEMS = [
  { name: "Western Union", regions: "200+ стран", fee: "от 1%", icon: Globe },
  { name: "MoneyGram", regions: "200+ стран", fee: "от 1.5%", icon: Globe },
  { name: "Anelik", regions: "СНГ и Европа", fee: "от 0.5%", icon: Globe },
  { name: "Contact", regions: "Россия, СНГ", fee: "от 0.8%", icon: Globe },
];

const STEPS = [
  {
    step: "1",
    title: "Войдите в приложение",
    text: "Мобильное приложение INECO или интернет-банк",
  },
  {
    step: "2",
    title: "Выберите тип перевода",
    text: "Внутри банка, по Армении или за рубеж",
  },
  {
    step: "3",
    title: "Введите реквизиты",
    text: "Номер карты, счёт или телефон получателя",
  },
  {
    step: "4",
    title: "Подтвердите SMS-кодом",
    text: "Двухфакторная защита каждой операции",
  },
];

const sectionAnimation = {
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

function InternalTransfers() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {INTERNAL_FEATURES.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10">
              <Icon className="h-5 w-5 text-brand-green" />
            </div>
            <h3 className="mt-3 font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{feature.text}</p>
          </div>
        );
      })}
    </div>
  );
}

function DomesticTransfers() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Способ
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Комиссия
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Срок
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {DOMESTIC_RATES.map((row) => (
            <tr
              key={row.method}
              className="transition-colors hover:bg-brand-green/5"
            >
              <td className="px-4 py-3 text-gray-800">{row.method}</td>
              <td className="px-4 py-3 font-medium text-brand-green">
                {row.fee}
              </td>
              <td className="px-4 py-3 text-gray-500">{row.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function InternationalTransfers() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">SWIFT-переводы</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SWIFT_INFO.map((item) => (
            <div key={item.label} className="border-b border-gray-100 pb-3">
              <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                {item.label}
              </p>
              <p className="mt-1 font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TRANSFER_SYSTEMS.map((system) => {
          const Icon = system.icon;

          return (
            <div
              key={system.name}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{system.name}</h3>
                <Icon className="h-5 w-5 text-brand-green" />
              </div>
              <div className="mt-3 space-y-1 text-sm text-gray-500">
                <p>{system.regions}</p>
                <p className="font-medium text-brand-green">
                  Комиссия {system.fee}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TransfersPage() {
  const [activeTab, setActiveTab] = useState<TransferTab>("internal");

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "internal" || hash === "domestic" || hash === "international") {
        setActiveTab(hash as TransferTab);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <Container>
          <motion.div {...sectionAnimation} className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-brand-green uppercase">
              Переводы
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-950 sm:text-5xl">
              Деньги туда,
              <br />
              куда нужно
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-500">
              Переводы внутри банка, по Армении и за рубеж — быстро,
              безопасно, с прозрачными тарифами.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white pb-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-green text-white"
                      : "bg-white text-gray-600 hover:bg-brand-green/10"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              {activeTab === "internal" ? <InternalTransfers /> : null}
              {activeTab === "domestic" ? <DomesticTransfers /> : null}
              {activeTab === "international" ? <InternationalTransfers /> : null}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <motion.div {...sectionAnimation}>
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Как сделать перевод
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{step.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-brand-green py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-white">
          <motion.div {...sectionAnimation}>
            <h2 className="text-3xl font-extrabold">Сделайте первый перевод</h2>
            <p className="mt-4 text-white/90">
              Откройте счёт и получите 3 месяца бесплатных переводов
            </p>
            <a
              href="#"
              className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-gray-100"
            >
              Открыть счёт
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
