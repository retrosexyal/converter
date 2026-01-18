"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NAV } from "@/lib/navigation";

type NavItem = { href: string; label: string };

const withLocale = (href: string, locale: "ru" | "en") =>
  locale === "en" ? `/en${href === "/" ? "" : href}` : href;

function DesktopDropdown({
  label,
  items,
  locale,
}: {
  label: string;
  items: NavItem[];
  locale: "ru" | "en";
}) {
  return (
    <div className="relative">
      {/* group – зона ховера */}
      <div
        className="
          group relative inline-flex items-center
          after:content-[''] after:absolute after:left-0 after:top-full after:h-3 after:w-full
        "
      >
        <button
          type="button"
          className="text-sm font-medium hover:underline inline-flex items-center gap-1"
        >
          {label} <span aria-hidden>▾</span>
        </button>

        <div
          className="
            absolute left-0 top-full mt-2 w-56
            rounded border border-neutral-200 dark:border-neutral-800
            bg-white dark:bg-neutral-900 shadow-lg z-50
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition-opacity
          "
        >
          <ul className="py-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={withLocale(item.href, locale)}
                  className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MobileSection({
  title,
  items,
  onNavigate,
  locale,
}: {
  title: string;
  items: NavItem[];
  onNavigate: () => void;
  locale: "ru" | "en";
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800">
      <button
        type="button"
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {title} <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={withLocale(item.href, locale)}
              onClick={onNavigate}
              className="block px-6 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEn = locale === "en";

  const labels = {
    convert: isEn ? "Convert" : "Конвертировать",
    webp: "WebP",
    png: "PNG",
    jpeg: "JPEG",
    menu: isEn ? "Menu" : "Меню",
    close: isEn ? "Close" : "Закрыть",
    home: isEn ? "All formats (home)" : "Все форматы (главная)",
  };

  const mobileGroups = useMemo(
    () => [
      { title: labels.convert, items: NAV.convert },
      { title: labels.webp, items: NAV.webp },
      { title: labels.png, items: NAV.png },
      { title: labels.jpeg, items: NAV.jpeg },
    ],
    [labels],
  );

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={isEn ? "/en" : "/"} className="font-semibold">
          Image Converter
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <DesktopDropdown
            label={labels.convert}
            items={NAV.convert}
            locale={locale}
          />
          <DesktopDropdown
            label={labels.webp}
            items={NAV.webp}
            locale={locale}
          />
          <DesktopDropdown label={labels.png} items={NAV.png} locale={locale} />
          <DesktopDropdown
            label={labels.jpeg}
            items={NAV.jpeg}
            locale={locale}
          />

          {/* Language switch */}
          <Link href={isEn ? "/" : "/en"} className="text-sm underline">
            {isEn ? "RU" : "EN"}
          </Link>
        </nav>

        {/* Burger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-neutral-900 shadow-xl">
            <div className="h-14 px-4 flex items-center justify-between border-b">
              <div className="font-semibold">{labels.menu}</div>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => setMobileOpen(false)}
              >
                {labels.close}
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-56px)]">
              <div className="px-4 py-3">
                <Link
                  href={isEn ? "/en" : "/"}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium hover:underline"
                >
                  {labels.home}
                </Link>
              </div>

              {mobileGroups.map((g) => (
                <MobileSection
                  key={g.title}
                  title={g.title}
                  items={g.items}
                  locale={locale}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
