"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Home,
  Gift,
  ClipboardList,
  PartyPopper,
  Headset,
  Info,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ClipboardCheck,
  LayoutDashboard,
  Search,
  Clock,
  TrendingUp,
  Flame,
  Zap,
  ChevronRight,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = {
  label: string;
  href: string;
  iconName: string;
  shortcut?: string;
  description?: string;
};

type VisitRecord = {
  count: number;
  label: string;
  iconName: string;
  description?: string;
};

type RecentRecord = {
  href: string;
  label: string;
  iconName: string;
  timestamp: number;
};

// ─── Icon map (needed to serialize to localStorage) ───────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Gift,
  ClipboardList,
  PartyPopper,
  Headset,
  Info,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ClipboardCheck,
  LayoutDashboard,
};

// ─── All pages definition ─────────────────────────────────────────────────────
const NAV_PAGES: { group: string; items: NavItem[] }[] = [
  {
    group: "Pages",
    items: [
      {
        label: "Home",
        href: "/",
        iconName: "Home",
        shortcut: "H",
        description: "Back to the landing page",
      },
      {
        label: "Products",
        href: "/products",
        iconName: "Gift",
        shortcut: "P",
        description: "Browse all flowers & gifts",
      },
      {
        label: "Categories",
        href: "/categories",
        iconName: "ClipboardList",
        shortcut: "C",
        description: "Explore product categories",
      },
      {
        label: "Occasions",
        href: "/occasions",
        iconName: "PartyPopper",
        shortcut: "O",
        description: "Shop by occasion",
      },
      { label: "About Us", href: "/about", iconName: "Info", description: "Our story and values" },
      {
        label: "Contact",
        href: "/contact",
        iconName: "Headset",
        description: "Get in touch with us",
      },
    ],
  },
  {
    group: "My Account",
    items: [
      {
        label: "My Profile",
        href: "/profile",
        iconName: "User",
        description: "Manage your account",
      },
      {
        label: "My Orders",
        href: "/allOrders",
        iconName: "ClipboardCheck",
        description: "Track your orders",
      },
      { label: "My Cart", href: "/cart", iconName: "ShoppingCart", description: "View your cart" },
      {
        label: "My Addresses",
        href: "/all-addresses",
        iconName: "MapPin",
        description: "Delivery addresses",
      },
    ],
  },
  {
    group: "Dashboard",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        iconName: "LayoutDashboard",
        description: "Admin overview",
      },
    ],
  },
];

// Flat list for lookups
const ALL_ITEMS: NavItem[] = NAV_PAGES.flatMap((s) => s.items);

// ─── localStorage keys ────────────────────────────────────────────────────────
const STORAGE_VISITS = "cmd:visits";
const STORAGE_RECENT = "cmd:recent";
const MAX_RECENT = 4;
const MAX_FREQUENT = 2;

// ─── Utilities ────────────────────────────────────────────────────────────────
function readVisits(): Record<string, VisitRecord> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_VISITS) ?? "{}");
  } catch {
    return {};
  }
}

function readRecent(): RecentRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_RECENT) ?? "[]");
  } catch {
    return [];
  }
}

