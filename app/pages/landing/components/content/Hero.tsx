import Image from "next/image";

export default function Hero() {
  return (
    <section className="container mx-auto flex items-start justify-between gap-8 px-4 pt-40 pb-20 h-auto mb-20">
      <div className="w-full md:w-1/2  lg:pl-10 h-auto">
        <h1 className="font-lifta text-5xl lg:text-8xl">
          اكتشف عالم برؤية جديدة
        </h1>
        <p className="font-lyon w-full md:w-2/3 text-sm md:text-lg mt-8 text-gray-800">
          اكتشف مجموعتنا الحصرية من النظارات الطبية والشمسية. تصاميم عصرية، جودة
          استثنائية، وأسعار تناسب الجميع.
        </p>
        <button className="font-lyon mt-8 px-6 py-2 bg-accentPrimary hover:bg-yellow-600 text-darkness rounded-lg  transition">
          تسوق الآن
        </button>
      </div>
      <div className="hidden md:flex w-1/2 mx-auto relative justify-end items-center font-lyon md:h-[300px] lg:h-[450px]">
        <Image
          src={`/images/hero.jpg`}
          alt="hero"
          width={400}
          height={400}
          className="h-full w-full object-cover rounded-md shadow-2xl"
        />
      </div>
    </section>
  );
}
