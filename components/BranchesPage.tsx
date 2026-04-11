"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type LocationType = "branch" | "atm";
type LocationFilter = "all" | LocationType;

interface Location {
  id: string;
  type: LocationType;
  name: string;
  city: string;
  address: string;
  hours: string;
  phone?: string;
  services: string[];
  atm24h: boolean;
}

const LOCATIONS: Location[] = [
  {
    id: "yerevan-head",
    type: "branch",
    name: "Головной офис",
    city: "Ереван",
    address: "ул. Абовяна, 6",
    hours: "Пн-Пт: 09:00-18:00, Сб: 10:00-15:00",
    phone: "+374 10 510 510",
    services: ["Кредиты", "Депозиты", "Ипотека", "Карты", "Переводы"],
    atm24h: true,
  },
  {
    id: "yerevan-malatia",
    type: "branch",
    name: "Отделение Малатия",
    city: "Ереван",
    address: "пр. Маштоца, 48",
    hours: "Пн-Пт: 09:00-18:00",
    phone: "+374 10 510 511",
    services: ["Кредиты", "Депозиты", "Карты"],
    atm24h: true,
  },
  {
    id: "yerevan-davtashen",
    type: "branch",
    name: "Отделение Давташен",
    city: "Ереван",
    address: "ул. Давташен 4-й кварт., 14",
    hours: "Пн-Пт: 09:30-17:30",
    phone: "+374 10 510 512",
    services: ["Кредиты", "Депозиты", "Карты"],
    atm24h: false,
  },
  {
    id: "yerevan-erebuni",
    type: "branch",
    name: "Отделение Эребуни",
    city: "Ереван",
    address: "ул. Тигранашена, 7",
    hours: "Пн-Пт: 09:00-18:00, Сб: 10:00-14:00",
    phone: "+374 10 510 513",
    services: ["Кредиты", "Депозиты", "Карты", "Переводы"],
    atm24h: true,
  },
  {
    id: "yerevan-nor-nork",
    type: "branch",
    name: "Отделение Нор-Норк",
    city: "Ереван",
    address: "пр. Азатутян, 22",
    hours: "Пн-Пт: 09:00-17:30",
    phone: "+374 10 510 514",
    services: ["Кредиты", "Карты"],
    atm24h: false,
  },
  {
    id: "yerevan-atm-rossia",
    type: "atm",
    name: "Банкомат ТЦ «Россия»",
    city: "Ереван",
    address: "ул. Абовяна, 22, ТЦ «Россия», 1-й этаж",
    hours: "07:00-23:00",
    services: ["Снятие AMD", "Снятие USD", "Пополнение"],
    atm24h: false,
  },
  {
    id: "yerevan-atm-dalma",
    type: "atm",
    name: "Банкомат Dalma Garden Mall",
    city: "Ереван",
    address: "ул. Аргавандского шоссе, 1, Dalma Garden Mall",
    hours: "Круглосуточно",
    services: ["Снятие AMD", "Снятие USD"],
    atm24h: true,
  },
  {
    id: "yerevan-atm-yerevan-mall",
    type: "atm",
    name: "Банкомат Yerevan Mall",
    city: "Ереван",
    address: "пр. Тиграна Меца, 57, Yerevan Mall, 1-й этаж",
    hours: "Круглосуточно",
    services: ["Снятие AMD", "Снятие USD", "Пополнение"],
    atm24h: true,
  },
  {
    id: "yerevan-atm-republic",
    type: "atm",
    name: "Банкомат пл. Республики",
    city: "Ереван",
    address: "пл. Республики, у здания Министерства финансов",
    hours: "Круглосуточно",
    services: ["Снятие AMD", "Снятие USD"],
    atm24h: true,
  },
  {
    id: "gyumri-branch",
    type: "branch",
    name: "Отделение Гюмри",
    city: "Гюмри",
    address: "ул. Вардананца, 38",
    hours: "Пн-Пт: 09:00-17:30",
    phone: "+374 312 510 10",
    services: ["Кредиты", "Депозиты", "Карты", "Переводы"],
    atm24h: true,
  },
  {
    id: "gyumri-atm",
    type: "atm",
    name: "Банкомат Гюмри",
    city: "Гюмри",
    address: "ул. Шираза, 4",
    hours: "Круглосуточно",
    services: ["Снятие AMD", "Снятие USD"],
    atm24h: true,
  },
  {
    id: "vanadzor-branch",
    type: "branch",
    name: "Отделение Ванадзор",
    city: "Ванадзор",
    address: "пр. Тиграна Меца, 38",
    hours: "Пн-Пт: 09:00-17:00",
    phone: "+374 322 510 10",
    services: ["Кредиты", "Депозиты", "Карты"],
    atm24h: false,
  },
  {
    id: "vanadzor-atm",
    type: "atm",
    name: "Банкомат Ванадзор",
    city: "Ванадзор",
    address: "ул. Мясникяна, 15",
    hours: "08:00-22:00",
    services: ["Снятие AMD"],
    atm24h: false,
  },
  {
    id: "abovyan-branch",
    type: "branch",
    name: "Отделение Абовян",
    city: "Другие",
    address: "г. Абовян, ул. Горцаранаин, 5",
    hours: "Пн-Пт: 09:00-17:00",
    phone: "+374 222 510 10",
    services: ["Кредиты", "Карты"],
    atm24h: false,
  },
  {
    id: "hrazdan-atm",
    type: "atm",
    name: "Банкомат Раздан",
    city: "Другие",
    address: "г. Раздан, пл. Нжде, 1",
    hours: "Круглосуточно",
    services: ["Снятие AMD"],
    atm24h: true,
  },
];

