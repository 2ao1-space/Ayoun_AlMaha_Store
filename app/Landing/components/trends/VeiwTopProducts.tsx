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
  }),
);

const sunGlasses: GlassesItem[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  title: `شمس ${i + 1}`,
  gender: i % 2 === 0 ? "men" : "women",
  tag: i % 3 === 0 ? "best" : i % 3 === 1 ? "new" : "sale",
}));

interface VeiwTopProductsProps {
  virtualTry: boolean;
  setVirtualTry: (value: boolean) => void;
  selectedGlasses: any;
  setSelectedGlasses: (value: any) => void;
}

export default function VeiwTopProducts({
  virtualTry,
  setVirtualTry,
  selectedGlasses,
  setSelectedGlasses,
}: VeiwTopProductsProps) {
  const [medicalFilter, setMedicalFilter] = useState<string | null>(null);
  const [sunFilter, setSunFilter] = useState<string | null>(null);
  const [medicalIndex, setMedicalIndex] = useState(0);
  const [sunIndex, setSunIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const medicalRef = useRef<HTMLDivElement | null>(null);
  const sunRef = useRef<HTMLDivElement | null>(null);

  const filteredMedical = medicalGlasses.filter((item) => {
    const tagMatch = medicalFilter === null || item.tag === medicalFilter;
    return tagMatch;
  });

  const filteredSun = sunGlasses.filter((item) => {
    const tagMatch = sunFilter === null || item.tag === sunFilter;
    return tagMatch;
  });

  useCarousel(medicalRef, [medicalFilter], setMedicalIndex);
  useCarousel(sunRef, [sunFilter], setSunIndex);

  type SlideDirection = "left" | "right";

  const slide = (
    ref: React.RefObject<HTMLDivElement>,
    dir: SlideDirection,
    setIndex: (index: number) => void,
  ) => {
    const track = ref.current;
    if (!track) return;

    const cardWidth = 250;
    const currentScroll = track.scrollLeft;
    const cardIndex = Math.round(currentScroll / cardWidth);
    const newIndex = dir === "right" ? cardIndex + 1 : cardIndex - 1;

    setIndex(newIndex);
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
      <CarouselBlock
        title="نظارات طبية"
        items={filteredMedical}
        filter={medicalFilter}
        setFilter={setMedicalFilter}
        trackRef={medicalRef}
        onLeft={() => slide(medicalRef, "left", setMedicalIndex)}
        onRight={() => slide(medicalRef, "right", setMedicalIndex)}
        cardIndex={medicalIndex}
        handleViewMore={() => handleViewMore("eye")}
        virtualTry={virtualTry}
        setVirtualTry={setVirtualTry}
        selectedGlasses={selectedGlasses}
        setSelectedGlasses={setSelectedGlasses}
      />

      <CarouselBlock
        title="نظارات شمسية"
        items={filteredSun}
        filter={sunFilter}
        setFilter={setSunFilter}
        trackRef={sunRef}
        onLeft={() => slide(sunRef, "left", setSunIndex)}
        onRight={() => slide(sunRef, "right", setSunIndex)}
        cardIndex={sunIndex}
        handleViewMore={() => handleViewMore("sun")}
        virtualTry={virtualTry}
        setVirtualTry={setVirtualTry}
        selectedGlasses={selectedGlasses}
        setSelectedGlasses={setSelectedGlasses}
      />
    </section>
  );
}
