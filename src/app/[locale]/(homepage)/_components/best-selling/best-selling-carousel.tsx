import { useLocale } from "next-intl";
import SingleProduct from "@/components/common/single-product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/lib/types/products";

const BestSellingCarousel = ({ products }: { products: Product[] }) => {
  // Translation
  const locale = useLocale();
  return (
    <div className="col-span-12 md:col-span-9 w-full">
      <Carousel
        opts={locale === "ar" ? { direction: "rtl", loop: true } : { direction: "ltr", loop: true }}
      >
        <CarouselContent className="-ml-3 md:-ml-6">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/3 mx-auto flex justify-center pl-3 md:pl-6"
            >
              <SingleProduct singleProduct={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-maroon-500 dark:bg-maroon-200 hover:bg-maroon-500 dark:[&_svg]:text-maroon-500 hover:text-white border-0 text-white [&_svg]:size-6 rtl:rotate-180 h-8 w-8 md:h-10 md:w-10" />
        <CarouselNext className="bg-maroon-500 dark:bg-maroon-200 hover:bg-maroon-500 dark:[&_svg]:text-maroon-500 hover:text-white border-0 text-white [&_svg]:size-6 rtl:rotate-180 h-8 w-8 md:h-10 md:w-10" />
      </Carousel>
    </div>
  );
};

export default BestSellingCarousel;
