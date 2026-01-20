"use client";

import data from "../../data/data.json";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Equal, Search, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable, ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { iconsMap, MenuSection } from "../types/LandingTypes";
import UserBtn from "./Userbtn";

gsap.registerPlugin(ScrollToPlugin, Draggable, ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const menuDragRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<Draggable | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleMenuClick = useCallback((index: number) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  }, []);

  const closeMenu = useCallback(() => {
    if (draggableInstance.current) {
      draggableInstance.current.endDrag(new Event("mouseup"));
      gsap.to(menuDragRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
    setActiveMenu(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeMenu !== null &&
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (activeMenu !== null) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu, closeMenu]);

  const handleMouseLeave = () => {
    if (draggableInstance.current) {
      draggableInstance.current.endDrag(new Event("mouseleave"));
      gsap.to(menuDragRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
    setActiveMenu(null);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 z-40 w-full bg-light font-lyon"
      >
        <div className="container mx-auto p-4 relative">
          <div className="flex justify-between items-center relative">
            <Logo />
            <NavBar
              handleMenuClick={handleMenuClick}
              menu={data.menu}
              activeMenu={activeMenu}
            />
            <div className="lg:w-1/3 flex gap-3 justify-end items-center relative">
              <SearchBtn searchBarRef={searchBarRef} />
              <UserBtn
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
              />
              <MenuButton
                open={menuOpen}
                onToggle={(open) => setMenuOpen(open)}
              />
            </div>
          </div>
        </div>

        <MenuCarousel
          draggableInstance={draggableInstance}
          menuWrapperRef={menuWrapperRef}
          activeMenu={activeMenu}
          menuDragRef={menuDragRef}
          menu={data.menu}
          onClose={closeMenu}
          onMouseLeave={handleMouseLeave}
        />
      </header>

      {menuOpen && (
        <AsideBar open={menuOpen} onClose={() => setMenuOpen(false)}>
          <MobileMenu menu={data.menu} onClose={() => setMenuOpen(false)} />
        </AsideBar>
      )}
    </>
  );
}

function Logo() {
  const scrollToTop = (e?: React.MouseEvent) => {
    e?.preventDefault();
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  return (
    <div className=" w-1/2 md:w-1/3">
      <Link
        onClick={scrollToTop}
        href="/"
        className="relative top-0 text-xl lg:text-2xl font-lifta "
      >
        عيون المها
      </Link>
    </div>
  );
}

interface NavBarProps {
  handleMenuClick: (index: number) => void;
  menu: MenuSection[];
  activeMenu: number | null;
}

function NavBar({ handleMenuClick, menu, activeMenu }: NavBarProps) {
  return (
    <div className="hidden lg:block relative md:1/2 lg:w-1/3">
      <ul className="flex items-center">
        {menu.map((menuItem, i) => (
          <li key={i} className="">
            <button
              onClick={() => handleMenuClick(i)}
              className={`w-full inline-flex items-center justify-center gap-2 font-medium px-4 py-3 transition-colors leading-20 ${
                activeMenu === i
                  ? "text-amber-600 font-semibold"
                  : "hover:text-amber-600"
              }`}
            >
              <span>{menuItem.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface MenuCarouselProps {
  draggableInstance: React.MutableRefObject<Draggable | null>;
  menuWrapperRef: React.RefObject<HTMLDivElement | null>;
  activeMenu: number | null;
  menuDragRef: React.RefObject<HTMLDivElement | null>;
  menu: MenuSection[];
  onClose: () => void;
  onMouseLeave: () => void;
}

function MenuCarousel({
  draggableInstance,
  menuWrapperRef,
  activeMenu,
  menuDragRef,
  menu,
  onClose,
  onMouseLeave,
}: MenuCarouselProps) {
  useEffect(() => {
    if (activeMenu !== null && menuDragRef.current && menuWrapperRef.current) {
      const timeout = setTimeout(() => {
        if (draggableInstance.current) {
          draggableInstance.current.kill();
        }

        const instances = Draggable.create(menuDragRef.current, {
          type: "x",
          inertia: true,
          bounds: menuWrapperRef.current,
          dragResistance: 0.3,
          edgeResistance: 0.8,
        });

        draggableInstance.current = instances[0];
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [activeMenu, draggableInstance, menuWrapperRef, menuDragRef]);

  return (
    <div
      ref={menuWrapperRef}
      onMouseLeave={onMouseLeave}
      className={`relative top-full left-0 right-0 shadow-md bg-light w-full h-[300px] overflow-hidden transition-all duration-300 ease-out ${
        activeMenu !== null
          ? "max-h-[450px] opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="container mx-auto h-[300px] overflow-hidden">
        <div
          ref={menuDragRef}
          className="flex gap-4 px-10 py-6 h-full select-none cursor-grab active:cursor-grabbing"
          style={{ width: "max-content" }}
        >
          {activeMenu !== null &&
            menu[activeMenu].items.map((item, i) => (
              <div
                key={i}
                className="min-w-[400px] h-full shrink-0 rounded-xl p-4 flex items-end bg-cover bg-center border hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all" />
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="w-full flex justify-between items-end"
                >
                  <span className="relative z-10 text-white font-semibold text-xl">
                    {item.name}
                  </span>

                  <span className="bg-darkness text-white p-1 rounded-full relative z-10 group-hover:bg-yellow-600 transition-colors group-hover:scale-110 duration-300">
                    <ArrowUpRight />
                  </span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

interface MenuButtonProps {
  open: boolean;
  onToggle: (open: boolean) => void;
}

function MenuButton({ open, onToggle }: MenuButtonProps) {
  return (
    <button
      onClick={() => onToggle(!open)}
      className="lg:hidden p-3 text-xl font-bold"
    >
      <Equal className="w-5" />
    </button>
  );
}

interface AsideBarProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AsideBar({ onClose, children }: AsideBarProps) {
  const asideRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(asideRef.current, { xPercent: -100 });
    gsap.set(layersRef.current, { xPercent: -100 });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });

    const tl = gsap.timeline();

    tl.to(layersRef.current, {
      xPercent: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power4.out",
    })
      .to(
        asideRef.current,
        {
          xPercent: 0,
          duration: 0.45,
          ease: "power4.out",
        },
        "-=0.25",
      )
      .to(layersRef.current, {
        xPercent: 0,
        duration: 0.35,
        stagger: 0.08,
        ease: "power3.in",
      })
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.15",
      );
  }, []);

  return (
    <aside className="fixed w-full right-0 left-0 inset-0 z-50 flex justify-end items-end">
      <div onClick={onClose} className="absolute inset-0 w-full bg-black/30" />

      <div className="absolute w-full md:w-1/2 mr-auto flex justify-end inset-0 left-0 pointer-events-none">
        {["#f5f5f5", "#e5e5e5", "#d4d4d4"].map((color, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) layersRef.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div
        ref={asideRef}
        className="relative pt-14 px-4 z-10 w-full md:w-1/2 bg-white h-full shadow-xl overflow-y-scroll"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 px-2 py-1 bg-red-300 rounded-full hover:bg-red-400 transition-colors"
        >
          <X className="w-4" />
        </button>
        <div ref={contentRef} className="p-6 relative h-full">
          {children}
        </div>
      </div>
    </aside>
  );
}

interface MobileMenuProps {
  menu: MenuSection[];
  onClose: () => void;
}

function MobileMenu({ menu, onClose }: MobileMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

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
            className="w-full flex justify-between items-center py-3 font-semibold text-lg"
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
                    className="block py-1 text-gray-600 hover:text-black"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <ul className="flex justify-between gap-8 pb-4 pt-20">
        {data.menuSocial.map((link, i) => {
          const Icon = iconsMap[link.icon as keyof typeof iconsMap];

          return (
            <li key={i}>
              <Link href={typeof link.url === 'string' ? link.url : link.url[0]} target="_blank">
                <Icon className="w-5 text-gray-800 hover:text-darkness transition-colors" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

interface SearchBtnProps {
  searchBarRef: React.RefObject<HTMLDivElement | null>;
}

function SearchBtn({ searchBarRef }: SearchBtnProps) {
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
    <div className="relative flex flex-col-reverse md:flex-row justify-end w-full">
      {showSearch && (
        <div
          ref={searchBarRef}
          className="overflow-hidden absolute -top-6 -left-20 md:relative md:-top-0 md:-left-0"
          style={{ width: 0, opacity: 0 }}
        >
          <input
            type="text"
            placeholder="ابحث هنا..."
            className="w-full px-4 py-2 border-2 border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
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
        p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95`}
      >
        <Search size={22} />
      </button>
    </div>
  );
}
