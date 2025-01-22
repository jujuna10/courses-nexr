import Contact from "@/components/Contact";
import Curses from "@/components/Curses";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Prices from "@/components/Prices";
import Reviews from "@/components/Reviews";
import Teacher from "@/components/Teacher";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#111015] via-[#0c0c18] to-[#07081a]">
        <Navbar />
        <HeroSection />
      </div>
      <div className="bg-gradient-to-b from-[#111015] via-[#0c0c18] to-[#07081a] flex flex-col gap-24">
        <Curses />
      </div>
      <Teacher />
      <Prices />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
