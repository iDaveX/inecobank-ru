"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "./Toast";
import { Logo } from "./Logo";

const WIP_MESSAGE = "Раздел в разработке";

const navigation = [
  {
    label: "Счета",
    items: [
      { label: "Текущий счёт", href: "#", stub: true },
      { label: "Сберегательный счёт", href: "#", stub: true },
    ],
  },
  {
    label: "Карты",
    items: [
      { label: "Все карты", href: "/cards" },
      { label: "Visa", href: "#", stub: true },
      { label: "Mastercard", href: "#", stub: true },
      { label: "ArCa", href: "#", stub: true },
    ],
  },
  {
    label: "Кредиты",
    items: [
      { label: "Потребительский", href: "/loans" },
      { label: "Ипотека", href: "/mortgage" },
      { label: "Автокредит", href: "#", stub: true },
    ],
  },
  {
    label: "Депозиты",
    items: [
      { label: "Срочный", href: "/deposits" },
      { label: "Гибкий", href: "#", stub: true },
      { label: "INECOSAVE", href: "#", stub: true },
    ],
  },
  {
    label: "Переводы",
    items: [
      { label: "Внутри банка", href: "/transfers" },
      { label: "За рубеж", href: "/transfers#international" },
      { label: "Системы переводов", href: "/transfers#international" },
    ],
  },
  {
    label: "Ещё",
    items: [
      { label: "FAQ", href: "/faq" },
      { label: "Отделения и банкоматы", href: "/branches" },
      { label: "О банке", href: "/about" },
    ],
  },
];

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -8, pointerEvents: "none" },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.18 },
  },
};

const drawerVariants: Variants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { type: "tween", duration: 0.25 } },
};

export function Header() {
  const { showToast } = useToast();
  const [hasShadow, setHasShadow] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null,
  );
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const updateShadow = () => setHasShadow(window.scrollY > 10);

    updateShadow();
    window.addEventListener("scroll", updateShadow);

    return () => window.removeEventListener("scroll", updateShadow);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full bg-white transition-shadow ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((section) => (
            <div
              key={section.label}
              className="group relative"
              onMouseEnter={() => setActiveDesktopMenu(section.label)}
              onMouseLeave={() => setActiveDesktopMenu(null)}
            >
              <button className="flex h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-gray-700 transition-colors hover:text-brand-green">
                {section.label}
                <ChevronDown
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                />
              </button>
              <motion.div
                initial="hidden"
                animate={
                  activeDesktopMenu === section.label ? "visible" : "hidden"
                }
                variants={menuVariants}
                className="absolute left-0 top-full min-w-56 pt-2"
              >
                <div className="rounded-lg bg-white p-2 shadow-xl ring-1 ring-black/5">
                  {section.items.map((item) =>
                    item.stub ? (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => showToast(WIP_MESSAGE, "info")}
                        className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                      >
                        {item.label}
                      </a>
                    ),
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/pitch"
            className="hidden items-center rounded-full border border-brand-green/40 px-3 py-1 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green/5 sm:flex"
          >
            PM-кейс
          </Link>
          <button
            type="button"
            onClick={() => showToast(WIP_MESSAGE, "info")}
            className="rounded-md border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
          >
            Войти
          </button>
          <button
            type="button"
            onClick={() =>
              showToast(
                "Заявка на открытие счёта принята. Менеджер свяжется с вами.",
              )
            }
            className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
          >
            Открыть счёт
          </button>
          <span className="text-sm font-medium text-gray-500">RU</span>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-green transition-colors hover:bg-brand-green/10 lg:hidden"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Открыть меню"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {isDrawerOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Закрыть меню"
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-white shadow-2xl"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex h-20 items-center justify-between border-b border-gray-100 px-4">
                <Link href="/">
                  <Logo />
                </Link>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-green"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {navigation.map((section) => {
                  const isOpen = openMobileSection === section.label;

                  return (
                    <div
                      key={section.label}
                      className="border-b border-gray-100 py-2"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-md px-2 py-3 text-left font-semibold text-gray-800 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                        onClick={() =>
                          setOpenMobileSection(isOpen ? null : section.label)
                        }
                      >
                        {section.label}
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <ChevronDown
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 pb-2 pl-4">
                              {section.items.map((item) =>
                                item.stub ? (
                                  <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => {
                                      showToast(WIP_MESSAGE, "info");
                                      setIsDrawerOpen(false);
                                    }}
                                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                                  >
                                    {item.label}
                                  </button>
                                ) : (
                                  <a
                                    key={item.label}
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                                    onClick={() => setIsDrawerOpen(false)}
                                  >
                                    {item.label}
                                  </a>
                                ),
                              )}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 border-t border-gray-100 p-4">
                <button
                  type="button"
                  onClick={() => showToast(WIP_MESSAGE, "info")}
                  className="block w-full rounded-md border border-brand-green px-4 py-3 text-center text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                >
                  Войти
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(
                      "Заявка на открытие счёта принята. Менеджер свяжется с вами.",
                    );
                    setIsDrawerOpen(false);
                  }}
                  className="block w-full rounded-md bg-brand-green px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                >
                  Открыть счёт
                </button>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
