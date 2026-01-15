"use client";

import { useRef, useState } from "react";
import CarouselBlock from "./carousel";
import useCarousel from "../../hooks/carouselAnimation";

interface GlassesItem {
  id: number;
  title: string;
  gender: "men" | "women";
  tag: "best" | "new" | "sale";
}

const medicalGlasses: GlassesItem[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: i,
    title: `طبي ${i + 1}`,
    gender: i % 2 === 0 ? "men" : "women",
    tag: i % 3 === 0 ? "best" : i % 3 === 1 ? "new" : "sale",
  })
);

const sunGlasses: GlassesItem[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  title: `شمس ${i + 1}`,
  gender: i % 2 === 0 ? "men" : "women",
  tag: i % 3 === 0 ? "best" : i % 3 === 1 ? "new" : "sale",
}));

export default function VeiwTopProducts() {
  const [gender, setGender] = useState<"men" | "women" | null>(null);
  const [medicalFilter, setMedicalFilter] = useState<string | null>(null);
  const [sunFilter, setSunFilter] = useState<string | null>(null);
  const [itemIndex, setItemIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [tryNow, setTryNow] = useState(false);

  const medicalRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  const filteredMedical = medicalGlasses.filter((item) => {
    const genderMatch = gender === null || item.gender === gender;
    const tagMatch = medicalFilter === null || item.tag === medicalFilter;
    return genderMatch && tagMatch;
  });

  const filteredSun = sunGlasses.filter((item) => {
    const genderMatch = gender === null || item.gender === gender;
    const tagMatch = sunFilter === null || item.tag === sunFilter;
    return genderMatch && tagMatch;
  });

  useCarousel(medicalRef, [gender, medicalFilter], setItemIndex);
  useCarousel(sunRef, [gender, sunFilter], setItemIndex);

  type SlideDirection = "left" | "right";

  const slide = (ref: React.RefObject<HTMLDivElement>, dir: SlideDirection) => {
    const track = ref.current;
    if (!track) return;

    const cardWidth = 250;
    const currentScroll = track.scrollLeft;
    const cardIndex = Math.round(currentScroll / cardWidth);
    setItemIndex(cardIndex);
    console.log(cardIndex);
    const newIndex = dir === "right" ? cardIndex + 1 : cardIndex - 1;

    track.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  const handleViewMore = (type: string) => {
    if (isLoggedIn) {
      window.location.href =
        type === "eye" ? "/medical-glasses" : "/sunglasses";
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <section className="container mx-auto mt-20 pt-10 px-4">
      <ul className="sticky top-[100px] w-80 flex justify-center shadow-sm z-10 gap-6 font-bold border py-2 mb-10 px-10  rounded-full bg-white mx-auto font-lyon">
        <li
          className={`cursor-pointer transition-colors ${
            gender === null
              ? "text-amber-600 border-b-2 border-amber-600"
              : "hover:text-amber-500"
          }`}
          onClick={() => setGender(null)}
        >
          الجميع
        </li>
        <li
          className={`cursor-pointer transition-colors ${
            gender === "men"
              ? "text-amber-600 border-b-2 border-amber-600"
              : "hover:text-amber-500"
          }`}
          onClick={() => setGender("men")}
        >
          رجالي
        </li>
        <li
          className={`cursor-pointer transition-colors ${
            gender === "women"
              ? "text-amber-600 border-b-2 border-amber-600"
              : "hover:text-amber-500"
          }`}
          onClick={() => setGender("women")}
        >
          نسائي
        </li>
      </ul>

      <CarouselBlock
        title="نظارات طبية"
        items={filteredMedical}
        filter={medicalFilter}
        setFilter={setMedicalFilter}
        trackRef={medicalRef}
        onLeft={() => {
          slide(medicalRef, "left");
        }}
        onRight={() => {
          slide(medicalRef, "right");
        }}
        cardIndex={itemIndex}
        handleViewMore={() => handleViewMore("eye")}
        tryNow={tryNow}
        setTryNow={setTryNow}
      />

      <CarouselBlock
        title="نظارات شمسية"
        items={filteredSun}
        filter={sunFilter}
        setFilter={setSunFilter}
        trackRef={sunRef}
        onLeft={() => {
          slide(medicalRef, "left");
        }}
        onRight={() => {
          slide(medicalRef, "right");
        }}
        cardIndex={itemIndex}
        handleViewMore={() => handleViewMore("sun")}
        tryNow={tryNow}
        setTryNow={setTryNow}
      />
    </section>
  );
}
