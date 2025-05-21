'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import { Destination } from '@/models/model';


export default function ObjectPage() {
  const [destination, setDestination] = useState<Destination>();
  const [mainImage, setMainImage] = useState(destination?.images?.[0] ?? "/images/mainImage.png");
  const [comments, setComments] = useState(destination?.comments ??[]);
  const [similarVisions, setSimilarVisions] = useState<Destination[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  
  const thumbnails = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg'
  ];

  return (
    <div>
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
                <p className={styles.commentText}>{comment.desc}</p>
                <div className={styles.commentMeta}>
                  <span className={styles.author}>{comment.author}</span>
                  <span className={styles.date}>{(comment.date).toString()}</span>
                </div>
                {/* <button className={styles.readMore}>read more</button> */}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.overview}>
          <h2>Overview</h2>
          <p>
            {destination?.overview}
            {/* Отгонтэнгэр уул нь Монгол Улсын баруун бүсэд, Завхан аймгийн Алдархаан сумын нутагт байрлах Хангайн нурууны ноён оргил бөгөөд далайн түвшнээс 4021 метр өндөрт өргөгдсөн Монголын ариун дагшин уул юм. Монголчууд эртнээс Очирваань хайрхан, Этүгэн уул хэмээн хүндэтгэн тахиж ирсэн бөгөөд бөө мөргөлийн гол тахилгатай газар билээ. Уулын оргил хэсэг нь мөнх цастай, түүний доор Бадархундага зэрэг үзэсгэлэнт нуур, рашаан сувиллын газрууд оршдог. Отгонтэнгэр нь Хангайн нурууны байгалийн өвөрмөц тогтоц бүхий, олон төрлийн ховор ургамал, амьтан амьдардаг биосферийн цогцолборт газар бөгөөд 1992 оноос дархан цаазат газар болж хамгаалагдаж байна. Уулын орчимд Монголын уламжлалт тахилга, шашны зан үйл одоо ч хадгалагдан үлдсэн бөгөөд ЮНЕСКО-ийн дэлхийн байгалийн өвд бүртгэгдэх магадлалтай газруудын нэг юм. Отгонтэнгэр уул нь байгалийн үзэсгэлэн, түүх соёлын өвийг нэгтгэсэн аялал жуулчлалын чухал төв бөгөөд ууланд авиралт хийх, рашаан сувилалд зочлох, байгалийн аялал хийх боломжтой газар юм. */}
          </p>
        </section>

        <section className={styles.similarVisions}>
          <h2>Similar visions</h2>
          <div className={styles.similarGrid}>
            {similarVisions.map((vision, index) => (
              <div key={vision.id} className={styles.similarCard}>
                <div className={styles.similarImageContainer}>
                  <Image
                    src={vision.images[index]}
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

    </div>
  );
}