import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AdsBoardProps {
  ads: string[];
  autoPlayDelay?: number;
}
export default function AdsBoard({ ads, autoPlayDelay = 5000 }: AdsBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnimationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goToSlide = (index: number) => {
    if (!trackRef.current || !containerWidth) return;

    progressAnimationRef.current?.kill();

    const newIndex = (index + ads.length) % ads.length;
    setCurrentIndex(newIndex);

    gsap.to(trackRef.current, {
      x: newIndex * containerWidth,
      duration: 0.8,
      ease: "power3.out",
    });

    const currentProgressBar = progressRefs.current[newIndex];
    if (currentProgressBar) {
      gsap.set(currentProgressBar, { width: "0%" });
      progressAnimationRef.current = gsap.to(currentProgressBar, {
        width: "100%",
        duration: autoPlayDelay / 1000,
        ease: "none",
      });
    }
  };

  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      progressAnimationRef.current?.pause();
      return;
    }

    progressAnimationRef.current?.resume();

    autoPlayRef.current = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoPlayDelay);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, autoPlayDelay, isPaused, containerWidth]);

  useEffect(() => {
    if (containerWidth > 0) {
      goToSlide(0);
    }
  }, [containerWidth]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100px] md:h-[150px] lg:h-[250px] overflow-hidden rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{
          width: `${ads.length * 100}%`,
          willChange: "transform",
        }}
      >
        {ads.map((ad, i) => (
          <div
            key={i}
            className="h-full flex items-start justify-center"
            style={{
              width: `${100 / ads.length}%`,
              flexShrink: 0,
            }}
          >
            <div className="w-[95%] md:w-[96%] lg:w-[97%] h-[70px] md:h-[120px] lg:h-[220px] relative rounded-lg shadow-lg overflow-hidden">
              <Image
                src={ad}
                alt={`ad ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="(max-width: 768px) 95vw, (max-width: 1024px) 96vw, 80vw"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="relative group"
            aria-label={`to ad ${i + 1}`}
          >
            <div
              className={`transition-all duration-300 rounded-full overflow-hidden ${
                currentIndex === i
                  ? "w-5 lg:w-10 h-2 lg:h-3 bg-gray-300"
                  : "w-2 lg:w-3 h-2 lg:h-3 bg-gray-400/60 group-hover:bg-gray-400"
              }`}
            >
              {currentIndex === i && (
                <div
                  ref={(el) => {
                    progressRefs.current[i] = el;
                  }}
                  className="h-full bg-gray-800 rounded-full"
                  style={{ width: "0%" }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
