import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { Clock, Headset, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import ContactForm from "./_components/contact-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact-page" });

  return {
    title: t("meta-title"),
    description: t("meta-description"),
  };
}

export default async function ContactUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("contact-page");
  const format = await getFormatter();

  const phoneDisplay = `${locale === "ar" ? "٠" : "0"}${format.number(1505748872, {
    style: "decimal",
    maximumFractionDigits: 0,
    useGrouping: false,
    numberingSystem: locale === "ar" ? "arab" : "latn",
  })}`;

  const contactCards = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t("phone"),
      value: phoneDisplay,
      href: "tel:+201505748872",
      description: t("phone-desc"),
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t("email"),
      value: "mmkandeelz74@gmail.com",
      href: "mailto:mmkandeelz74@gmail.com",
      description: t("email-desc"),
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t("location"),
      value: t("location-value"),
      href: "https://maps.google.com/?q=Nasr+City,+Cairo,+Egypt",
      description: t("location-desc"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("hours"),
      value: t("hours-value"),
      description: t("hours-desc"),
    },
  ];

  return (
    <div className="w-full flex flex-col pb-20">
      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero.png"
            alt={t("hero-image-alt")}
            fill
            className="object-cover object-center brightness-[0.55] dark:brightness-[0.35]"
            priority
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-maroon-950/80 via-maroon-900/40 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-soft-pink-200" />
            <span className="text-sm font-medium tracking-widest uppercase text-white/90">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 font-primary drop-shadow-lg leading-tight">
            {t("hero-title")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-Sarabun max-w-2xl">
            {t("hero-subtitle")}
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="relative -mt-16 z-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-zinc-950 rounded-2xl p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-soft-pink-50 dark:bg-maroon-900/20 rounded-bl-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-125" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-soft-pink-100 dark:bg-maroon-950/50 flex items-center justify-center text-maroon-600 dark:text-soft-pink-300 group-hover:bg-maroon-600 group-hover:text-white dark:group-hover:bg-soft-pink-500 transition-colors duration-300">
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    {card.title}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-base font-semibold text-zinc-900 dark:text-zinc-50 hover:text-maroon-600 dark:hover:text-soft-pink-300 transition-colors break-all"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {card.value}
                    </p>
                  )}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-Sarabun">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + side panel */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 font-primary mb-3">
                {t.rich("form-title", {
                  highlight: (chunks) => (
                    <span className="text-maroon-600 dark:text-soft-pink-400">{chunks}</span>
                  ),
                })}
              </h2>
              <div className="w-16 h-1 bg-maroon-600 dark:bg-soft-pink-500 rounded-full mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400 font-Sarabun text-lg">
                {t("form-subtitle")}
              </p>
            </div>

            <div className="relative rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 md:p-8 shadow-sm">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-soft-pink-300 to-transparent" />
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="relative h-72 w-full rounded-3xl overflow-hidden shadow-xl group">
              <Image
                src="/assets/Images/gallery-3.png"
                alt={t("side-image-alt")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-primary text-xl font-semibold">
                  {t("side-image-title")}
                </p>
                <p className="text-white/80 text-sm mt-1 font-Sarabun">{t("side-image-desc")}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-maroon-100 dark:bg-maroon-900/40 flex items-center justify-center shrink-0">
                  <Headset className="w-5 h-5 text-maroon-600 dark:text-soft-pink-300" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {t("support-available")}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-Sarabun">
                    {t("support-available-desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-maroon-100 dark:bg-maroon-900/40 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-maroon-600 dark:text-soft-pink-300" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {t("response-time")}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-Sarabun">
                    {t("response-time-desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-maroon-600 dark:bg-maroon-800 p-6 text-white">
              <p className="font-primary text-lg font-semibold mb-2">{t("cta-title")}</p>
              <p className="text-white/80 text-sm font-Sarabun mb-4">{t("cta-desc")}</p>
              <Button asChild variant="secondary" className="w-full rounded-full">
                <Link href="/products">{t("browse-products")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 font-primary mb-3">
            {t("find-us")}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-Sarabun text-lg max-w-xl mx-auto">
            {t("map-desc")}
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-zinc-100 dark:border-zinc-800 h-[400px] md:h-[450px]">
          <iframe
            title={t("map-title")}
            src="https://maps.google.com/maps?q=Nasr+City,+Cairo,+Egypt&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full border-0 grayscale-[30%] contrast-[1.05] dark:grayscale-[50%] dark:brightness-75"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-xs">
            <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-zinc-100 dark:border-zinc-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-maroon-600 dark:text-soft-pink-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
                    {t("location-value")}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-Sarabun">
                    {t("location-desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
