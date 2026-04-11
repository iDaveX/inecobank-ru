"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

const navigation = [
  {
    label: "Счета",
    items: [
      { label: "Текущий счёт", href: "#" },
      { label: "Сберегательный счёт", href: "#" },
    ],
  },
  {
    label: "Карты",
    items: [
      { label: "Все карты", href: "/cards" },
      { label: "Visa", href: "#" },
      { label: "Mastercard", href: "#" },
      { label: "ArCa", href: "#" },
    ],
  },
  {
    label: "Кредиты",
    items: [
      { label: "Потребительский", href: "/loans" },
      { label: "Ипотека", href: "/mortgage" },
      { label: "Автокредит", href: "#" },
    ],
  },
  {
    label: "Депозиты",
    items: [
      { label: "Срочный", href: "/deposits" },
      { label: "Гибкий", href: "#" },
      { label: "INECOSAVE", href: "#" },
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
  const [hasShadow, setHasShadow] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null,
  );
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );

  // Refs for focus management
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    const updateShadow = () => setHasShadow(window.scrollY > 10);
    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
    return () => window.removeEventListener("scroll", updateShadow);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Focus management: move focus into drawer on open, return to trigger on close
  useEffect(() => {
    if (isDrawerOpen) {
      hasOpenedRef.current = true;
      const timer = setTimeout(() => {
        drawerCloseButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else if (hasOpenedRef.current) {
      hamburgerButtonRef.current?.focus();
    }
  }, [isDrawerOpen]);

  // Focus trap: cycle Tab within the drawer, Escape closes it
  function handleDrawerKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      setIsDrawerOpen(false);
      return;
    }
    if (event.key !== "Tab" || !drawerRef.current) return;

    const focusable = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  // Escape closes the active desktop dropdown
  function handleNavKeyDown(
    event: React.KeyboardEvent,
    sectionLabel: string,
  ) {
    if (event.key === "Escape" && activeDesktopMenu === sectionLabel) {
      event.stopPropagation();
      setActiveDesktopMenu(null);
    }
  }

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

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Основная навигация"
        >
          {navigation.map((section) => (
            <div
              key={section.label}
              className="group relative"
              onMouseEnter={() => setActiveDesktopMenu(section.label)}
              onMouseLeave={() => setActiveDesktopMenu(null)}
              onKeyDown={(e) => handleNavKeyDown(e, section.label)}
            >
              <button
                type="button"
                className="flex h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-gray-700 transition-colors hover:text-brand-green"
                aria-expanded={activeDesktopMenu === section.label}
                aria-haspopup="true"
                onClick={() =>
                  setActiveDesktopMenu(
                    activeDesktopMenu === section.label ? null : section.label,
                  )
                }
              >
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
                role="menu"
                aria-label={section.label}
              >
                <div className="rounded-lg bg-white p-2 shadow-xl ring-1 ring-black/5">
                  {section.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  ))}
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
          <a
            href="#"
            className="rounded-md border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
          >
            Войти
          </a>
          <a
            href="#"
            className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
          >
            Открыть счёт
          </a>
          <span
            className="text-sm font-medium text-gray-500"
            aria-label="Язык: русский"
          >
            RU
          </span>
        </div>

        <button
          ref={hamburgerButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-green transition-colors hover:bg-brand-green/10 lg:hidden"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Открыть меню"
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-drawer"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {isDrawerOpen ? (
          <>
            {/* Backdrop: aria-hidden so screen readers don't announce it */}
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.aside
              ref={drawerRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Навигация"
              className="fixed inset-y-0 left-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-white shadow-2xl"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onKeyDown={handleDrawerKeyDown}
            >
              <div className="flex h-20 items-center justify-between border-b border-gray-100 px-4">
                <Link href="/" onClick={() => setIsDrawerOpen(false)}>
                  <Logo />
                </Link>
                <button
                  ref={drawerCloseButtonRef}
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
                        aria-expanded={isOpen}
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
                              {section.items.map((item) => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  className="block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-brand-green/10 hover:text-brand-green"
                                  onClick={() => setIsDrawerOpen(false)}
                                >
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 border-t border-gray-100 p-4">
                <a
                  href="#"
                  className="block rounded-md border border-brand-green px-4 py-3 text-center text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
                >
                  Войти
                </a>
                <a
                  href="#"
                  className="block rounded-md bg-brand-green px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
                >
                  Открыть счёт
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
