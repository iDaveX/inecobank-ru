import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "InecoBank",
  description: "Русскоязычный MVP-сайт InecoBank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <ToastProvider>
          <SiteChrome>{children}</SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
