"use client";
import React from "react";
import { MenuSection } from "../types/LandingTypes";

interface NavBarProps {
  handleMenuClick: (index: number) => void;
  menu: MenuSection[];
  activeMenu: number | null;
}
export function NavBar({ handleMenuClick, menu, activeMenu }: NavBarProps) {
  return (
    <div className="hidden lg:block relative md:1/2 lg:w-1/3">
      <ul className="flex items-center ">
        {menu.map((menuItem, i) => (
          <li key={i} className="px-2 p-1">
            <button
              onClick={() => handleMenuClick(i)}
              className={`w-full inline-flex items-center justify-center gap-2 font-lifta font-bold px-2 py-1 rounded-md transition-colors text-xl ${
                activeMenu === i
                  ? "text-darkness "
                  : "hover:text-darkness text-darkness/80"
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
