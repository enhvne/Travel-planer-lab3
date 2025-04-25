'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.css';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';

const tourCategories = [
  'Tours',
  'Cultural Tours',
  'Sightseeing Tours',
  'Private and Luxury',
  'Night Tours',
  'Walking Tours',
  'Photography Tours',
  'Adventure Tours',
  'Food and Drink Tours',
  'Family and Kids Tours',
  'Art and History Tours',
  'Beaches and Sunsets',
  'Nature and Wildlife Tours',
  
];

interface Place {
  id: number;
  image: string;
  title: string;
  rating: string;
  isFavorite?: boolean;
}

const places: Place[] = [
  {
    id: 1,
    image: '/images/image1.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 2,
    image: '/images/image2.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 3,
    image: '/images/image3.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 4,
    image: '/images/image1.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 5,
    image: '/images/image2.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 6,
    image: '/images/image3.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 7,
    image: '/images/image1.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite: false,
  },
  {
    id: 8,
    image: '/images/image1.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 9,
    image: '/images/image2.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  },
  {
    id: 10,
    image: '/images/image3.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0',
    isFavorite:  false,
  }
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams?.get('location') || '';
  const startDate = searchParams?.get('startDate') || '';
  const endDate = searchParams?.get('endDate') || '';
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredPlaces = places.filter(place => {
    if (location && !place.title.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <TopBar />
      <div className={styles.searchPage}>
        <div className={styles.searchFilters}>
          <div className={styles.mainFilters}>
            <button className={styles.dateButton}>
              <Image
                src="/icons/calendar.svg"
                alt="Calendar"
                width={20}
                height={20}
              />
              Select Dates
            </button>
            <button className={styles.filterButton}>
              <Image
                src="/icons/filter.svg"
                alt="Filter"
                width={20}
                height={20}
              />
              Filters
            </button>
            <div className={styles.categoryScroll}>
              {tourCategories.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${selectedCategories.includes(category) ? styles.categoryActive : ''}`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className={styles.sortDropdown}>
              <span>Sort by:</span>
              <select>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
                <option value="vision">Vision</option>
                <option value="celebrate">Celebrate</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.searchResults}>
          {filteredPlaces.map((place) => (
            <div 
              key={place.id} 
              className={styles.resultCard}
              onClick={() => router.push(`/object`)}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={place.image}
                  alt={place.title}
                  width={400}
                  height={300}
                  className={styles.cardImage}
                />
                <button 
                  className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking favorite button
                    setIsFavorite(place.isFavorite=!isFavorite);
                  }}
                >
                  <Image
                    src={place.isFavorite ? "/icons/green-heart.svg" : "/icons/heart.svg"}
                    alt="Favorite"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.rating}>
                  <Image src="/icons/star.svg" alt="Rating" width={16} height={16} />
                  <span>{place.rating}</span>
                </div>
                <h3>{place.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button 
            className={styles.paginationButton}
            onClick={() => {}}
          >
            next page
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}