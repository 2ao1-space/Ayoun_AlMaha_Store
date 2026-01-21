"use client";

import data from "../../data/data.json";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { Draggable, ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { MenuSection } from "../types/LandingTypes";
import UserBtn from "./Userbtn";
import Logo from "./Logo";
import { NavBar } from "./NavBar";
import MenuButton from "./MenuButton";
import AsideBar from "./AsideBar";
import MobileMenu from "./MobileMenu";
import SearchBtn from "./SearchBtn";

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
      <header ref={headerRef} className="fixed top-0 z-40 w-full bg-mainColor">
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
              <Link key={i} href={item.href} onClick={onClose} className="">
                <div
                  className="min-w-[400px] h-full shrink-0 rounded-xl p-4 flex items-end bg-cover bg-center border hover:shadow-lg transition-all duration-300 relative overflow-hidden group "
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all" />

                  <div className="w-full flex justify-between items-end">
                    <span className="relative z-10 text-mainColor font-semibold text-xl font-lifta">
                      {item.name}
                    </span>

                    <span className="bg-darkness text-mainColor p-1 rounded-full relative z-10 group-hover:bg-accentPrimary transition-colors group-hover:scale-125 duration-300">
                      <ArrowUpRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
