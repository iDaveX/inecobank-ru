"use client";

import { Logo } from "./Logo";
import { useToast } from "@/components/Toast";

const productLinks = [
  { label: "Карты", href: "/cards" },
  { label: "Кредиты", href: "/loans" },
  { label: "Депозиты", href: "/deposits" },
  { label: "Ипотека", href: "/mortgage" },
  { label: "Переводы", href: "/transfers" },
];
const companyLinks = [
  { label: "О банке", href: "/about" },
  { label: "Карьера" },
  { label: "Пресс-центр" },
  { label: "Контакты" },
];
const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Отделения и банкоматы", href: "/branches" },
];

const socialLinks = [
  { label: "LinkedIn", mark: "in" },
  { label: "Facebook", mark: "f" },
  { label: "Instagram", mark: "◎" },
  { label: "YouTube", mark: "▶" },
  { label: "Twitter", mark: "X" },
];

function FooterLink({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-left text-sm text-gray-400 transition-colors hover:text-white"
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      className="text-sm text-gray-400 transition-colors hover:text-white"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const { showToast } = useToast();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 min-[420px]:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo inverse />
            <p className="mt-4 text-sm text-gray-400">Банк для жизни</p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  onClick={() =>
                    showToast(
                      "Социальные сети доступны на официальном сайте inecobank.am",
                      "info",
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={social.label}
                >
                  <span className="leading-none">{social.mark}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Продукты
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {productLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Компания
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  onClick={() =>
                    showToast(
                      "Раздел доступен на официальном сайте inecobank.am",
                      "info",
                    )
                  }
                >
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Поддержка
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {supportLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
              <a
                href="tel:+37410510510"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                24/7: +374 (10) 510 510
              </a>
              <a
                href="mailto:inecobank@inecobank.am"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                inecobank@inecobank.am
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500">
          © Inecobank CJSC 2026 · Под надзором ЦБ Армении · Политика
          конфиденциальности
        </div>
      </div>
    </footer>
  );
}
