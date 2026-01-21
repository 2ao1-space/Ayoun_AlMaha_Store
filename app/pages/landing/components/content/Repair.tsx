import Link from "next/link";

export default function Repair() {
  return (
    <section
      className="h-screen flex justify-center"
      style={{
        backgroundImage: `url("/images/repair.png")`,
        backgroundSize: "cover",
        backgroundPosition: "80% 0%",
      }}
    >
      <div className="hidden md:flex justify-center items-center w-1/2"></div>
      <div className="w-full md:w-1/2 px-4 lg:px-32 space-y-4 bg-darkness/50 text-mainColor md:bg-transparent md:text-darkness p-4 flex flex-col justify-center">
        <h1 className="font-lyon text-5xl md:text-[55px] lg:text-6xl mb-8">
          نظارتك اتكسرت؟ احنا موجودين!
        </h1>
        <ul className="text-xl font-bold">
          <p>نوفر خدمة إصلاح شاملة لجميع أنواع النظارات:</p>
          <li>- تبديل العدسات</li>
          <li>- إصلاح الإطار</li>
          <li>- تغيير المفصلات والبراغي</li>
        </ul>
        <div>
          <Link
            href="/services/maintenance"
            className="bg-accentPrimary hover:bg-yellow-600 text-darkness px-4 py-2 rounded-md text-xl font-lifta"
          >
            تواصل الآن
          </Link>
        </div>
      </div>
    </section>
  );
}
