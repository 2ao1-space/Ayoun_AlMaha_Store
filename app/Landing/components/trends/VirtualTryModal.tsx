"use client";
import { Bookmark, Camera, Heart, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Product } from "./carousel";

interface VirtualTryModalProps {
  glasses: Product;
  onClose: () => void;
  showLoginModal: boolean;
  setShowLoginModal: () => void;
}

export default function VirtualTryModal({
  glasses,
  onClose,
  showLoginModal,
  setShowLoginModal,
}: VirtualTryModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("لا يمكن الوصول للكاميرا");
        console.error(err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed w-full h-screen bg-darkness/70 top-0 left-0 inset-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-4 py-10 relative rounded-lg w-2/3 h-screen my-auto flex gap-4"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 left-2 p-2 hover:bg-gray-100 z-999"
        >
          <X size={24} className="text-darkness" />
        </button>
        <div className="w-2/3 flex flex-col md:flex-row items-start justify-center gap-2 overflow-hidden relative">
          <div className="w-full rounded-lg overflow-hidden h-full">
            {error ? (
              <div className="text-white text-center">
                <Camera size={64} className="mx-auto mb-4" />
                <p>{error}</p>
              </div>
            ) : (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-[565px] object-cover -scale-x-100"
                />

                <div className="absolute top-[70%] w-[220px] left-1/2 -translate-x-1/2 -translate-y-1/2 h-full">
                  <Image
                    src="/images/product_2.png"
                    alt={glasses.title}
                    width={400}
                    height={100}
                    className="object-contain opacity-70 rotate-90 w-[500px]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="border">
              <Image
                src="/images/product_2.png"
                alt={glasses.title}
                width={100}
                height={75}
                className="object-contain opacity-70 rotate-90"
              />
            </div>
            <div className="border">
              <Image
                src="/images/product_2.png"
                alt={glasses.title}
                width={100}
                height={75}
                className="object-contain opacity-70 rotate-90"
              />
            </div>
            <div className="border">
              <Image
                src="/images/product_2.png"
                alt={glasses.title}
                width={100}
                height={75}
                className="object-contain opacity-70 rotate-90"
              />
            </div>
          </div>
        </div>

        <div className="w-1/3 bg-gray-100 p-4 rounded-lg flex flex-col items-stretch justify-between">
          <div className="space-y-4">
            <h3 className="text-xl">{glasses.title}</h3>
            <div className="flex justify-between items-center">
              <span>الشركة : اسم البراند</span>
              <span className="text-sm text-gray-600">
                النوع: {glasses.gender === "men" ? "رجالي" : "نسائي"}
              </span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              odit accusantium recusandae ducimus id molestiae, nostrum alias
              qui quisquam eligendi quia harum, nihil magnam optio! Placeat qui
              molestiae natus quaerat!
            </p>
          </div>
          <div className="flex items-center my-10">
            <div className="flex-1 flex flex-col font-lifta">
              <span className="line-through text-gray-500  text-سة">350 ج</span>
              <span className="font-lifta text-5xl">299ج</span>
            </div>
            <div className="flex flex-col justify-between gap-4">
              <span className="text-xl">المتبقي</span>
              <div className="font-lifta">5 قطع</div>
            </div>
          </div>

          <div className="flex justify-between gap-2 items-center">
            <button className=" border border-darkness/50 rounded-lg px-3 py-1">
              <Heart className="w-4" />
            </button>
            <button className=" border border-darkness/50 rounded-lg px-3 py-1">
              <Bookmark className="w-4" />
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center border border-darkness/50 rounded-lg flex-1 px-3 py-1 gap-6 font-lifta text-yellow-500"
            >
              <ShoppingBag className="w-4" />
              اطلب الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { Bookmark, Camera, Heart, ShoppingBag, X } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// // Types
// interface ColorVariant {
//   id: string;
//   color_name: string;
//   color_hex: string;
//   image_url: string;
//   stock: number;
// }

// interface GlassesProduct {
//   id: string;
//   title: string;
//   brand: string;
//   gender: "men" | "women";
//   tag: "best" | "new" | "sale";
//   description: string;
//   price: number;
//   discount_price?: number;
//   main_image: string;
//   color_variants: ColorVariant[];
// }

// interface VirtualTryModalProps {
//   glasses: GlassesProduct;
//   onClose: () => void;
//   showLoginModal?: boolean;
//   setShowLoginModal?: (value: boolean) => void;
// }

// export default function VirtualTryModal({
//   glasses,
//   onClose,
//   showLoginModal,
//   setShowLoginModal,
// }: VirtualTryModalProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(
//     glasses.color_variants?.[0] || null,
//   );

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "user", width: 1280, height: 720 },
//         });
//         setStream(mediaStream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//         }
//       } catch (err) {
//         setError("لا يمكن الوصول للكاميرا");
//         console.error(err);
//       }
//     };

//     startCamera();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const handleClose = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     onClose();
//   };

//   const handleColorSelect = (color: ColorVariant) => {
//     setSelectedColor(color);
//   };

//   const currentImage = selectedColor?.image_url || glasses.main_image;
//   const currentStock = selectedColor?.stock || 0;

//   return (
//     <div
//       onClick={handleClose}
//       className="fixed w-full h-screen bg-darkness/70 top-0 left-0 inset-0 z-50 flex justify-center items-center p-4"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white px-4 py-10 relative rounded-lg w-full max-w-7xl h-[90vh] my-auto flex flex-col md:flex-row gap-4"
//       >
//         <button
//           onClick={handleClose}
//           className="absolute top-2 left-2 p-2 hover:bg-gray-100 rounded-full transition-colors z-50"
//         >
//           <X size={24} className="text-darkness" />
//         </button>

//         {/* Camera Section */}
//         <div className="w-full md:w-2/3 flex flex-col md:flex-row items-start justify-center gap-2 overflow-hidden relative">
//           <div className="w-full rounded-lg overflow-hidden h-full">
//             {error ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-600">
//                 <Camera size={64} className="mx-auto mb-4" />
//                 <p>{error}</p>
//               </div>
//             ) : (
//               <div className="relative h-full">
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   muted
//                   className="w-full h-full object-cover -scale-x-100 rounded-lg"
//                 />

//                 {/* Glasses Overlay */}
//                 <div className="absolute top-[40%] w-[280px] left-1/2 -translate-x-1/2 -translate-y-1/2">
//                   <Image
//                     src={currentImage}
//                     alt={glasses.title}
//                     width={500}
//                     height={200}
//                     className="object-contain opacity-80"
//                     priority
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Color Variants Thumbnails */}
//           <div className="flex md:flex-col items-center gap-2 overflow-x-auto md:overflow-y-auto scrollbar-hide">
//             {glasses.color_variants?.map((variant) => (
//               <button
//                 key={variant.id}
//                 onClick={() => handleColorSelect(variant)}
//                 className={`relative border-2 rounded-lg overflow-hidden transition-all hover:scale-105 ${
//                   selectedColor?.id === variant.id
//                     ? "border-amber-500 shadow-lg"
//                     : "border-gray-300"
//                 }`}
//               >
//                 <Image
//                   src={variant.image_url}
//                   alt={variant.color_name}
//                   width={100}
//                   height={75}
//                   className="object-contain w-24 h-20"
//                 />
//                 <div
//                   className="absolute bottom-0 left-0 right-0 h-2"
//                   style={{ backgroundColor: variant.color_hex }}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg flex flex-col justify-between overflow-y-auto">
//           <div className="space-y-4">
//             <h3 className="text-2xl font-bold">{glasses.title}</h3>

//             <div className="flex justify-between items-center text-sm">
//               <span className="text-gray-600">
//                 الشركة: <span className="font-semibold">{glasses.brand}</span>
//               </span>
//               <span className="text-gray-600">
//                 النوع: {glasses.gender === "men" ? "رجالي" : "نسائي"}
//               </span>
//             </div>

//             {/* Selected Color */}
//             {selectedColor && (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">اللون:</span>
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-6 h-6 rounded-full border-2 border-gray-300"
//                     style={{ backgroundColor: selectedColor.color_hex }}
//                   />
//                   <span className="text-sm font-medium">
//                     {selectedColor.color_name}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* Available Colors */}
//             <div className="space-y-2">
//               <span className="text-sm text-gray-600">الألوان المتاحة:</span>
//               <div className="flex gap-2 flex-wrap">
//                 {glasses.color_variants?.map((variant) => (
//                   <button
//                     key={variant.id}
//                     onClick={() => handleColorSelect(variant)}
//                     className={`relative w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
//                       selectedColor?.id === variant.id
//                         ? "border-amber-500 ring-2 ring-amber-300"
//                         : "border-gray-300"
//                     }`}
//                     style={{ backgroundColor: variant.color_hex }}
//                     title={variant.color_name}
//                   >
//                     {variant.stock === 0 && (
//                       <div className="absolute inset-0 bg-white/70 rounded-full flex items-center justify-center">
//                         <X size={16} className="text-red-500" />
//                       </div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <p className="text-sm text-gray-700 leading-relaxed">
//               {glasses.description}
//             </p>
//           </div>

//           {/* Price and Stock */}
//           <div className="flex items-center justify-between my-6 p-4 bg-white rounded-lg">
//             <div className="flex-1 flex flex-col font-lifta">
//               {glasses.discount_price && (
//                 <span className="line-through text-gray-400 text-lg">
//                   {glasses.price} ج
//                 </span>
//               )}
//               <span className="font-lifta text-4xl text-amber-600">
//                 {glasses.discount_price || glasses.price} ج
//               </span>
//             </div>
//             <div className="flex flex-col items-end gap-1">
//               <span className="text-sm text-gray-600">المتبقي</span>
//               <div
//                 className={`font-semibold text-lg ${
//                   currentStock < 5 ? "text-red-500" : "text-green-600"
//                 }`}
//               >
//                 {currentStock} قطعة
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-between gap-2 items-center">
//             <button className="border border-darkness/50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
//               <Heart className="w-5 h-5" />
//             </button>
//             <button className="border border-darkness/50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
//               <Bookmark className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setShowLoginModal?.(true)}
//               disabled={currentStock === 0}
//               className={`flex items-center justify-center border rounded-lg flex-1 px-4 py-3 gap-2 font-semibold transition-all ${
//                 currentStock === 0
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white"
//               }`}
//             >
//               <ShoppingBag className="w-5 h-5" />
//               {currentStock === 0 ? "غير متوفر" : "اطلب الآن"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
