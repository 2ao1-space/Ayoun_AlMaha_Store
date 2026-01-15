import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  ScanFace,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CarouselItem {
  id: string | number;
  title: string;
  gender: "men" | "women";
  tag: "best" | "new" | "sale";
}

interface CarouselBlockProps {
  title: string;
  items: CarouselItem[];
  filter: string | null;
  setFilter: (filter: string | null) => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onLeft: () => void;
  onRight: () => void;
  cardIndex: number;
  handleViewMore: (type: string) => void;
  showLoginModal: boolean;
  setShowLoginModal: () => void;
  tryNow: boolean;
  setTryNow: () => void;
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
  showLoginModal,
  setShowLoginModal,
  tryNow,
  setTryNow,
}: CarouselBlockProps) {
  const filterControls = [
    {
      label: "الكل",
      value: null,
      action: () => setFilter(null),
    },
    {
      label: "الأكثر مبيعًا",
      value: "best",
      action: () => setFilter("best"),
    },
    {
      label: "جديد",
      value: "new",
      action: () => setFilter("new"),
    },
    {
      label: "مخفض",
      value: "sale",
      action: () => setFilter("sale"),
    },
  ];

  const [virtualTry, setVirtualTry] = useState(false);
  const [selectedGlasses, setSelectedGlasses] = useState<CarouselItem | null>(
    null
  );

  const handleVirtualTry = (item: CarouselItem) => {
    setSelectedGlasses(item);
    setVirtualTry(true);
  };

  return (
    <>
      <div className="md:py-10 font-lyon">
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-2 md:gap-20 lg:items-end mb-4 lg:mb-10">
          <h2 className="text-2xl lg:text-6xl font-lifta text-center md:text-start">
            {title}
          </h2>

          <ul className="flex justify-center">
            {filterControls.map((control) => (
              <li
                key={control.value}
                onClick={control.action}
                className={`cursor-pointer transition-colors px-4 py-2 rounded-full
              ${
                filter === control.value
                  ? "bg-white text-black"
                  : "bg-light text-gray-600"
              }`}
              >
                {control.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative pb-20 pt-4">
          <div
            ref={trackRef}
            // className="flex overflow-x-auto scrollbar-hide cursor-grab select-none px-12"
            className="flex overflow-x-auto scrollbar-hide md:px-4 lg:px-10"
            style={{
              WebkitOverflowScrolling: "auto",
              scrollBehavior: "auto",
              // WebkitOverflowScrolling: "touch",
            }}
          >
            {items.map((item) => (
              <>
                <div
                  key={item.id}
                  className="w-[220px] lg:w-[260px] flex-shrink-0 h-[250px] md:h-[330px] lg:h-[400px] bg-light p-4 border border-gray-300 group relative"
                >
                  <Image
                    src={`/images/product_2.png`}
                    alt={item.title}
                    width={150}
                    height={200}
                    className="object-contain h-full w-full"
                  />

                  <div className="absolute top-0 left-0 p-4 w-full flex flex-col justify-between h-full">
                    <div className="w-full flex justify-between items-start">
                      <span className="font-ksa text-sm">{item.title}</span>

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
                        className="text-xs p-1 group-hover:bg-white/70 rounded-full"
                      >
                        جرب الآن
                        {/* <ScanFace /> */}
                      </button>
                      {/* <button onClick={() => setTryNow(tryNow)}>جرب الآن</button> */}
                      <span className="">
                        299
                        <sub className="line-through text-gray-500 mx-2">
                          350
                        </sub>
                      </span>
                    </div>
                  </div>

                  {/* {tryNow && (
                  <div className="absolute top-0  left-0">
                    <button
                      onClick={() => handleVirtualTry(item)}
                      className="text-xs p-1 group-hover:bg-white/70 rounded-full"
                    >
                      <ScanFace />
                    </button>
                  </div>
                )} */}
                </div>
              </>
            ))}
            <button
              onClick={handleViewMore}
              // href=<"/medical-glasses">
              // href={"/medical-glasses"}
              className="w-[220px] lg:w-[260px] flex-shrink-0 h-[250px] md:h-[330px] lg:h-[400px] bg-light p-4 border border-gray-300 group relative"
            >
              <div className="p-4 w-full flex items-center justify-start h-full">
                <span className="font-ksa text-4xl rotate-90">عرض المزيد</span>
              </div>
            </button>
          </div>

          <div className="relative md:absolute top-1/2 -translate-y-1/2 w-full flex justify-between gap-10 items-center my-4 md:my-0 h-10 md:h-auto">
            {cardIndex === 0 ? null : (
              <button
                onClick={onRight}
                className="absolute right-0 bg-darkness/90 hover:bg-darkness border border-darkness px-2 py-1 shadow-lg rounded-full transition-all"
              >
                <ChevronRight className="w-4 text-white" />
              </button>
            )}
            {cardIndex < items.length - 1 && (
              <button
                onClick={onLeft}
                className="absolute left-0 bg-darkness/90 hover:bg-darkness border border-darkness px-2 py-1 shadow-lg rounded-full transition-all"
              >
                <ChevronLeft className="w-4 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
      {virtualTry && selectedGlasses && (
        <VirtualTryModal
          glasses={selectedGlasses}
          onClose={() => {
            setVirtualTry(false);
            setSelectedGlasses(null);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}

interface VirtualTryModalProps {
  glasses: CarouselItem;
  onClose: () => void;
}

function VirtualTryModal({ glasses, onClose }: VirtualTryModalProps) {
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
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg relative w-2/3 h-2/3 flex flex-col"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">تجربة افتراضية</h2>

        <div className="flex-1 flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden relative">
          {error ? (
            <div className="text-white text-center">
              <Camera size={64} className="mx-auto mb-4" />
              <p>{error}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* صورة النظارة في النص */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/images/product_2.png"
                  alt={glasses.title}
                  width={300}
                  height={100}
                  className="object-contain opacity-70"
                />
              </div>
            </>
          )}
        </div>

        {/* بيانات النظارة */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">{glasses.title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="text-sm text-gray-600">
                النوع: {glasses.gender === "men" ? "رجالي" : "نسائي"}
              </span>
            </div>
            <div className="text-lg font-bold">
              299 ج.م
              <sub className="line-through text-gray-500 mx-2">350 ج.م</sub>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center text-sm text-gray-600">
          ضع النظارة على وجهك لرؤية كيف تبدو
        </div>
      </div>
    </div>
  );
}

interface LoginModalProps {
  onClose: () => void;
}

function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg relative w-96"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-colors">
            تسجيل الدخول
          </button>

          <div className="text-center text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <span className="text-amber-500 cursor-pointer hover:underline">
              إنشاء حساب جديد
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
