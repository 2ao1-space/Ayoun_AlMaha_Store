"use client";

import { useRef, useState } from "react";
import CarouselBlock from "./carousel";
import useCarousel from "../../hooks/carouselAnimation";
import { Product } from "../types/product";

const medicalGlasses: Partial<Product>[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: `med-${i}`,
    title: `طبي ${i + 1}`,
    brand: "Al Maha",
    gender: i % 2 === 0 ? "men" : "women",
    tag: i % 3 === 0 ? "best" : i % 3 === 1 ? "new" : "sale",
    category: "medical",
    description: "وصف المنتج",
    price: 350,
    discount_price: 299,
    main_image: "/images/product_2.png",
  }),
);

const sunGlasses: Partial<Product>[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: `sun-${i}`,
    title: `شمس ${i + 1}`,
    brand: "Al Maha",
    gender: i % 2 === 0 ? "men" : "women",
    tag: i % 3 === 0 ? "best" : i % 3 === 1 ? "new" : "sale",
    category: "sun",
    description: "وصف المنتج",
    price: 350,
    discount_price: 299,
    main_image: "/images/product_2.png",
  }),
);

interface VeiwTopProductsProps {
  virtualTry: boolean;
  setVirtualTry: (value: boolean) => void;
  selectedGlasses: Product | null;
  setSelectedGlasses: (value: Product | null) => void;
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
  const [isLoggedIn] = useState(false);
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
    ref: React.RefObject<HTMLDivElement | null>,
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
      setShowLoginModal(!showLoginModal);
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

// export function DemoVirtualTry() {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">تجربة النظارات</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {demoProducts.map((product) => (
//           <div
//             key={product.id}
//             className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
//             onClick={() => {
//               setSelectedProduct(product);
//               setShowModal(true);
//             }}
//           >
//             <Image
//               src={product.product_images[0].img}
//               alt={product.product_name}
//               width={300}
//               height={200}
//               className="w-full h-48 object-contain mb-4"
//             />
//             <h3 className="font-bold text-lg">{product.product_name}</h3>
//             <p className="text-gray-600">{product.product_brand}</p>
//             <p className="text-amber-600 font-bold mt-2">
//               {product.product_price} ج
//             </p>
//           </div>
//         ))}
//       </div>

//       {showModal && selectedProduct && (
//         <VirtualTryModal
//           product={selectedProduct}
//           onClose={() => setShowModal(false)}
//           showLoginModal={showLoginModal}
//           setShowLoginModal={setShowLoginModal}
//         />
//       )}
//     </div>
//   );
// }
