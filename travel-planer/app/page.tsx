import Image from "next/image";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <div className="page">
      <TopBar />
      <HeroSlider />

      {/* Recently Viewed Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Recently viewed</h2>
          <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
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

      {/* Famous Provinces Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Famous provinces</h2>
          <div className="grid grid-cols-2 grid-cols-4">
            {provinces.map((province, index) => (
              <div key={index} className="card">
                <Image
                  src={province.image}
                  alt={province.name}
                  width={300}
                  height={200}
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

      {/* Top Visions Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Top Visions</h2>
          <div className="grid grid-cols-2 grid-cols-4">
            {topVisions.map((vision, index) => (
              <div key={index} className="card">
                <Image
                  src={vision.image}
                  alt={vision.name}
                  width={300}
                  height={200}
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
  { name: "Govi", image: "/images/provinces/govi.jpg" },
  { name: "Zavkhan", image: "/images/provinces/zavkhan.jpg" },
  { name: "Khovsgol", image: "/images/provinces/khovsgol.jpg" },
  { name: "Bayan Olgii", image: "/images/provinces/bayanOlgii.jpg" },
  { name: "Arkhangai", image: "/images/provinces/arkhangai.jpg" },
  { name: "Uvs", image: "/images/provinces/uvs.jpg" },
  { name: "Dornod", image: "/images/provinces/dornod.jpg" },
  { name: "Uvurkhangai", image: "/images/provinces/uvurkhangai.jpg" }
];

const topVisions = [
  { name: "Altai Tavan Bogd", image: "/images/visions/tavanBogd.jpg" },
  { name: "Hovd River", image: "/images/visions/hovdgol.jpg" },
  { name: "Tsambagarav", image: "/images/visions/tsambagarav.jpg" },
  { name: "Horidol saridag", image: "/images/visions/horidol.jpg" },
  { name: "Tsagaan lake", image: "/images/visions/tsagaan.jpg" },
  { name: "Khuvsgul lake", image: "/images/visions/khuvsgul.jpg" },
  { name: "Uvs lake", image: "/images/visions/uvs.jpg" },
  { name: "Khetsuu rock", image: "/images/visions/khetsuu.jpg" }
];
