// import Image from "next/image";
import Header from "./components/header/Header";
import Hero from "./components/content/Hero";
import VeiwTopProducts from "./components/trends/VeiwTopProducts";
import Repair from "./components/content/Repair";
import BookDoctor from "./components/content/BookDoctor";
import Footer from "./components/footet/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-light relative font-serif ">
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />

          <div className="bg-slate-500 h-[200px] p-4 font-lyon">اعلان</div>

          <VeiwTopProducts />

          <Repair />

          <BookDoctor />

          <Footer />
        </div>
      </div>
    </main>
  );
}
