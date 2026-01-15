"use client";
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import LandingPage from "./Landing/LandingPage";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function AppPage() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother?.kill();
    };
  }, []);
  return <LandingPage />;
}
