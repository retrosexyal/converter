"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NAV } from "@/lib/navigation";

type NavItem = { href: string; label: string };

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: NavItem[];
}) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="text-sm font-medium hover:underline inline-flex items-center gap-1"
      >
        {label} <span aria-hidden>▾</span>
      </button>

      {/* ВАЖНО: pointer-events + opacity/visibility для стабильного hover */}
      <div
        className="
          absolute top-full left-0 mt-2 w-56
          rounded border border-neutral-200 dark:border-neutral-800
          bg-white dark:bg-neutral-900 shadow-lg z-50
          opacity-0 invisible pointer-events-none
          group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
          transition-opacity
        "
      >
        <ul className="py-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  onNavigate: () => void;
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
              href={item.href}
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileGroups = useMemo(
    () => [
      { title: "Конвертировать", items: NAV.convert },
      { title: "WebP", items: NAV.webp },
      { title: "PNG", items: NAV.png },
      { title: "JPEG", items: NAV.jpeg },
    ],
    [],
  );

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Image Converter
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <DesktopDropdown label="Конвертировать" items={NAV.convert} />
          <DesktopDropdown label="WebP" items={NAV.webp} />
          <DesktopDropdown label="PNG" items={NAV.png} />
          <DesktopDropdown label="JPEG" items={NAV.jpeg} />
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm"
          onClick={() => setMobileOpen(true)}
          aria-label="Открыть меню"
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
            <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
              <div className="font-semibold">Меню</div>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => setMobileOpen(false)}
              >
                Закрыть
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-56px)]">
              <div className="px-4 py-3">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium hover:underline"
                >
                  Все форматы (главная)
                </Link>
              </div>

              {mobileGroups.map((g) => (
                <MobileSection
                  key={g.title}
                  title={g.title}
                  items={g.items}
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
