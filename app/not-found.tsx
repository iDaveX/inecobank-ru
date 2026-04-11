import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  HelpCircle,
  Home,
  MapPin,
  PiggyBank,
  Wallet,
} from "lucide-react";
import type { ComponentType } from "react";

type QuickLink = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const quickLinks: QuickLink[] = [
  { href: "/cards", label: "Карты", icon: CreditCard },
  { href: "/loans", label: "Кредиты", icon: Wallet },
  { href: "/deposits", label: "Депозиты", icon: PiggyBank },
  { href: "/mortgage", label: "Ипотека", icon: Home },
  { href: "/faq", label: "Вопросы", icon: HelpCircle },
  { href: "/branches", label: "Отделения", icon: MapPin },
];

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
      <div className="select-none text-[120px] font-extrabold leading-none text-brand-green/15">
        404
      </div>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Страница не найдена
      </h1>

      <p className="mt-3 max-w-xs text-sm text-gray-500">
        Возможно, ссылка устарела или адрес введён с ошибкой. Выберите один из
        разделов ниже.
      </p>

      <div className="mt-8 grid max-w-sm grid-cols-2 gap-3 sm:grid-cols-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-brand-green hover:text-brand-green"
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>
    </section>
  );
}
