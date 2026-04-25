import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { Leaf, Heart, Star, Sparkles, ShieldCheck, Clock } from "lucide-react";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();
  const format = await getFormatter();

  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-maroon-600 dark:text-soft-pink-300" />,
      title: t("freshness-guaranteed"),
      description: t("we-source-our-flowers-directly-from-premium-farms-to-ensure-lasting-beauty"),
    },
    {
      icon: <Heart className="w-8 h-8 text-maroon-600 dark:text-soft-pink-300" />,
      title: t("crafted-with-love"),
      description: t("craft-desc"),
    },
    {
      icon: <Clock className="w-8 h-8 text-maroon-600 dark:text-soft-pink-300" />,
      title: t("punctual-delivery"),
      description: t("deliver-every-time"),
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-maroon-600 dark:text-soft-pink-300" />,
      title: t("premium-quality"),
      description: t("luxury-arrangements"),
    },
  ];

  return (
    <div className="w-full flex flex-col pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero.png"
            alt="Luxurious flower shop interior"
            fill
            className="object-cover object-center brightness-[0.6] dark:brightness-[0.4] transition-all duration-700 hover:scale-105"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-soft-pink-200" />
            <span className="text-sm font-medium tracking-widest uppercase text-white/90">
              {t("about")}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-primary drop-shadow-lg">
            {t("where-floral-artistry-meets-elegance")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-Sarabun max-w-2xl">{t("passion")}</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 font-primary">
              {/* Our <span className="text-maroon-600 dark:text-soft-pink-400">Story</span> */}
              {t.rich("ourStory", {
                highlight: (chunks) => (
                  <span className="text-maroon-600 dark:text-soft-pink-400">{chunks}</span>
                ),
              })}
            </h2>
            <div className="w-20 h-1 bg-maroon-600 dark:bg-soft-pink-500 rounded-full"></div>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-Sarabun leading-relaxed">
              {t("start")}
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-Sarabun leading-relaxed">
              {t("team")}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-8">
              <div className="border-l-2 border-soft-pink-300 pl-4">
                <p className="text-3xl font-bold text-maroon-600 flex gap-1 items-center dark:text-soft-pink-300">
                  {format.number(10, "number-base")}
                  <span>{locale === "ar" ? "ألف" : "k"}+</span>
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
                  {t("happy-clients")}
                </p>
              </div>
              <div className="border-l-2 border-soft-pink-300 pl-4">
                <p className="text-3xl flex items-center gap-1 font-bold text-maroon-600 dark:text-soft-pink-300">
                  {format.number(5, "number-base")}
                  <span>{locale === "ar" ? "ألف" : "k"}+</span>
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
                  {t("unique-designs")}
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2 group">
            <Image
              src="/images/about/story.png"
              alt="Florist arranging a beautiful bouquet"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10"></div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 font-primary mb-4">
              {/* Our Core <span className="text-maroon-600 dark:text-soft-pink-400">Values</span> */}
              {t.rich("title-values", {
                highlight: (chunks) => (
                  <span className="text-maroon-600 dark:text-soft-pink-400">{chunks}</span>
                ),
              })}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-Sarabun">
              {t("values")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-zinc-950 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-soft-pink-50 dark:bg-maroon-900/20 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-xl bg-soft-pink-100 dark:bg-maroon-950/50 flex items-center justify-center mb-6 text-maroon-600 group-hover:bg-maroon-600 group-hover:text-white dark:group-hover:bg-soft-pink-500 dark:group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 font-primary">
                    {value.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-Sarabun flex-grow">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / CTA Section */}
      <section className="mt-12 mx-4 md:mx-8 max-w-7xl xl:mx-auto">
        <div className="relative rounded-3xl overflow-hidden h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about/mission.png"
              alt="Premium floral arrangement close up"
              fill
              className="object-cover brightness-[0.5] dark:brightness-[0.4]"
            />
          </div>
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <Star className="w-10 h-10 text-soft-pink-300 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-primary leading-tight">
              {t("bringing-natures")}
            </h2>
            <p className="text-lg text-white/80 font-Sarabun">{t("we-emotions")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