function timeAgo(ts: number): string {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function recordVisit(item: NavItem) {
  // Update visit counts
  const visits = readVisits();
  const prev = visits[item.href] ?? { count: 0, label: item.label, iconName: item.iconName };
  visits[item.href] = { ...prev, count: prev.count + 1 };
  localStorage.setItem(STORAGE_VISITS, JSON.stringify(visits));

  // Update recent list (prepend, dedupe, cap)
  const recent = readRecent().filter((r) => r.href !== item.href);
  recent.unshift({
    href: item.href,
    label: item.label,
    iconName: item.iconName,
    timestamp: Date.now(),
  });
  localStorage.setItem(STORAGE_RECENT, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

// ─── Component ────────────────────────────────────────────────────────────────
interface CommandPaletteProps {
  placeholder: string;
}

export default function CommandPalette({ placeholder }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [frequent, setFrequent] = useState<(NavItem & { count: number })[]>([]);
  const [recent, setRecent] = useState<RecentRecord[]>([]);
  const router = useRouter();
  const locale = useLocale();

  // Load persisted data when palette opens
  const loadPersisted = useCallback(() => {
    const visits = readVisits();
    const top = Object.entries(visits)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, MAX_FREQUENT)
      .map(([href, v]) => {
        const item = ALL_ITEMS.find((i) => i.href === href);
        return {
          href,
          label: v.label,
          iconName: v.iconName,
          count: v.count,
          description: item?.description,
        };
      });
    setFrequent(top);
    setRecent(readRecent().slice(0, 5));
  }, []);

  useEffect(() => {
    if (open) {
      loadPersisted();
      setQuery("");
    }
  }, [open, loadPersisted]);

  // Ctrl+K / ⌘+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = useCallback(
    (item: NavItem) => {
      recordVisit(item);
      setOpen(false);
      router.push(`/${locale}${item.href}`);
    },
    [router, locale],
  );

  const isSearching = query.trim().length > 0;

  return (
    <>
      {/* ── Trigger ── */}
      <button
        id="command-palette-trigger"
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 w-full md:max-w-xs lg:max-w-sm xl:max-w-md px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 text-sm hover:border-rose-300 dark:hover:border-rose-700 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all cursor-pointer group"
        aria-label="Open command palette"
      >
        <Search className="w-4 h-4 shrink-0 group-hover:text-rose-500 transition-colors" />
        <span className="flex-1 text-left truncate">{placeholder}</span>
        <span className="hidden lg:flex items-center gap-1 shrink-0">
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm text-zinc-500">
            Ctrl
          </kbd>
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm text-zinc-500">
            K
          </kbd>
        </span>
      </button>

      {/* ── Dialog ── */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search pages, account, dashboard..."
          value={query}
          onValueChange={setQuery}
        />

        <CommandList className="max-h-[480px]">
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-8 text-zinc-400">
              <Search className="w-8 h-8 opacity-40" />
              <p className="text-sm">No results for &quot;{query}&quot;</p>
            </div>
          </CommandEmpty>

          {/* ── Recent Activity (hidden while searching) ── */}
          {!isSearching && recent.length > 0 && (
            <>
              <CommandGroup
                heading={
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <Clock className="w-3 h-3" /> Recent Activity
                  </span>
                }
              >
                {recent.map((r) => {
                  const Icon = ICON_MAP[r.iconName] ?? Gift;
                  const item = ALL_ITEMS.find((i) => i.href === r.href)!;
                  return (
                    <CommandItem
                      key={`recent-${r.href}`}
                      value={`recent ${r.label}`}
                      onSelect={() => item && navigate(item)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-500 group-data-[selected=true]:bg-white dark:group-data-[selected=true]:bg-zinc-700">
                          <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-100" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{r.label}</p>
                        </div>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeAgo(r.timestamp)}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0" />
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* ── Frequent Pages (hidden while searching) ── */}
          {!isSearching && frequent.length > 0 && (
            <>
              <CommandGroup
                heading={
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <TrendingUp className="w-3 h-3" /> Most Visited
                  </span>
                }
              >
                {frequent.map((item) => {
                  const Icon = ICON_MAP[item.iconName] ?? Gift;
                  const navItem = ALL_ITEMS.find((i) => i.href === item.href)!;
                  return (
                    <CommandItem
                      key={`freq-${item.href}`}
                      value={`frequent ${item.label}`}
                      onSelect={() => navItem && navigate(navItem)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-1.5 rounded-md bg-rose-50 dark:bg-rose-950/40 group-data-[selected=true]:bg-rose-100 dark:group-data-[selected=true]:bg-rose-900/40">
                          <Icon className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.label}</p>
                          {item.description && (
                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {/* Visit count badge */}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-[11px] font-semibold shrink-0">
                          <Flame className="w-2.5 h-2.5" />
                          {item.count}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0" />
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* ── All Pages (always shown) ── */}
          {NAV_PAGES.map((section, i) => (
            <span key={section.group}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup
                heading={
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <Zap className="w-3 h-3" /> {section.group}
                  </span>
                }
              >
                {section.items.map((item) => {
                  const Icon = ICON_MAP[item.iconName] ?? Gift;
                  return (
                    <CommandItem
                      key={item.href}
                      value={item.label}
                      onSelect={() => navigate(item)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 group-data-[selected=true]:bg-zinc-200 dark:group-data-[selected=true]:bg-zinc-700">
                          <Icon className="w-3.5 h-3.5 text-soft-pink-500 " />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.label}</p>
                          {item.description && (
                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.shortcut && (
                          <CommandShortcut className="shrink-0">⌥{item.shortcut}</CommandShortcut>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 shrink-0" />
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </span>
          ))}
        </CommandList>

        {/* ── Footer ── */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px]">
                ↑↓
              </kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px]">
                ↵
              </kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px]">
                esc
              </kbd>
              close
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
            <TrendingUp className="w-3 h-3 text-rose-400" />
            <span>Learns from your usage</span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
