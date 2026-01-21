import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function BrandMarquee({ brands }: { brands: string[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth / 2;

    gsap.set(marquee, { x: 0 });

    const tween = gsap.to(marquee, {
      x: totalWidth,
      duration: 70,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        tween.timeScale(Math.max(1, Math.abs(velocity) / 300));
      },
    });
  }, []);

  return (
    <div ref={wrapperRef} className="overflow-hidden w-full py-4 md:py-10">
      <div
        ref={marqueeRef}
        className="flex w-max gap-20 text-darkness text-xl md:text-3xl lg:text-5xl font-bold"
      >
        {[...brands, ...brands].map((brand, i) => (
          <div key={i} className="whitespace-nowrap">
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
}
