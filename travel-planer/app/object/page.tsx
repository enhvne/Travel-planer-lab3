'use client';
import '../../app/globals.css';
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
interface Object{
  commnt: Comment[];
  title: string;
}
const comments: Comment[] = [
  {
    id: 1,
    rating: 5,
    text: 'Отгонтэнгэр уулын оргилд гарч үзэхэд үнэхээр гайхалтай байлаа. Байгалийн цэвэр агаарт алхаж, мөнх цаст оройг харан суух мэдрэмж мартагдашгүй. Хөх нуурын эрэг дээр амрахад сэтгэл тайвширч, амар амгаланг мэдэрсэн',
    author: 'baagaa_Sh',
    date: '1 Jan 2023'
  },
  {
    id: 2,
    rating: 4,
    text: 'Алдархаан сумын Отгонтэнгэр уулын орчимд аялал хийхэд байгаль үнэхээр онгон, амьтан ургамал элбэгтэй байсан. Тахилгатай ариун уул гэдгийг нутгийн хүмүүсийн ярианаас мэдэрсэн. Мөн рашаан сувилал нь эрүүл мэндэд маш сайн санагдсан.',
    author: 'batbayar_Sh',
    date: '1 Jan 2023'
  },
  {
    id: 3,
    rating: 3,
    text: 'Уулын энгэрт байрлах Бадархундага нуурын үзэмж үнэхээр сайхан. Уулын орчинд амьдардаг ховор ургамал, шувуудыг харах боломжтой байсан нь аялалыг илүү сонирхолтой болгож өгсөн.',
    author: 'jargalt_Sh',
    date: '4 Feb 2023'
  },
  {
    id: 4,
    rating: 3.5,
    text: 'Отгонтэнгэр уулын дэргэдэх Даян амралтын рашаан сувилалд зочилсон. Эртний уламжлалтай, эмчилгээний чанартай рашаан гэдгийг мэдэрч, бие сэтгэл амарч тайвширсан сайхан газар байлаа.',
    author: 'tsend_Sh',
    date: '1 Feb 2023'
  },
  {
    id: 5,
    rating: 4,
    text: 'Улиастайгаас Отгонтэнгэр рүү явж, уулын оргилд гарахад бэрхшээлтэй ч үнэхээр үнэ цэнэтэй туршлага болсон. Орчин тойрон дахь уулс, нуур, ой хөвч нь байгалийн гайхамшиг шиг санагдсан. Монголын ариун уулыг үзэж, нутгийн соёл, домгийг мэдэрсэн сайхан аялал байлаа.',
    author: 'erdenebat_Sh',
    date: '2 Jan 2023'
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
    image: '/images/image1.jpg',
    title: 'govi View'
  },{
    id: 5,
    image: '/images/image2.jpg',
    title: 'Province View'
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
            Отгонтэнгэр уул нь Монгол Улсын баруун бүсэд, Завхан аймгийн Алдархаан сумын нутагт байрлах Хангайн нурууны ноён оргил бөгөөд далайн түвшнээс 4021 метр өндөрт өргөгдсөн Монголын ариун дагшин уул юм. Монголчууд эртнээс Очирваань хайрхан, Этүгэн уул хэмээн хүндэтгэн тахиж ирсэн бөгөөд бөө мөргөлийн гол тахилгатай газар билээ. Уулын оргил хэсэг нь мөнх цастай, түүний доор Бадархундага зэрэг үзэсгэлэнт нуур, рашаан сувиллын газрууд оршдог. Отгонтэнгэр нь Хангайн нурууны байгалийн өвөрмөц тогтоц бүхий, олон төрлийн ховор ургамал, амьтан амьдардаг биосферийн цогцолборт газар бөгөөд 1992 оноос дархан цаазат газар болж хамгаалагдаж байна. Уулын орчимд Монголын уламжлалт тахилга, шашны зан үйл одоо ч хадгалагдан үлдсэн бөгөөд ЮНЕСКО-ийн дэлхийн байгалийн өвд бүртгэгдэх магадлалтай газруудын нэг юм. Отгонтэнгэр уул нь байгалийн үзэсгэлэн, түүх соёлын өвийг нэгтгэсэн аялал жуулчлалын чухал төв бөгөөд ууланд авиралт хийх, рашаан сувилалд зочлох, байгалийн аялал хийх боломжтой газар юм.
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