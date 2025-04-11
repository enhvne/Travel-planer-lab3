'use client';

import Image from "next/image";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="page">
      <TopBar />
      <HeroSlider />

      {/* Recently Viewed Section */}
      <section className="section recently-viewed">
        <div className="container">
          <h2 className="section-title">Recently viewed</h2>
          <div className="grid">
            {recentlyViewed.map((item, index) => (
              <div key={index} className="card">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="card-image"
                />
                <div className="card-content">
                  <div className="rating">
                    <Image src="/icons/star.svg" alt="Rating" width={16} height={16} />
                    <span>{item.rating}</span>
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Visions Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Top Visions</h2>
          <div className="grid grid-cols-4">
            {topVisions.map((vision, index) => (
              <div 
                key={index} 
                className="card"
                onClick={() => router.push(`/visions/${vision.id}`)}
              >
                <Image
                  src={vision.image}
                  alt={vision.name}
                  width={800}
                  height={450}
                  className="card-image"
                />
                <div className="card-content">
                  <h3>{vision.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Famous Provinces Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Famous provinces</h2>
          <div className="grid grid-cols-4">
            {provinces.map((province, index) => (
              <div 
                key={index} 
                className="card"
                onClick={() => router.push(`/visions/${province.id}`)}
                >
                  <Image
                    src={province.image}
                    alt={province.name}
                    width={800}
                    height={450}
                    className="card-image"
                  />
                <div className="card-content">
                  <h3>{province.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const recentlyViewed = [
  {
    image: "/images/image1.jpg",
    title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
    rating: "5.0"
  },
  {
    image: "/images/image2.jpg",
    title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
    rating: "5.0"
  },
  {
    image: "/images/image3.jpg",
    title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
    rating: "5.0"
  }
];

const provinces = [
  { id: 1, name: "Govi", image: "/images/provinces/govi.jpg" },
  { id: 2, name: "Zavkhan", image: "/images/provinces/zavkhan.jpg" },
  { id: 3, name: "Khovsgol", image: "/images/provinces/khovsgol.jpg" },
  { id: 4, name: "Bayan Olgii", image: "/images/provinces/bayanOlgii.jpg" },
  { id: 5, name: "Arkhangai", image: "/images/provinces/arkhangai.jpg" },
  { id: 6, name: "Uvs", image: "/images/provinces/uvs.jpg" },
  { id: 7, name: "Dornod", image: "/images/provinces/dornod.jpg" },
  { id: 8, name: "Uvurkhangai", image: "/images/provinces/uvurkhangai.jpg" }
];

const topVisions = [
  { id: 1, name: "Altai Tavan Bogd", image: "/images/visions/tavanBogd.jpg" },
  { id: 2, name: "Hovd River", image: "/images/visions/hovdgol.jpg" },
  { id: 3, name: "Tsambagarav", image: "/images/visions/tsambagarav.jpg" },
  { id: 4, name: "Horidol saridag", image: "/images/visions/horidol.jpg" },
  { id: 5, name: "Tsagaan lake", image: "/images/visions/tsagaan.jpg" },
  { id: 6, name: "Khuvsgul lake", image: "/images/visions/khuvsgul.jpg" },
  { id: 7, name: "Uvs lake", image: "/images/visions/uvs.jpg" },
  { id: 8, name: "Khetsuu rock", image: "/images/visions/khetsuu.jpg" }
];
