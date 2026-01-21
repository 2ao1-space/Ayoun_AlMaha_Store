"use client";
import {
  Bookmark,
  Camera,
  Heart,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProductImage {
  color: string;
  img: string;
}

interface Product {
  id: number;
  product_name: string;
  product_images: ProductImage[];
  product_price: string;
  product_discount: string;
  product_brand: string;
  product_description: string;
  product_type: string[];
  inventor_Kits: number;
  isfavoret: boolean;
  isWhishlist: boolean;
  isCart: boolean;
  isSale: boolean;
  isBestSeller: boolean;
  glass_type: string[];
}

interface VirtualTryModalProps {
  product: Product;
  onClose: () => void;
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const demoProducts: Product[] = [
  {
    id: 1,
    product_name: "نظارة شمسية كلاسيك",
    product_images: [
      { color: "#333", img: "/images/product_2.png" },
      { color: "#222", img: "/images/product_2.jpg" },
      { color: "#444", img: "/images/product_2.png" },
      { color: "#ff0", img: "/images/product_2.png" },
      { color: "#f0f", img: "/images/product_2.jpg" },
      { color: "#c09", img: "/images/product_2.png" },
      { color: "#777", img: "/images/product_2.png" },
      { color: "#484", img: "/images/product_2.jpg" },
      { color: "#923", img: "/images/product_2.png" },
    ],
    product_price: "1200",
    product_discount: "999",
    product_brand: "RayVision",
    product_description:
      "نظارة شمسية بإطار معدني أنيق، مناسبة للاستخدام اليومي وتوفر حماية كاملة من الأشعة فوق البنفسجية.",
    product_type: ["شمسية"],
    inventor_Kits: 12,
    isfavoret: false,
    isWhishlist: false,
    isCart: false,
    isSale: true,
    isBestSeller: true,
    glass_type: ["UV400", "Polarized"],
  },
  {
    id: 2,
    product_name: "نظارة طبية رجالي",
    product_images: [
      { color: "أسود", img: "/images/product_2.png" },
      { color: "رمادي", img: "/images/product_2.png" },
    ],
    product_price: "900",
    product_discount: "750",
    product_brand: "EyeCare",
    product_description:
      "نظارة طبية خفيفة الوزن، مناسبة للاستخدام الطويل بدون إجهاد للعين.",
    product_type: ["طبية"],
    inventor_Kits: 20,
    isfavoret: true,
    isWhishlist: false,
    isCart: false,
    isSale: true,
    isBestSeller: false,
    glass_type: ["Anti Reflective", "Blue Cut"],
  },
  {
    id: 3,
    product_name: "نظارة شمسية نسائي",
    product_images: [
      { color: "ذهبي", img: "/images/product_2.png" },
      { color: "روز", img: "/images/product_2.png" },
    ],
    product_price: "1500",
    product_discount: "1299",
    product_brand: "Luna",
    product_description:
      "نظارة شمسية بإطار عصري وتصميم أنيق يناسب الإطلالات اليومية.",
    product_type: ["شمسية"],
    inventor_Kits: 8,
    isfavoret: false,
    isWhishlist: true,
    isCart: false,
    isSale: false,
    isBestSeller: true,
    glass_type: ["UV400"],
  },
  {
    id: 4,
    product_name: "نظارة طبية للجنسين",
    product_images: [
      { color: "شفاف", img: "/images/product_2.png" },
      { color: "أسود", img: "/images/product_2.png" },
    ],
    product_price: "800",
    product_discount: "650",
    product_brand: "VisionPro",
    product_description:
      "نظارة طبية بتصميم بسيط يناسب الرجال والنساء، خامة عالية الجودة.",
    product_type: ["طبية"],
    inventor_Kits: 30,
    isfavoret: false,
    isWhishlist: false,
    isCart: true,
    isSale: true,
    isBestSeller: false,
    glass_type: ["Blue Cut"],
  },
  {
    id: 5,
    product_name: "نظارة شمسية رياضية",
    product_images: [
      { color: "أسود", img: "/images/product_2.png" },
      { color: "أحمر", img: "/images/product_2.png" },
    ],
    product_price: "1800",
    product_discount: "1499",
    product_brand: "ActiveEye",
    product_description:
      "نظارة شمسية رياضية مقاومة للصدمات، مثالية للأنشطة الخارجية.",
    product_type: ["شمسية", "رياضية"],
    inventor_Kits: 5,
    isfavoret: true,
    isWhishlist: true,
    isCart: false,
    isSale: true,
    isBestSeller: true,
    glass_type: ["UV400", "Polarized"],
  },
];

export default function VirtualTryModal({
  product,
  onClose,
  showLoginModal,
  setShowLoginModal,
}: VirtualTryModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [thumbDragStart, setThumbDragStart] = useState<number | null>(null);

  const displayProduct = product || demoProducts[0];

  useEffect(() => {
    document.body.style.overflow = "hidden";

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
      document.body.style.overflow = "";
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

  const nextImage = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % displayProduct.product_images.length,
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayProduct.product_images.length - 1 : prev - 1,
    );
  };

  const handleOverlayMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleOverlayTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };

  const handleOverlayMouseMove = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevImage();
      else nextImage();
      setDragStart(null);
    }
  };

  const handleOverlayTouchMove = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const diff = e.touches[0].clientX - dragStart;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevImage();
      else nextImage();
      setDragStart(null);
    }
  };

  const handleOverlayEnd = () => {
    setDragStart(null);
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (!thumbsRef.current) return;

    const isMobileView = window.innerWidth < 768;
    setThumbDragStart(isMobileView ? e.clientX : e.clientY);
  };

  const handleThumbTouchStart = (e: React.TouchEvent) => {
    setThumbDragStart(e.touches[0].clientX);
  };

  const handleThumbMouseMove = (e: React.MouseEvent) => {
    if (thumbDragStart === null || !thumbsRef.current) return;

    const isMobileView = window.innerWidth < 768;

    if (isMobileView) {
      const currentPos = e.clientX;
      const diff = thumbDragStart - currentPos;
      thumbsRef.current.scrollLeft += diff;
      setThumbDragStart(currentPos);
    } else {
      const currentPos = e.clientY;
      const diff = thumbDragStart - currentPos;
      thumbsRef.current.scrollTop += diff;
      setThumbDragStart(currentPos);
    }
  };

  const handleThumbTouchMove = (e: React.TouchEvent) => {
    if (thumbDragStart === null || !thumbsRef.current) return;

    const currentPos = e.touches[0].clientX;
    const diff = thumbDragStart - currentPos;
    thumbsRef.current.scrollLeft += diff;
    setThumbDragStart(currentPos);
  };

  const handleThumbEnd = () => {
    setThumbDragStart(null);
  };

  const currentImage = displayProduct.product_images[currentIndex];

  return (
    <div
      onClick={handleClose}
      className="fixed w-full h-screen overflow-y-scroll bg-black/70 top-0 left-0 inset-0 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white md:px-4 py-10 relative rounded-lg w-full md:w-2/3 h-auto lg:h-screen my-auto flex gap-4 overflow-y-scroll scroll scrollbar-hide"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 left-2 p-2 hover:bg-gray-100 z-50 rounded-full"
        >
          <X size={24} className="text-gray-800" />
        </button>

        <div className="flex justify-between flex-col lg:flex-row w-full space-y-4 py-4">
          <div className="w-full lg:w-2/3 h-screen lg:h-[550px] flex flex-col md:flex-row items-start justify-center gap-2 overflow-hidden relative">
            <div className="w-full md:w-[90%] rounded-lg overflow-hidden h-full relative">
              {error ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                  <Camera size={64} className="mx-auto mb-4" />
                  <p>{error}</p>
                </div>
              ) : (
                <div className="relative h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-screen lg:h-[565px] object-cover -scale-x-100 "
                  />

                  <div
                    ref={overlayRef}
                    className="absolute top-[40%] sm:top-[35%] w-[280px] left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    onMouseDown={handleOverlayMouseDown}
                    onMouseMove={handleOverlayMouseMove}
                    onMouseUp={handleOverlayEnd}
                    onMouseLeave={handleOverlayEnd}
                    onTouchStart={handleOverlayTouchStart}
                    onTouchMove={handleOverlayTouchMove}
                    onTouchEnd={handleOverlayEnd}
                  >
                    <Image
                      src={currentImage.img}
                      alt={displayProduct.product_name}
                      width={400}
                      height={150}
                      className="object-contain opacity-80 w-full select-none pointer-events-none scale-[1.2] sm:scale-100 lg:scale-110"
                      draggable={false}
                    />
                  </div>

                  <button
                    onClick={prevImage}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 bg-darkness/50 hover:bg-darkness p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight size={24} className="text-mainColor" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 bg-darkness/50 hover:bg-darkness p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft size={24} className="text-mainColor" />
                  </button>
                </div>
              )}
            </div>

            <div
              ref={thumbsRef}
              // style={{
              //   scrollbarWidth: "thin",
              //   scrollbarColor: "#999 #f1f1f1",
              // }}
              className="flex flex-row md:flex-col items-center gap-2 overflow-x-scroll md:overflow-y-scroll scrollbar-hide md:overflow-x-hidden cursor-grab active:cursor-grabbing select-none py-4 w-[10%] max-h-[120px] md:max-h-[550px] -shadow-md"
              onMouseDown={handleThumbMouseDown}
              onMouseMove={handleThumbMouseMove}
              onMouseUp={handleThumbEnd}
              onMouseLeave={handleThumbEnd}
              onTouchStart={handleThumbTouchStart}
              onTouchMove={handleThumbTouchMove}
              onTouchEnd={handleThumbEnd}
            >
              {displayProduct.product_images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative border-2 rounded-lg overflow-hidden transition-all flex-shrink-0 ${
                    idx === currentIndex
                      ? `shadow-lg scale-105`
                      : `hover:border-gray-400`
                  }`}
                  style={{
                    borderColor: idx === currentIndex ? img.color : "#e5e5e5",
                  }}
                >
                  <Image
                    src={img.img}
                    alt={`${displayProduct.product_name} - ${idx + 1}`}
                    width={100}
                    height={80}
                    className="object-contain w-12 h-12 lg:w-24 lg:h-20 pointer-events-none"
                    draggable={false}
                  />
                  <div
                    className="border h-4 w-full flex items-center justify-center"
                    style={{ background: img.color }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-lg flex flex-col items-stretch justify-between font-lifta">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-lifta">
                {displayProduct.product_name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  الشركة: {displayProduct.product_brand}
                </span>
                <span className="text-sm text-gray-600">
                  النوع: {displayProduct.product_type.join(" - ")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">اللون:</span>
                <span className="text-sm font-semibold">
                  {currentImage.color}
                </span>
              </div>

              <p className="text-lg text-gray-700 font-serif font-bold">
                {displayProduct.product_description}
              </p>
            </div>

            <div className="flex items-center my-10">
              <div className="flex-1 flex flex-col">
                {displayProduct.isSale && (
                  <span className="line-through text-gray-500 text-lg">
                    {displayProduct.product_discount} ج
                  </span>
                )}
                <span className="text-4xl font-bold ">
                  {displayProduct.product_price} ج
                </span>
              </div>
              <div className="flex flex-col justify-between gap-2">
                <span className="text-lg">المتبقي</span>
                <div className={`font-bold text-lg text-grayPrimary`}>
                  {displayProduct.inventor_Kits} قطع
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2 items-center">
              <button className="border border-gray-400 rounded-lg p-3 hover:bg-gray-200 transition-colors">
                <Heart
                  className="w-5 h-5"
                  fill={displayProduct.isfavoret ? "red" : "none"}
                />
              </button>
              <button className="border border-gray-400 rounded-lg p-3 hover:bg-gray-200 transition-colors">
                <Bookmark
                  className="w-5 h-5"
                  fill={displayProduct.isWhishlist ? "blue" : "none"}
                />
              </button>
              <button
                onClick={() => setShowLoginModal(!showLoginModal)}
                disabled={displayProduct.inventor_Kits === 0}
                className={`flex items-center justify-center border rounded-lg flex-1 px-4 py-3 gap-2 font-semibold transition-all ${
                  displayProduct.inventor_Kits === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "border-amber-400 text-amber-500 hover:bg-amber-400 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {displayProduct.inventor_Kits === 0 ? "غير متوفر" : "اطلب الآن"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
