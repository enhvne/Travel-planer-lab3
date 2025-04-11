'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';

const provinces = [
  "Архангай",
  "Баян-Өлгий",
  "Баянхонгор",
  "Булган",
  "Говь-Алтай",
  "Говьсүмбэр",
  "Дархан-Уул",
  "Дорноговь",
  "Дорнод",
  "Дундговь",
  "Завхан",
  "Орхон",
  "Өвөрхангай",
  "Өмнөговь",
  "Сүхбаатар",
  "Сэлэнгэ",
  "Төв",
  "Увс",
  "Ховд",
  "Хөвсгөл",
  "Хэнтий"
];

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredProvinces = provinces.filter(province =>
    province.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('location', searchQuery);
    if (startDate) searchParams.set('startDate', startDate);
    if (endDate) searchParams.set('endDate', endDate);
    
    router.push(`/pages/search?${searchParams.toString()}`);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.motivationalText}>
        Discover the beauty of Mongolia
      </div>
      <div className={styles.searchBar}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Where to"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
          {showSuggestions && searchQuery && (
            <div className={styles.suggestionsDropdown}>
              {filteredProvinces.map((province, index) => (
                <div
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => {
                    setSearchQuery(province);
                    setShowSuggestions(false);
                  }}
                >
                  {province}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className={styles.searchInputContainer}>
          <input
            type="date"
            placeholder="End date"
            className={styles.searchInput}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          <Image src="/icons/search.svg" alt="Search" width={24} height={24} />
        </button>
      </div>
    </div>
  );
} 