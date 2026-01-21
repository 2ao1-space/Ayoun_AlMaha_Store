"use client";

import Header from "./components/header/Header";
import Hero from "./components/content/Hero";
import VeiwTopProducts from "./components/trends/VeiwTopProducts";
import Repair from "./components/content/Repair";
import BookDoctor from "./components/content/BookDoctor";
import { useEffect, useState } from "react";
import VirtualTryModal from "./components/trends/VirtualTryModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "./components/footer/Footer";
import BrandMarquee from "./components/content/BrandMarquee";
import AdsBoard from "./components/content/AdsBoard";
import { Product } from "./components/types/product";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type DoctorType = { id: number; src: string };

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

export default function LandingPage() {
  const [virtualTry, setVirtualTry] = useState(false);
  const [selectedGlasses, setSelectedGlasses] = useState<Product | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
          product={selectedGlasses}
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
