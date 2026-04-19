import Image from "next/image";

export default function AboutImage() {
  return (
    <div className="relative flex items-start gap-2 mt-5 col-span-1">
      <div className="relative">
        <div className="w-80 h-86 absolute -top-5 -left-5 -rotate-custom-1 rounded-[120px] border-4 border-maroon-600 rounded-tl-[50px] dark:border-soft-pink-200 object-cover" />
        <Image
          src="/assets/Images/about-1.png"
          alt="about image"
          width={300}
          height={0}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="w-[450px] h-86 left-7 top-5 rotate-0 rounded-[120px] rounded-tl-[50px] object-cover"
        />
      </div>
      <div className="h-84 flex flex-col gap-2">
        <Image
          src="/assets/Images/about-3.png"
          alt="about image"
          width={300}
          height={0}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="size-52 rounded-full object-cover"
        />
        <Image
          src="/assets/Images/about-2.png"
          alt="about image"
          width={300}
          height={0}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="w-[200px] h-36 rounded-s-[50px] rounded-e-[100px] object-cover"
        />
      </div>
    </div>
  );
}
