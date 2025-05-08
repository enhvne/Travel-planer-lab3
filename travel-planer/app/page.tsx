'use client';

import Image from "next/image";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import Recently from "../components/Recently";
import TopVisions from "../components/TopVision";
import FamousProvince from "../components/FamousProvince";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Home() {

  return (
    <div className="page">
      
      <TopBar />
  
      <HeroSlider />
        
      {/* Recently Viewed Section */}
      <Recently />

      {/* Top Visions Section */}
      <TopVisions />

      {/* Famous Provinces Section */}
      <FamousProvince />

      <Footer />
    </div>
  );
}