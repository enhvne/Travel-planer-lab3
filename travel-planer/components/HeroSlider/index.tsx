'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/images/backimage.jpg",
    "/images/backimage2.jpg",
    "/images/backimage3.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <Image
              src={slide}
              alt={`Mongolia landscape ${index + 1}`}
              fill
              className="hero-image"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="hero-overlay" />
      
      {/* Search Bar */}
      <div className="search-container">
        <h1 className="hero-title">Аяллаа эхэл, дэлхий чамайг хүлээж байна.</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Where to"
            className="search-input"
          />
          <input
            type="text"
            placeholder="Select dates"
            className="search-input"
          />
          <button className="search-button">
            <Image src="/icons/search.svg" alt="Search" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider; 