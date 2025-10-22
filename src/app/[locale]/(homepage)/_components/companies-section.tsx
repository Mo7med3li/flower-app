import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CompaniesSection() {
  // Translations
  const t = useTranslations();
  return (
    <section className="mt-36 mb-80 lg:px-20 px-4">
      <div className="bg-maroon-50 dark:bg-zinc-700 rounded-[20px] w-full py-10 px-6 flex flex-col items-center justify-center">
        <h2 className="font-bold font-Sarabun text-maroon-700 text-4xl dark:text-soft-pink-200 text-center">
          {t.rich("stats.trusted", {
            pink: (chunk: React.ReactNode) => <span className="text-soft-pink-500">{chunk}</span>,
          })}
        </h2>
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 items-center justify-center mt-10 w-full">
          <Image
            src={"/assets/Images/companie-1.png"}
            alt="company"
            className="col-span-1 mx-auto"
            width={150}
            height={30}
          />
          <Image
            src={"/assets/Images/companie-2.png"}
            alt="company"
            className="col-span-1 mx-auto"
            width={150}
            height={30}
          />
          <Image
            src={"/assets/Images/companie-3.png"}
            alt="company"
            className="col-span-1 mx-auto"
            width={150}
            height={30}
          />
          <Image
            src={"/assets/Images/companie-4.png"}
            alt="company"
            className="col-span-1 mx-auto"
            width={150}
            height={30}
          />
          <Image
            src={"/assets/Images/companie-5.png"}
            alt="company"
            className="col-span-1 mx-auto"
            width={150}
            height={30}
          />
          <Image
            src={"/assets/Images/companie-6.png"}
            alt="company"
            className="col-span-1 mx-auto"
            width={150}
            height={30}
          />
        </div>
      </div>
    </section>
  );
}
