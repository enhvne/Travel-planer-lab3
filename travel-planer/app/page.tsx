'use client';
import HeroSlider from "../components/HeroSlider";
import Recently from "../components/Recently";
import TopVisions from "../components/TopVision";
import FamousProvince from "../components/FamousProvince";

export default function Home() {

  return (
    <div className="page">
  
      <HeroSlider />
        
      {/* Recently Viewed Section */}
      <Recently />

      {/* Top Visions Section */}
      <TopVisions />

      {/* Famous Provinces Section */}
      <FamousProvince />


    </div>
  );
}