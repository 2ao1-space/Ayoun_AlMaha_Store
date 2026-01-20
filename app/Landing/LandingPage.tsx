"use client";

import Header from "./components/header/Header";
import Hero from "./components/content/Hero";
import VeiwTopProducts from "./components/trends/VeiwTopProducts";
import Repair from "./components/content/Repair";
import BookDoctor from "./components/content/BookDoctor";
import { useEffect, useRef, useState } from "react";
import { Product } from "./components/trends/carousel";
import VirtualTryModal from "./components/trends/VirtualTryModal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "./components/footer/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type DoctorType = { id: number; src: string };

export default function LandingPage() {
  const [virtualTry, setVirtualTry] = useState(false);
  const [selectedGlasses, setSelectedGlasses] = useState<Product | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const brands = [
    "Ray-Ban",
    "Oakley",
    "Persol",
    "Maui Jim",
    "Carrera",
    "Polaroid",
    "Arnette",
    "Quay Australia",
    "Hawkers",
    "Vogue Eyewear",
    "Emporio Armani",
    "Giorgio Armani",
    "Tommy Hilfiger",
    "Calvin Klein",
    "Hugo Boss",
    "Guess",
    "Lacoste",
    "Police",
    "Furla",
    "Gucci",
    "Prada",
    "Dior",
    "Chanel",
    "Versace",
    "Dolce & Gabbana",
    "Burberry",
    "Saint Laurent",
    "Balenciaga",
    "Fendi",
    "Cartier",
  ];

  const Doctors: DoctorType[] = [
    { id: 1, src: "/images/Cards_Img/auth_pic1.png" },
    { id: 2, src: "/images/Cards_Img/auth_pic1.png" },
    { id: 3, src: "/images/Cards_Img/auth_pic2.png" },
    { id: 4, src: "/images/Cards_Img/auth_pic3.png" },
    { id: 5, src: "/images/Cards_Img/auth_pic4.png" },
    { id: 6, src: "/images/Cards_Img/auth_pic5.png" },
    { id: 7, src: "/images/Cards_Img/auth_pic6.png" },
    { id: 8, src: "/images/Cards_Img/auth_pic7.png" },
    { id: 9, src: "/images/Cards_Img/auth_pic8.png" },
    { id: 10, src: "/images/Cards_Img/auth_pic9.png" },
    { id: 11, src: "/images/Cards_Img/auth_pic10.png" },
    { id: 12, src: "/images/Cards_Img/auth_pic11.png" },
  ];

  const adsContent = [
    "/images/ad1_1.png",
    "/images/ad2_2.png",
    "/images/ad3_3.png",
  ];

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother?.kill();
    };
  }, []);

  return (
    <main className="bg-light relative font-serif">
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />

          <AdsBoard ads={adsContent} />

          <VeiwTopProducts
            virtualTry={virtualTry}
            setVirtualTry={setVirtualTry}
            selectedGlasses={selectedGlasses}
            setSelectedGlasses={setSelectedGlasses}
          />

          <BrandMarquee brands={brands} />

          <BookDoctor Doctors={Doctors} />

          <Repair />

          <Footer />
        </div>
      </div>

      {virtualTry && selectedGlasses && (
        <VirtualTryModal
          glasses={selectedGlasses}
          onClose={() => {
            setVirtualTry(false);
            setSelectedGlasses(null);
          }}
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </main>
  );
}

function BrandMarquee({ brands }: { brands: string[] }) {
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
    <div ref={wrapperRef} className="overflow-hidden w-full py-10">
      <div
        ref={marqueeRef}
        className="flex w-max gap-20 text-darkness text-5xl font-bold"
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

interface AdsBoardProps {
  ads: string[];
  autoPlayDelay?: number;
}
const AdsBoard = ({ ads, autoPlayDelay = 5000 }: AdsBoardProps) => {
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
};
