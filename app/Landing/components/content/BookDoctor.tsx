import Link from "next/link";
import CardsFigure from "./CardsFigure";

export default function BookDoctor() {
  return (
    <section className="h-full md:h-screen p-4 font-lyon flex flex-col md:flex-row justify-center items-center">
      <div
        className="w-full lg:w-1/2 space-y-10 py-20
      flex flex-col justify-center"
      >
        <h1 className="text-5xl lg:text-6xl">
          فحص نظر شامل مع استشاريين معتمدين
        </h1>
        <ul>
          <p>نوفر لك شبكة من أفضل أطباء العيون المعتمدين:</p>
          <li>✓ فحص نظر شامل ودقيق</li>
          <li>✓ استشارة مجانية لاختيار النظارة المناسبة</li>
          <li>✓ خصم 20% على النظارات بعد الكشف</li>
          <li>✓ متابعة دورية لصحة عينيك</li>
        </ul>
        <div className="flex justify-center md:justify-start flex-col items-center md:items-start">
          <Link
            href="/doctors"
            className="bg-amber-600 text-white px-4 py-2 rounded-md"
          >
            احجز موعدك الآن
          </Link>
          <p className="text-xs text-gray-600 mt-2">
            عبر الموقع أو بزيارة أي فرع
          </p>
        </div>
      </div>
      {/* <div className="hidden md:flex items-center justify-center p-8"> */}
      <div className="hidden md:flex items-center justify-center px-8 h-full py-20">
        <CardsFigure />
      </div>
    </section>
  );
}