const typeFilters: { label: string; value: LocationFilter }[] = [
  { label: "Все", value: "all" },
  { label: "Отделения", value: "branch" },
  { label: "Банкоматы", value: "atm" },
];

const cityFilters = ["Все города", "Ереван", "Гюмри", "Ванадзор", "Другие"];

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

function LocationCard({ location }: { location: Location }) {
  const isBranch = location.type === "branch";
  const routeUrl = `https://yandex.com/maps/?text=${encodeURIComponent(
    `${location.address} ${location.city}`,
  )}`;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {isBranch ? (
            <Building2 className="h-5 w-5 shrink-0 text-brand-green" />
          ) : (
            <Landmark className="h-5 w-5 shrink-0 text-brand-green" />
          )}
          <h2 className="text-base font-bold text-gray-950">
            {location.name}
          </h2>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isBranch ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
          }`}
        >
          {isBranch ? "Отделение" : "Банкомат"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        {location.address}
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {isBranch ? (
          <>
            <p>
              <span className="font-semibold text-gray-900">Часы:</span>{" "}
              {location.hours}
            </p>
            {location.phone ? (
              <p>
                <span className="font-semibold text-gray-900">Тел.:</span>{" "}
                {location.phone}
              </p>
            ) : null}
          </>
        ) : (
          <p>{location.hours}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {location.services.map((service) => (
          <span
            key={service}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
          >
            {service}
          </span>
        ))}
        {location.atm24h ? (
          <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-xs font-semibold text-brand-green">
            Банкомат 24/7
          </span>
        ) : null}
      </div>

      <a
        href={routeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-green transition-colors hover:text-brand-green-light"
      >
        Проложить маршрут <span aria-hidden="true">↗</span>
      </a>
    </motion.article>
  );
}

export function BranchesPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<LocationFilter>("all");
  const [activeCity, setActiveCity] = useState("all");

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return LOCATIONS.filter((location) => {
      const matchType = activeType === "all" || location.type === activeType;
      const matchCity = activeCity === "all" || location.city === activeCity;
      const matchSearch =
        !normalizedQuery ||
        location.name.toLowerCase().includes(normalizedQuery) ||
        location.address.toLowerCase().includes(normalizedQuery);

      return matchType && matchCity && matchSearch;
    });
  }, [activeCity, activeType, query]);

  return (
    <>
      <motion.section className="bg-white pt-24 pb-12" {...sectionMotion}>
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-[26px] font-bold leading-tight text-gray-950 sm:text-4xl">
              Отделения и банкоматы
            </h1>
            <p className="mt-3 text-base text-gray-500">
              78 точек обслуживания по всей Армении
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
              <span>
                <strong className="font-semibold text-gray-900">15</strong>{" "}
                отделений
              </span>
              <span>
                <strong className="font-semibold text-gray-900">63</strong>{" "}
                банкомата
              </span>
              <span>
                <strong className="font-semibold text-gray-900">24/7</strong> в
                крупных ТЦ
              </span>
            </div>
          </div>
        </Container>
      </motion.section>

      <motion.section className="bg-[#F5F5F5] py-10" {...sectionMotion}>
        <Container>
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Улица, район или название ТЦ"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-sm focus:ring-2 focus:ring-brand-green/30 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {typeFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeType === filter.value
                    ? "bg-brand-green text-white"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-brand-green/40"
                }`}
                onClick={() => setActiveType(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {cityFilters.map((city) => {
              const value = city === "Все города" ? "all" : city;

              return (
                <button
                  key={city}
                  type="button"
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeCity === value
                      ? "bg-brand-green text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-brand-green/40"
                  }`}
                  onClick={() => setActiveCity(value)}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </Container>
      </motion.section>

      <motion.section className="bg-[#F5F5F5] pb-16" {...sectionMotion}>
        <Container>
          {filteredLocations.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-gray-400">
              Ничего не найдено — попробуйте изменить фильтры
            </div>
          )}
        </Container>
      </motion.section>

      <motion.section className="bg-[#0A7C3E] py-12 text-white" {...sectionMotion}>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Не нашли отделение рядом?
            </h2>
            <p className="mt-3 text-base text-white/80">
              Большинство услуг доступны онлайн — без похода в банк
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="/deposits"
                className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-white/90"
              >
                Открыть счёт онлайн
              </a>
              <a
                href="tel:+37410510510"
                className="rounded-lg border border-white px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Позвонить в банк
              </a>
            </div>
          </div>
        </Container>
      </motion.section>
    </>
  );
}
