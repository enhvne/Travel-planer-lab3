'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Place {
  id: number;
  image: string;
  title: string;
  rating: string;
}

const places: Place[] = [
  {
    id: 1,
    image: '/images/image1.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0'
  },
  {
    id: 2,
    image: '/images/image2.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0'
  },
  {
    id: 3,
    image: '/images/image3.jpg',
    title: 'Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум',
    rating: '5.0'
  }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams?.get('location') || '';
  const startDate = searchParams?.get('startDate') || '';
  const endDate = searchParams?.get('endDate') || '';

  // Filter places based on search params if needed
  const filteredPlaces = places.filter(place => {
    if (location && !place.title.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="search-page">
      <div className="search-filters">
        <button className="filter-button">All filters</button>
        <button className="filter-button">Select dates</button>
        <div className="sort-dropdown">
          <span>Sort by:</span>
          <select>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      <div className="search-results">
        {filteredPlaces.map((place) => (
          <div key={place.id} className="result-card">
            <div className="image-container">
              <Image
                src={place.image}
                alt={place.title}
                width={400}
                height={300}
                className="card-image"
              />
              <button className="favorite-button">
                <Image
                  src="/icons/heart.svg"
                  alt="Favorite"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="card-content">
              <div className="rating">
                <Image src="/icons/star.svg" alt="Rating" width={16} height={16} />
                <span>{place.rating}</span>
              </div>
              <h3>{place.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-button">next page</button>
      </div>
    </div>
  );
} 