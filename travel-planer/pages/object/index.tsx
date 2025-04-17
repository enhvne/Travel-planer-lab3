'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import styles from './style.module.css';

interface Comment {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
}

const comments: Comment[] = [
  {
    id: 1,
    rating: 5,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.',
    author: 'Bridget_Sh',
    date: '1 Jan 2023'
  },
  {
    id: 2,
    rating: 4,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.',
    author: 'JoeHoff_Sh',
    date: '1 Jan 2023'
  },
  {
    id: 3,
    rating: 3,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.',
    author: 'JoeHoff_Sh',
    date: '1 Jan 2023'
  },
  {
    id: 4,
    rating: 3.5,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.',
    author: 'JoeHoff_Sh',
    date: '1 Jan 2023'
  },
  {
    id: 5,
    rating: 4,
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.Lorem, ipsum dolor sit amet consectetur adipisicingm itaque corporis incidunt, est magnam ab.',
    author: 'JoeHoff_Sh',
    date: '1 Jan 2023'
  }
];

const similarVisions = [
  {
    id: 1,
    image: '/images/similar1.jpg',
    title: 'Mountain View'
  },
  {
    id: 2,
    image: '/images/similar2.jpg',
    title: 'Lake View'
  },
  {
    id: 3,
    image: '/images/similar3.jpg',
    title: 'Valley View'
  },
  {
    id: 4,
    image: '/images/similar3.jpg',
    title: 'Valley View'
  },{
    id: 5,
    image: '/images/similar3.jpg',
    title: 'Valley View'
  }
];

export default function ObjectPage() {
  const [mainImage, setMainImage] = useState('/images/mainImage.png');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const thumbnails = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg'
  ];

  return (
    <div>
      <TopBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум</h1>
        
        <div className={styles.imageSection}>
          <div className={styles.thumbnailGallery}>
            {thumbnails.map((thumb, index) => (
              <div 
                key={index} 
                className={styles.thumbnail}
                onClick={() => setMainImage(thumb)}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  width={200}
                  height={150}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>

          <div className={styles.mainImageContainer}>
            <Image
              src={mainImage}
              alt="Main view"
              width={800}
              height={600}
              className={styles.mainImage}
            />
            <button 
              className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Image
                src="/icons/heart.svg"
                alt="Add to wishlist"
                width={24}
                height={24}
              />
              {isWishlisted ? 'Added to wishlist' : 'Add to wishlist'}
            </button>
          </div>
        </div>

        <section className={styles.comments}>
          <h2>Comments</h2>
          <div className={styles.commentsList}>
            {comments.map(comment => (
              <div key={comment.id} className={styles.commentCard}>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < comment.rating ? styles.starFilled : styles.star}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className={styles.commentText}>{comment.text}</p>
                <div className={styles.commentMeta}>
                  <span className={styles.author}>{comment.author}</span>
                  <span className={styles.date}>{comment.date}</span>
                </div>
                <button className={styles.readMore}>read more</button>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.overview}>
          <h2>Overview</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum officiis in, ea 
            repudiandae, perspiciatis doloremque, adipisci facere delectus ipsam expedita ullam 
            repellendis! Quibusdam ab possimus harum consectetur necessitatibus non adipisci 
            laborum a dolore voluptates animi quos, doloribus aut, accusamus minima aliquam ipsa 
            dicta. Quam itaque corporis incidunt, est magnam ab.
          </p>
        </section>

        <section className={styles.similarVisions}>
          <h2>Similar visions</h2>
          <div className={styles.similarGrid}>
            {similarVisions.map(vision => (
              <div key={vision.id} className={styles.similarCard}>
                <div className={styles.similarImageContainer}>
                  <Image
                    src={vision.image}
                    alt={vision.title}
                    width={400}
                    height={300}
                    className={styles.similarImage}
                  />
                  <button 
                    className={styles.wishlistIcon}
                    onClick={() => {}}
                  >
                    <Image
                      src="/icons/heart.svg"
                      alt="Add to wishlist"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}