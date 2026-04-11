"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/pitch") {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
