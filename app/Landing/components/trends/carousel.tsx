import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ColorVariant {
  id: string;
  color_name: string;
  color_hex: string;
  image_url: string;
  stock: number;
  is_available: boolean;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  gender: "men" | "women" | "unisex";
  tag: "best" | "new" | "sale";
  category: "medical" | "sun" | "sports";
  description: string;
  price: number;
  discount_price?: number;
  main_image: string;
  color_variants?: ColorVariant[];
}

interface CarouselBlockProps {
  title: string;
  items: Product[];
  filter: string | null;
  setFilter: (filter: string | null) => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onLeft: () => void;
  onRight: () => void;
  cardIndex: number;
  handleViewMore: (type: string) => void;
  virtualTry: boolean;
  setVirtualTry: (value: boolean) => void;
  selectedGlasses: Product | null;
  setSelectedGlasses: (item: Product) => void;
}

export default function CarouselBlock({
  title,
  items,
  filter,
  setFilter,
  trackRef,
  onLeft,
  onRight,
  cardIndex,
  handleViewMore,
  setVirtualTry,
  setSelectedGlasses,
}: CarouselBlockProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const filterControls = [
    { label: "الكل", value: null, action: () => setFilter(null) },
    { label: "الأكثر مبيعًا", value: "best", action: () => setFilter("best") },
    { label: "جديد", value: "new", action: () => setFilter("new") },
    { label: "مخفض", value: "sale", action: () => setFilter("sale") },
  ];

  const handleVirtualTry = (item: Product) => {
    setSelectedGlasses(item);
    setVirtualTry(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    trackRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (trackRef.current) {
        trackRef.current.style.cursor = "grab";
      }
    }
  };

  return (
    <div className="md:py-10 font-lyon w-full">
      <div className="flex flex-col md:flex-row justify-center md:justify-between gap-2 md:gap-20 lg:items-end mb-4 lg:mb-10">
        <h2 className="text-2xl lg:text-6xl font-lifta text-center md:text-start">
          {title}
        </h2>

        <ul className="flex justify-center flex-wrap gap-2">
          {filterControls.map((control) => (
            <li
              key={control.value || "all"}
              onClick={control.action}
              className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-full ${
                filter === control.value
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-light text-gray-600 hover:bg-gray-200"
              }`}
            >
              {control.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative pb-10 pt-4">
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="flex overflow-x-auto scrollbar-hide md:px-4 lg:px-10 select-none cursor-grab gap-4"
          style={{
            WebkitOverflowScrolling: "auto",
            scrollBehavior: "auto",
          }}
        >
          {items.map((item, i) => (
            // <ProductCard
            //   key={item.id}
            //   item={item}
            //   onTryNow={() => handleVirtualTry(item)}
            // />
            <div
              key={i}
              className="w-[220px] lg:w-[260px] flex-shrink-0 h-[250px] md:h-[330px] lg:h-[400px] bg-light p-4 border border-gray-300 group relative"
              onDragStart={(e) => e.preventDefault()}
            >
              <Image
                src={`/images/product_2.png`}
                alt={item.title}
                width={150}
                height={200}
                className="object-contain h-full w-full pointer-events-none"
                draggable={false}
              />

              <div className="absolute top-0 left-0 p-4 w-full flex flex-col justify-between h-full pointer-events-none">
                <div className="w-full flex justify-between items-start">
                  <span className="font-ksa text-sm select-none">
                    {item.title}
                  </span>

                  <ul className="flex -space-x-1">
                    <li className="bg-red-200 w-4 h-4 rounded-full"></li>
                    <li className="bg-red-300 w-4 h-4 rounded-full"></li>
                    <li className="bg-red-400 w-4 h-4 rounded-full"></li>
                    <li className="bg-red-500 w-4 h-4 rounded-full"></li>
                  </ul>
                </div>
                <div className="w-full flex justify-between items-start">
                  <button
                    onClick={() => handleVirtualTry(item)}
                    className="text-xs p-1 group-hover:bg-white/70 rounded-full pointer-events-auto"
                  >
                    جرب الآن
                  </button>
                  <span className="select-none">
                    299
                    <sub className="line-through text-gray-500 mx-2">350</sub>
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleViewMore}
            className="w-[220px] lg:w-[260px] flex-shrink-0 h-[250px] md:h-[330px] lg:h-[400px] bg-light p-4 border group relative hover:border-amber-500 transition-all"
          >
            <div className="p-4 w-full flex items-center justify-center h-full">
              <span className="font-lifta text-3xl lg:text-4xl text-darkness group-hover:scale-110 transition-transform">
                عرض المزيد ←
              </span>
            </div>
          </button>
        </div>

        <div className="relative md:absolute top-1/2 -translate-y-1/2 w-full flex justify-between gap-10 items-center my-8 md:my-0 h-10 md:h-auto pointer-events-none">
          {cardIndex === 0 ? null : (
            <button
              onClick={onRight}
              className="absolute right-0 bg-darkness/90 hover:bg-darkness border border-darkness px-2 py-1 shadow-lg rounded-full transition-all pointer-events-auto"
            >
              <ChevronRight className="w-4 text-white" />
            </button>
          )}
          {cardIndex < items.length - 1 && (
            <button
              onClick={onLeft}
              className="absolute left-0 bg-darkness/90 hover:bg-darkness border border-darkness px-2 py-1 shadow-lg rounded-full transition-all pointer-events-auto"
            >
              <ChevronLeft className="w-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// interface ProductCardProps {
//   item: Product;
//   onTryNow: () => void;
// }

// function ProductCard({ item, onTryNow }: ProductCardProps) {
//   const availableColors =
//     item.color_variants?.filter((c) => c.is_available) || [];
//   const totalStock = availableColors.reduce((sum, c) => sum + c.stock, 0);

//   return (
//     // <div
//     //   className="w-[220px] lg:w-[260px] flex-shrink-0 h-[250px] md:h-[330px] lg:h-[400px] bg-light p-4 border border-gray-300 rounded-lg group relative overflow-hidden hover:shadow-xl transition-all duration-300"
//     //   onDragStart={(e) => e.preventDefault()}
//     // >
//     //   {/* Sale Badge */}
//     //   {item.tag === "sale" && item.discount_price && (
//     //     <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
//     //       خصم{" "}
//     //       {Math.round(((item.price - item.discount_price) / item.price) * 100)}%
//     //     </div>
//     //   )}

//     //   {/* New Badge */}
//     //   {item.tag === "new" && (
//     //     <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
//     //       جديد
//     //     </div>
//     //   )}

//     //   {/* Best Seller Badge */}
//     //   {item.tag === "best" && (
//     //     <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
//     //       الأكثر مبيعاً
//     //     </div>
//     //   )}

//     //   {/* Product Image */}
//     //   <div className="relative h-2/3">
//     //     <Image
//     //       src={item.main_image}
//     //       alt={item.title}
//     //       fill
//     //       className="object-contain pointer-events-none"
//     //       draggable={false}
//     //     />
//     //   </div>

//     //   {/* Product Info Overlay */}
//     //   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
//     //     <div className="flex justify-between items-start mb-2">
//     //       <div className="flex-1">
//     //         <h3 className="font-semibold text-sm select-none truncate">
//     //           {item.title}
//     //         </h3>
//     //         <p className="text-xs text-gray-500 select-none">{item.brand}</p>
//     //       </div>

//     //       {/* Available Colors */}
//     //       {availableColors.length > 0 && (
//     //         <div className="flex -space-x-1">
//     //           {availableColors.slice(0, 4).map((color) => (
//     //             <div
//     //               key={color.id}
//     //               className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
//     //               style={{ backgroundColor: color.color_hex }}
//     //               title={color.color_name}
//     //             />
//     //           ))}
//     //           {availableColors.length > 4 && (
//     //             <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm bg-gray-300 flex items-center justify-center text-[8px] font-bold">
//     //               +{availableColors.length - 4}
//     //             </div>
//     //           )}
//     //         </div>
//     //       )}
//     //     </div>

//     //     {/* Price and CTA */}
//     //     <div className="flex justify-between items-center">
//     //       <button
//     //         onClick={onTryNow}
//     //         className="text-xs px-3 py-1 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all pointer-events-auto font-medium"
//     //       >
//     //         جرب الآن
//     //       </button>

//     //       <div className="flex flex-col items-end select-none">
//     //         {item.discount_price ? (
//     //           <>
//     //             <span className="text-sm font-bold text-amber-600">
//     //               {item.discount_price} ج
//     //             </span>
//     //             <span className="text-xs line-through text-gray-400">
//     //               {item.price} ج
//     //             </span>
//     //           </>
//     //         ) : (
//     //           <span className="text-sm font-bold">{item.price} ج</span>
//     //         )}
//     //       </div>
//     //     </div>

//     //     {/* Stock Indicator */}
//     //     {totalStock < 10 && totalStock > 0 && (
//     //       <div className="mt-2 text-xs text-red-500 font-medium">
//     //         متبقي {totalStock} قطعة فقط!
//     //       </div>
//     //     )}
//     //     {totalStock === 0 && (
//     //       <div className="mt-2 text-xs text-gray-500 font-medium">
//     //         غير متوفر حالياً
//     //       </div>
//     //     )}
//     //   </div>
//     // </div>
//     <div className="md:py-10 font-lyon">
//       <div className="flex flex-col md:flex-row justify-center md:justify-between gap-2 md:gap-20 lg:items-end mb-4 lg:mb-10">
//         <h2 className="text-2xl lg:text-6xl font-lifta text-center md:text-start">
//           {title}
//         </h2>

//         <ul className="flex justify-center">
//           {filterControls.map((control) => (
//             <li
//               key={control.value || "all"}
//               onClick={control.action}
//               className={`cursor-pointer transition-colors px-4 py-2 rounded-full
//           ${
//             filter === control.value
//               ? "bg-white text-black"
//               : "bg-light text-gray-600"
//           }`}
//             >
//               {control.label}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="relative pb-20 pt-4">
//         <div
//           ref={trackRef}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseLeave}
//           className="flex overflow-x-auto scrollbar-hide md:px-4 lg:px-10 select-none cursor-grab"
//           style={{
//             WebkitOverflowScrolling: "auto",
//             scrollBehavior: "auto",
//           }}
//         >
//           {items.map((item, i) => (
//             <div
//               key={i}
//               className="w-[220px] lg:w-[260px] flex-shrink-0 h-[250px] md:h-[330px] lg:h-[400px] bg-light p-4 border border-gray-300 group relative"
//               onDragStart={(e) => e.preventDefault()} // منع drag للصورة
//             >
//               <Image
//                 src={`/images/product_2.png`}
//                 alt={item.title}
//                 width={150}
//                 height={200}
//                 className="object-contain h-full w-full pointer-events-none" // منع selection
//                 draggable={false} // منع drag
//               />

//               <div className="absolute top-0 left-0 p-4 w-full flex flex-col justify-between h-full pointer-events-none">
//                 <div className="w-full flex justify-between items-start">
//                   <span className="font-ksa text-sm select-none">
//                     {item.title}
//                   </span>

//                   <ul className="flex -space-x-1">
//                     <li className="bg-red-200 w-4 h-4 rounded-full"></li>
//                     <li className="bg-red-300 w-4 h-4 rounded-full"></li>
//                     <li className="bg-red-400 w-4 h-4 rounded-full"></li>
//                     <li className="bg-red-500 w-4 h-4 rounded-full"></li>
//                   </ul>
//                 </div>
//                 <div className="w-full flex justify-between items-start">
//                   <button
//                     onClick={() => handleVirtualTry(item)}
//                     className="text-xs p-1 group-hover:bg-white/70 rounded-full pointer-events-auto"
//                   >
//                     جرب الآن
//                   </button>
//                   <span className="select-none">
//                     299
//                     <sub className="line-through text-gray-500 mx-2">350</sub>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             onClick={handleViewMore}
//             className="w-[220px] lg:w-[260px] flex-shrink-0 h-[250px] md:h-[330px] lg:h-[400px] bg-light p-4 border border-gray-300 group relative pointer-events-auto"
//           >
//             <div className="p-4 w-full flex items-center justify-start h-full">
//               <span className="font-ksa text-4xl rotate-90 select-none">
//                 عرض المزيد
//               </span>
//             </div>
//           </button>
//         </div>

//         <div className="relative md:absolute top-1/2 -translate-y-1/2 w-full flex justify-between gap-10 items-center my-8 md:my-0 h-10 md:h-auto pointer-events-none">
//           {cardIndex === 0 ? null : (
//             <button
//               onClick={onRight}
//               className="absolute right-0 bg-darkness/90 hover:bg-darkness border border-darkness px-2 py-1 shadow-lg rounded-full transition-all pointer-events-auto"
//             >
//               <ChevronRight className="w-4 text-white" />
//             </button>
//           )}
//           {cardIndex < items.length - 1 && (
//             <button
//               onClick={onLeft}
//               className="absolute left-0 bg-darkness/90 hover:bg-darkness border border-darkness px-2 py-1 shadow-lg rounded-full transition-all pointer-events-auto"
//             >
//               <ChevronLeft className="w-4 text-white" />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
