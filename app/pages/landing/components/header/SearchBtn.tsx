import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBtnProps {
  searchBarRef: React.RefObject<HTMLDivElement | null>;
}

export default function SearchBtn({ searchBarRef }: SearchBtnProps) {
  const [showSearch, setShowSearch] = useState(false);

  useGSAP(() => {
    if (searchBarRef.current) {
      if (showSearch) {
        gsap.fromTo(
          searchBarRef.current,
          { width: 0, opacity: 0 },
          { width: "300px", opacity: 1, duration: 0.5, ease: "power3.out" },
        );
      } else {
        gsap.to(searchBarRef.current, {
          width: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [showSearch]);

  return (
    <div className="relative flex flex-col-reverse md:flex-row justify-end w-full z-40">
      {showSearch && (
        <div
          ref={searchBarRef}
          className="overflow-hidden absolute -top-6 -left-20 md:relative md:-top-0 md:-left-0"
          style={{ width: 0, opacity: 0 }}
        >
          <input
            type="text"
            placeholder="ابحث هنا..."
            className="w-full px-4 py-2 border-2 border-accentPrimary rounded-lg focus:outline-none "
            autoFocus
          />
        </div>
      )}
      <button
        onClick={() => setShowSearch(!showSearch)}
        className={`
          ${
            showSearch
              ? "absolute -top-6 -left-20 md:relative md:-top-0 md:-left-0"
              : ""
          }
        p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-graySecondary/50`}
      >
        <Search size={22} className="text-accentPrimary" />
      </button>
    </div>
  );
}
