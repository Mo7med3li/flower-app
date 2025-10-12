"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Props
interface ThumbnailImagesProps {
  thumbnailImages: string[];
}

export default function ProductThumbnail({ thumbnailImages }: ThumbnailImagesProps) {
  // Hooks
  const [mainCarouselAPI, setMainCarouselAPI] = useState<CarouselApi | null>(null);
  const [secondaryCarouselAPI, setSecondaryCarouselAPI] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // On select to insure both carousels are synced
  const onSelect = useCallback(() => {
    // Insure values of carousels are not null
    if (!mainCarouselAPI || !secondaryCarouselAPI) return;

    setSelectedIndex(mainCarouselAPI.selectedScrollSnap());
    secondaryCarouselAPI.scrollTo(mainCarouselAPI.selectedScrollSnap());
  }, [mainCarouselAPI, secondaryCarouselAPI]);

  // Scroll to for the main carousel on click on the secondary carousel
  const scrollTo = useCallback(
    (index: number) => {
      // Insure values of carousels are not null
      if (!mainCarouselAPI || !secondaryCarouselAPI) return;

      // scrolls tha main carousal on the clicked image on secondary carousel
      mainCarouselAPI.scrollTo(index);
    },
    [mainCarouselAPI, secondaryCarouselAPI],
  );

  // This keeps every thing in sync at initialization or on changing
  useEffect(() => {
    // Insure values of carousels are not null
    if (!mainCarouselAPI || !secondaryCarouselAPI) return;

    onSelect();

    mainCarouselAPI.on("select", onSelect).on("reInit", onSelect);
  }, [mainCarouselAPI, onSelect, secondaryCarouselAPI]);

  // Empty state fallback
  if (!thumbnailImages || thumbnailImages.length === 0) {
    return (
      <div className="w-full max-w-[605px] h-[402px] rounded-xl border border-dashed border-zinc-300 bg-zinc-50 flex items-center justify-center text-zinc-500">
        No product images
      </div>
    );
  }

  return (
    <div>
      {/* main carousel */}
      <Carousel opts={{ loop: true, align: "start" }} setApi={setMainCarouselAPI} className="mb-3">
        <CarouselContent>
          {thumbnailImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="group relative max-w-[605px] h-[450px] rounded-xl overflow-hidden bg-zinc-50 ring-1 ring-zinc-200 shadow-sm">
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 605px"
                  className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-105"
                  quality={90}
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* secondary carousel */}
      <div>
        <Carousel setApi={setSecondaryCarouselAPI} className="flex justify-center">
          <CarouselContent className="mx-auto w-full">
            {thumbnailImages.map((image, index) => (
              <CarouselItem key={`${image}-${index}`} className="pl-2 flex-none">
                <Image
                  alt={`Product thumbnail ${index + 1}`}
                  src={image}
                  width={91}
                  height={111}
                  className={cn(
                    index === selectedIndex
                      ? "brightness-100 ring-2 ring-maroon-500"
                      : "brightness-75 ring-1 ring-transparent",
                    "w-24 h-28 rounded-lg object-cover hover:brightness-95 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-maroon-500",
                  )}
                  onClick={() => scrollTo(index)}
                  aria-current={index === selectedIndex}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
