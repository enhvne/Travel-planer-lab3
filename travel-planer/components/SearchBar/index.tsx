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
]//.map((name, i)=>({ id: i + 1, name }))

const categories = [
  "Hiking",
  "Walking",
  "Biking",
  "Climbing",
]

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryType, setSearchQueryType] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSuggestionsType, setShowSuggestionsType] = useState(false);


  const filteredPrvince = provinces.filter(province =>
    province.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const filteredCategory = categories.filter(category =>
  //   category.toLowerCase().includes(searchQueryType.toLowerCase())
  // );

  const handleSearch = () => {
    // const searchParams = new URLSearchParams();
    // if (searchQuery) searchParams.set('location', searchQuery);
    // if (searchQueryType) searchParams.set('type', searchQueryType);
    
    router.push(`/searching/${searchQuery}`);
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
              {filteredPrvince.map((province, index) => (
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
        
        {/* <div className={styles.searchInputContainer}>
          <input
              type="text"
              placeholder="What type"
              className={styles.searchInput}
              value={searchQueryType}
              onChange={(e) => {
                setSearchQueryType(e.target.value);
                setShowSuggestionsType(true);
              }}
              onFocus={() => setShowSuggestionsType(true)}
              onBlur={() => {
                setTimeout(() => setShowSuggestionsType(false), 200);
              }}
            />
            {showSuggestionsType && searchQueryType && (
              <div className={styles.suggestionsDropdown}>
                {filteredCategory.map((category, index) => (
                  <div
                    key={index}
                    className={styles.suggestionItem}
                    onClick={() => {
                      setSearchQueryType(category);
                      setShowSuggestionsType(false);
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
        </div> */}
        <button className={styles.searchButton} onClick={handleSearch}>
          <Image src="/icons/search.svg" alt="Search" width={24} height={24} />
        </button>
      </div>
    </div>
  );
} 