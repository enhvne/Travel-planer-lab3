'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";

export default function Recently(){
    const router = useRouter();

    return(
        <div>
            <section className="section recently-viewed">
                <div className="container">
                <h2 className="section-title">Recently viewed</h2>
                <div className="grid">
                    {recentlyViewed.map((item, index) => (
                    <div 
                    key={index} 
                    className="card"
                    onClick={() => router.push(`/searching`)}>
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
        </div>
    )
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
    },
    {
        image: "/images/image1.jpg",
        title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
        rating: "5.0"
    }
];