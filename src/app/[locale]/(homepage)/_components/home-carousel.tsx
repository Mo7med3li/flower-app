"use client";

import Image from "next/image";
import { useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDotButton } from "../_hooks/use-dots";

const CAROUSEL_IMAGES = [
  {
    image: "/assets/carousel-section-1.png",

    title: "home-carousel-slide-one-title",
    description: "home-carousel-slide-one-desc",
    alt: "home-carousel-slide-alt",
  },
  {
    image: "/assets/carousel-section-2.png",
    title: "home-carousel-slide-two-title",
    description: "home-carousel-slide-two-desc",
    alt: "home-carousel-slide-alt",
  },
  {
    image: "/assets/carousel-section-3.png",
    title: "home-carousel-slide-three-title",
    description: "home-carousel-slide-three-desc",
    alt: "home-carousel-slide-three-alt",
  },
];

export default function HomeCarousel() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Variables
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi);

  return (
    <>
      <Carousel
        opts={locale === "ar" ? { direction: "rtl", loop: true } : { direction: "ltr", loop: true }}
        className="h-[440px] col-span-4 lg:col-span-3 overflow-hidden rounded-[16px]"
        setApi={setEmblaApi}
      >
        <CarouselContent>
          {CAROUSEL_IMAGES.map((item, index) => {
            return (
              <CarouselItem key={index} className="relative h-[440px]">
                {/* Carousel image */}
                <Image
                  src={item.image}
                  alt={t(item.alt)}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover object-center"
                />

                {/* Dark gradient overlay */}
                <div className="pointer-events-none absolute inset-0 z-[1] from-black/80 to-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l"></div>

                {/* Title and description */}
                <div className="absolute bottom-[36px] z-[2] flex flex-col flex-wrap ltr:left-8 rtl:right-8">
                  <h4 className="text-4xl font-semibold">{t(item.title)}</h4>
                  <p className="mb-5 text-base font-normal">{t(item.description)}</p>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="w-[129px] rounded-[10px] px-4 py-[10px] dark:bg-maroon-50 dark:text-maroon-700"
                  >
                    <Link href="/products">{t("home-carousel-button")}</Link>
                  </Button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel navigation buttons */}
        <div className="absolute bottom-[30.5px] w-20 ltr:right-8 rtl:left-8">
          <div className="flex h-[35px] w-[74px] justify-between rounded-full rtl:flex-row-reverse">
            <CarouselPrevious className="text-[30px] text-maroon-600 rtl:-rotate-180" />
            <CarouselNext className="text-[30px] text-maroon-600 rtl:rotate-180" />
          </div>
        </div>

        {/* Carousel pagination */}
        <div className="absolute top-[27.5px] flex justify-between gap-2 ltr:right-8 ltr:flex-row rtl:left-8">
          {scrollSnaps.map((_, index) => {
            return (
              <Button
                key={index}
                size={"icon"}
                aria-label={t("go-to-slide", { slide: index + 1 }) || `Go to slide ${index + 1}`}
                onClick={() => {
                  onDotButtonClick(index);
                }}
                className={
                  selectedIndex === index
                    ? "h-1 w-9 rounded-[46.6px] bg-maroon-600 dark:bg-maroon-600 transition-all duration-300 hover:bg-maroon-600 dark:hover:bg-maroon-600"
                    : "h-1 w-1 rounded-full bg-maroon-50 transition-all duration-300 hover:bg-maroon-50 dark:hover:bg-maroon-600"
                }
              ></Button>
            );
          })}
        </div>
      </Carousel>
    </>
  );
}
