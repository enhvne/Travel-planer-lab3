'use client';
import React, { useState , useEffect} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Category, Destination } from '@/models/FrontEnd/model';
import { provinces } from '@/lib/mock-data';
import styles from './../style.module.css';

type Props = {
  params: {
    province: string;
  }
}

export default function SearchPage({params}: Props) {
  const router = useRouter();
  const { province } = params;
  const searchParams = useSearchParams();
  // const location = searchParams?.get('location') || '';
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categoreis, setCategories] = useState<Category[]>([]);
  const [isWishListed, setIsFavorite] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    async function fetchData(){
      try{
        const resCate = await fetch(`../api/category`);
        const dataCate: Category[] = await resCate.json();
        setCategories(dataCate);

        const encodedProvince = encodeURIComponent(province)
        const res = await fetch(`/api/searching/${encodedProvince}`);
        const data: Destination[] = await res.json();
        setDestinations(data);

      } catch (err){
        console.error('Error fetching destinations:', err);
      } 
    }

    fetchData();
  }, [province]); //province oorchlogdoh burt ajilana

  const currentProvinceName = destinations?.length
  ? provinces.find(p => p.id === destinations[0].province.id)?.name + ' аймаг'
  : 'Одоогоор газар байхгүй байна';
  const toggleCategory = (id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  
  const filteredDest = destinations.filter(place => {
    if (selectedCategories.length > 0) {
      const hasMatch = place.category.some(catId => selectedCategories.includes(catId.id));
      if (!hasMatch) return false;
    }
    return true;
  });

  const itemsPerPage = 6;// nemegdeh dest-iin too
  const paginatedDest = filteredDest.slice(0, currentPage * itemsPerPage);

  return (
    <div>
      <div className={styles.searchPage}>
        <div className={styles.searchFilters}>
          <p className={styles.ProvinceName}>{currentProvinceName}</p>
          <div className={styles.mainFilters}>
            <button className={styles.filterButton}>
              <Image
                src="/icons/filter.svg"
                alt="Filter"
                width={20}
                height={20}
              />
              Categories
            </button>
            <div className={styles.categoryScroll}>
            {categoreis.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${selectedCategories.includes(category.id) ? styles.categoryActive : ''}`}
                onClick={() => toggleCategory(category.id)}
              >
                {category.name}
              </button>
            ))}

            </div>
          </div>
        </div>

        <div className={styles.searchResults}>
          {paginatedDest.map((dest) => (
            <div 
              key={dest.id} 
              className={styles.resultCard}
              onClick={() => router.push(`/destination/${dest.id}`)}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={dest.images[0]}
                  alt={dest.title}
                  width={400}
                  height={300}
                  className={styles.cardImage}
                />
                <button 
                  className={`${styles.favoriteButton} ${isWishListed ? styles.favoriteActive : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking favorite button
                    setIsFavorite(dest.isWishListed=!isWishListed);
                  }}
                >
                  <Image
                    src={dest.isWishListed ? "/icons/green-heart.svg" : "/icons/heart.svg"}
                    alt="Favorite"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.rating}>
                  <Image src="/icons/star.svg" alt="Rating" width={16} height={16} />
                  <span>{dest.rating}</span>
                </div>
                <h3>{dest.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {paginatedDest.length < filteredDest.length && (
          <div className={styles.pagination}>
            <button 
              className={styles.paginationButton}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  )};