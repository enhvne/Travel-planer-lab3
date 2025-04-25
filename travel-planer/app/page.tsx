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
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Бат' }),
    })
      .then(res => res.json())
      .then(data => console.log(data));
    
  }, []);

  return (
    <div className="page">
      
      <TopBar />
      <h1>API Response:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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