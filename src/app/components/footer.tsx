import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import logo from "@assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocale, useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  // Translations
  const t = useTranslations();
  const format = useFormatter();
  const locale = useLocale();

  // Navigation object (localized for known keys)
  const navigation = [
    { title: t("home"), link: "/" },
    { title: t("products"), link: "/products" },
    { title: t("categories"), link: "/categories" },
    { title: t("occasions"), link: "/occasions" },
    { title: t("contact"), link: "/contact" },
    { title: t("about"), link: "/about" },
    { title: t("terms-and-conditions"), link: "/terms-and-conditions" },
    { title: t("privacy-policy"), link: "/privacy-policy" },
    { title: t("faqs"), link: "/faqs" },
  ];

  const mid = Math.ceil(navigation.length / 2);
  const leftLinks = navigation.slice(0, mid);
  const rightLinks = navigation.slice(mid);
  const legalLinks = navigation.slice(-3);

  return (
    <footer className="w-full flex flex-col bg-zinc-800 dark:bg-zinc-900 border-t border-zinc-700/50">
      <div className="container mx-auto px-4 py-8 md:py-12 text-white font-primary">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* About + Social */}
          <div className="md:col-span-4 flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-3">
              <Image src={logo} alt="logo" className="w-14 h-14 md:w-16 md:h-16" />
              <h2 className="text-soft-pink-300 font-semibold text-xl">
                {t("rose-e-commerce-app")}
              </h2>
            </div>
            <p className="text-zinc-300 text-sm text-center md:text-left max-w-md">
              {t("footer-slug")}.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full bg-zinc-700/60 hover:bg-zinc-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full bg-zinc-700/60 hover:bg-zinc-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-full bg-zinc-700/60 hover:bg-zinc-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="p-2 rounded-full bg-zinc-700/60 hover:bg-zinc-600 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-col gap-2 text-zinc-300 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>{t("nasr-city-cairo-egypt")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+201505748872" className="hover:text-soft-pink-300">
                  {locale === "ar" ? "٠" : "0"}
                  {format.number("01505748872", {
                    style: "decimal",
                    maximumFractionDigits: 0,
                    useGrouping: false,
                    numberingSystem: locale === "ar" ? "arab" : "latn",
                  })}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:mmkandeelz74@gmail.com" className="hover:text-soft-pink-300">
                  mmkandeelz74@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (2 columns) */}
          <div className="md:col-span-5">
            <p className="text-soft-pink-300 font-semibold text-lg mb-3">
              {t("discover-our-website")}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <ul className="flex flex-col gap-2 text-zinc-100 text-base">
                {leftLinks.map((item, index) => (
                  <Link
                    href={item.link}
                    key={`left-${index}`}
                    className="hover:text-soft-pink-300 transition-colors duration-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 text-zinc-100 text-base">
                {rightLinks.map((item, index) => (
                  <Link
                    href={item.link}
                    key={`right-${index}`}
                    className="hover:text-soft-pink-300 transition-colors duration-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="md:col-span-3">
            <div className="rounded-2xl bg-zinc-700/50 p-4 md:p-5">
              <p className="font-semibold text-lg text-soft-pink-300 text-center md:text-left">
                {t.rich("footer.discount", {
                  pink: (chunk: string) => <span className="text-maroon-50">{chunk}</span>,
                })}
              </p>
              <p className="text-zinc-300 text-sm mt-1 text-center md:text-left">
                {t("by-subscribing-to-our-newsletter")}
              </p>
              <div className="mt-4">
                <div className="flex md:hidden flex-col gap-2 w-full">
                  <Input
                    placeholder={t("enter-your-email")}
                    className="bg-zinc-600 text-white border-none ps-4 w-full h-10 rounded-[30px]"
                  />
                  <Button className="bg-maroon-50 h-10 w-full text-maroon-700 font-medium text-sm hover:bg-soft-pink-400 rounded-full px-4">
                    {t("subscribe")} <ArrowRight />
                  </Button>
                </div>
                <div className="hidden md:flex items-center justify-between gap-2 relative w-full">
                  <Input
                    placeholder={t("enter-your-email")}
                    className="bg-zinc-600 text-white border-none ps-4 w-full h-10 rounded-[30px] pr-[130px]"
                  />
                  <Button className="bg-maroon-50 absolute inset-y-0 h-10 w-[121px] right-0 text-maroon-700 font-medium text-sm hover:bg-soft-pink-400 rounded-full px-4">
                    {t("subscribe")} <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-700/50 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-zinc-400">
          <p className="text-center md:text-left">
            {t("all-rights-reserved")} • {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((item, index) => (
              <Link key={`legal-${index}`} href={item.link} className="hover:text-soft-pink-300">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
