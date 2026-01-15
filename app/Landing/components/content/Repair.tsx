import Link from "next/link";

export default function Repair() {
  return (
    <section
      className="h-screen flex justify-center"
      style={{
        backgroundImage: `url("/images/repair.png")`,
        backgroundSize: "cover",
        backgroundPosition: "50% 0%",
      }}
    >
      <div className="hidden md:flex justify-center items-center w-1/2"></div>
      <div className="w-full md:w-1/2 px-4 lg:px-32 space-y-4 bg-black/70 md:bg-transparent text-white md:text-darkness p-4 flex flex-col justify-center">
        <h1 className="font-lyon text-5xl md:text-[55px] lg:text-6xl mb-8">
          نظارتك اتكسرت؟ احنا هنا!
        </h1>
        <ul className="text-xl">
          <p>نوفر خدمة إصلاح شاملة لجميع أنواع النظارات:</p>
          <li>- تبديل العدسات</li>
          <li>- إصلاح الإطار</li>
          <li>- تغيير المفصلات والبراغي</li>
          {/* <li>- تلميع وتنظيف عميق</li> */}
        </ul>
        {/* مع ضمان على الإصلاح لمدة 6 أشهر */}
        <div>
          <Link
            href="/services/maintenance"
            className="bg-amber-600 text-white px-4 py-2 rounded-md text-xl"
          >
            تواصل الآن
          </Link>
        </div>
      </div>
    </section>
  );
}
