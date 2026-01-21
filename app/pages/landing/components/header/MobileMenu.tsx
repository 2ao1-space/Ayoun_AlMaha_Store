import { useCallback, useRef, useState } from "react";
import { iconsMap, MenuSection } from "../types/LandingTypes";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import data from "../../data/data.json";

interface MobileMenuProps {
  menu: MenuSection[];
  onClose: () => void;
}

export default function MobileMenu({ menu, onClose }: MobileMenuProps) {
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openPhone, setOpenPhone] = useState(false);

  const closeItem = useCallback((index: number) => {
    const el = contentRefs.current[index];
    if (!el) return;

    return gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  }, []);

  const openItem = useCallback((index: number) => {
    const el = contentRefs.current[index];
    if (!el) return;

    gsap.set(el, { height: "auto", opacity: 1 });
    const height = el.offsetHeight;

    gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        clearProps: "height",
      },
    );
  }, []);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => {
        if (prev === index) {
          closeItem(index);
          return null;
        }

        if (prev !== null) {
          closeItem(prev);
        }

        openItem(index);
        return index;
      });
    },
    [closeItem, openItem],
  );

  return (
    <nav className="space-y-4 relative h-full">
      {menu.map((section, index) => (
        <div key={section.title}>
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center py-3 font-lifta text-lg"
          >
            {section.title}
            <span
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              <ChevronDown className="w-4" />
            </span>
          </button>

          <div
            ref={(el) => {
              if (el) contentRefs.current[index] = el;
            }}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <ul className="pl-4 pb-3 space-y-2">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-1 font-bold text-gray-600 hover:text-black"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <ul className="flex justify-between gap-8 pb-4 pt-20 relative">
        {data.menuSocial.map(
          (link: (typeof data.menuSocial)[number], i: number) => {
            const Icon = iconsMap[link.icon as keyof typeof iconsMap];

            if (link.site === "Phone") {
              return (
                <li key={i} className="relative">
                  <button
                    onClick={() => setOpenPhone(!openPhone)}
                    className="text-grayPrimary hover:text-darkness transition-colors"
                  >
                    <Icon className="w-5" />
                  </button>

                  {openPhone && (
                    <div
                      className="absolute -top-24 -left-1/2 -translate-x-1/2 
                bg-white shadow-lg rounded-xl p-3 flex flex-col gap-4 z-50"
                    >
                      {Array.isArray(link.url) &&
                        link.url.map((num: string, idx: number) => (
                          <a
                            key={idx}
                            href={`tel:${num}`}
                            className="text-sm hover:text-amber-600 transition"
                          >
                            {num}
                          </a>
                        ))}
                    </div>
                  )}
                </li>
              );
            }

            if (link.site === "Mail") {
              return (
                <li key={i}>
                  <a
                    href={`mailto:${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 text-grayPrimary hover:text-darkness transition-colors" />
                  </a>
                </li>
              );
            }

            return (
              <li key={i}>
                <Link
                  href={Array.isArray(link.url) ? link.url[0] : link.url}
                  target="_blank"
                >
                  <Icon className="w-5 text-grayPrimary hover:text-darkness transition-colors" />
                </Link>
              </li>
            );
          },
        )}
      </ul>
    </nav>
  );
}
