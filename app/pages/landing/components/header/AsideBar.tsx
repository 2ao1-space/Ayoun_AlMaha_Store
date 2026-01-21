import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface AsideBarProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function AsideBar({ onClose, children }: AsideBarProps) {
  const asideRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(asideRef.current, { xPercent: -100 });
    gsap.set(layersRef.current, { xPercent: -100 });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });

    const tl = gsap.timeline();

    tl.to(layersRef.current, {
      xPercent: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power4.out",
    })
      .to(
        asideRef.current,
        {
          xPercent: 0,
          duration: 0.45,
          ease: "power4.out",
        },
        "-=0.25",
      )
      .to(layersRef.current, {
        xPercent: 0,
        duration: 0.35,
        stagger: 0.08,
        ease: "power3.in",
      })
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.15",
      );
  }, []);

  return (
    <aside className="fixed w-full right-0 left-0 inset-0 z-50 flex justify-end items-end">
      <div onClick={onClose} className="absolute inset-0 w-full bg-black/30" />

      <div className="absolute w-full md:w-1/2 mr-auto flex justify-end inset-0 left-0 pointer-events-none">
        {["#f5f5f5", "#e5e5e5", "#d4d4d4"].map((color, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) layersRef.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div
        ref={asideRef}
        className="relative pt-14 px-4 z-10 w-full md:w-1/2 bg-mainColor h-full shadow-xl overflow-y-scroll"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 px-2 py-1 text-mainColor bg-accentPrimary rounded-full hover:bg-accentPrimary transition-colors"
        >
          <X className="w-4" />
        </button>
        <div ref={contentRef} className="p-6 relative h-full">
          {children}
        </div>
      </div>
    </aside>
  );
}
