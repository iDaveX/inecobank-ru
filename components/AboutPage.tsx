"use client";

import { motion } from "framer-motion";
import { Shield, Smartphone, TrendingUp, Users } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useToast } from "@/components/Toast";

type Stat = {
  value: string;
  label: string;
};

type TimelineItem = {
  year: string;
  text: string;
};

type ValueItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
};

const STATS: Stat[] = [
  { value: "1996", label: "Год основания" },
  { value: "500 000+", label: "Клиентов" },
  { value: "80+", label: "Отделений и банкоматов" },
  { value: "28+", label: "Лет на рынке" },
];

const TIMELINE: TimelineItem[] = [
  {
    year: "1996",
    text: "Основание банка в Ереване. Получение лицензии Центрального банка Армении.",
  },
  {
    year: "2003",
    text: "Выход в регионы. Открытие первых филиалов за пределами столицы.",
  },
  {
    year: "2010",
    text: "Запуск интернет-банкинга. Более 100 000 активных клиентов.",
  },
  {
    year: "2016",
    text: "Запуск мобильного приложения INECO. Рейтинг Fitch: BB-.",
  },
  {
    year: "2020",
    text: "Цифровая трансформация: онлайн-заявки на все продукты.",
  },
  {
    year: "2023",
    text: "Банк года по версии Global Finance. 500 000+ клиентов.",
  },
];

const VALUES: ValueItem[] = [
  {
    icon: Shield,
    title: "Надёжность",
    text: "Работаем под надзором ЦБ Армении. Рейтинг надёжности Fitch BB-.",
  },
  {
    icon: Users,
    title: "Клиент в центре",
    text: "Каждое решение принимается с учётом интересов клиента.",
  },
  {
    icon: TrendingUp,
    title: "Развитие",
    text: "Постоянно улучшаем продукты и цифровые каналы.",
  },
  {
    icon: Smartphone,
    title: "Технологии",
    text: "Мобильное приложение, онлайн-банкинг и цифровые карты.",
  },
];

const regulatoryItems = [
  "Лицензия Центрального банка Республики Армения №0002",
  "Участник Фонда гарантирования вкладов физических лиц",
  "Кредитный рейтинг Fitch Ratings: BB- (стабильный)",
  "Юридический адрес: г. Ереван, ул. Абовяна 6",
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

export function AboutPage() {
  const { showToast } = useToast();

  return (
    <>
      <section className="bg-white pt-28 pb-16">
        <Container>
          <motion.div {...sectionAnimation} className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-brand-green uppercase">
              О банке
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-950 sm:text-5xl">
              Более 28 лет
              <br />
              рядом с вами
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-500">
              INECOBANK — один из ведущих коммерческих банков Армении. С 1996
              года мы помогаем частным лицам и бизнесу достигать финансовых
              целей.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <motion.div
            {...sectionAnimation}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <p className="text-4xl font-extrabold text-brand-green">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <motion.h2
            {...sectionAnimation}
            className="text-2xl font-bold text-gray-900"
          >
            История
          </motion.h2>
          <div className="relative mt-8 ml-4 space-y-10 border-l-2 border-brand-green/20 pl-8">
            {TIMELINE.map((item) => (
              <motion.div
                key={item.year}
                {...sectionAnimation}
                className="relative"
              >
                <span className="absolute top-1 -left-[2.6rem] h-4 w-4 rounded-full border-2 border-brand-green bg-white" />
                <p className="text-sm font-bold text-brand-green">
                  {item.year}
                </p>
                <p className="mt-1 text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <motion.div
            {...sectionAnimation}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VALUES.map((value) => {
              const Icon = value.icon;

              return (
                <div key={value.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10">
                    <Icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="mt-4 font-bold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {value.text}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <motion.div
            {...sectionAnimation}
            className="max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <h3 className="font-bold text-gray-900">
              Регуляторная информация
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              {regulatoryItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </section>

      <section className="bg-brand-green py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.div {...sectionAnimation}>
            <h2 className="text-3xl font-extrabold text-white">
              Станьте клиентом INECOBANK
            </h2>
            <p className="mt-4 text-white/90">
              Откройте счёт онлайн за 5 минут
            </p>
            <button
              type="button"
              onClick={() =>
                showToast(
                  "Заявка на открытие счёта принята. Менеджер свяжется с вами.",
                )
              }
              className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-green transition-colors hover:bg-gray-100"
            >
              Открыть счёт
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
