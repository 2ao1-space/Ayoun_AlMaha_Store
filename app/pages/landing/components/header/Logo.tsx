import Link from "next/link";

export default function Logo() {
  const scrollToTop = (e?: React.MouseEvent) => {
    e?.preventDefault();
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  return (
    <div className=" w-1/2 md:w-1/3">
      <Link
        onClick={scrollToTop}
        href="/"
        className="relative top-0 text-xl lg:text-2xl font-lifta"
      >
        عمــار ياســر
      </Link>
    </div>
  );
}
