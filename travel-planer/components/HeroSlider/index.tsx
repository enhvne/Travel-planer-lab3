'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from '../SearchBar';
import styles from './style.module.css';

const images = [
  '/images/backimage.jpg',
  '/images/backimage2.jpg',
  '/images/backimage3.jpg',
];

export default function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.heroSlider}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.heroSlide} ${index === currentImageIndex ? styles.active : ''}`}
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              fill
              priority={index === 0}
              className={styles.heroImage}
            />
          </div>
        ))}
        <div className={styles.heroOverlay} />
      </div>
      <SearchBar />
    </div>
  );
} 