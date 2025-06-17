'use client';

import React, { useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import styles from './../style.module.css';
import { Destination, CommentU, WishList, Category } from '@/models/FrontEnd/model';
import { useUser } from '@/context/UserContext';


type Props = {
    params: {
      id: string;
    };
  };
  
export default function ObjectPage({ params }: Props) {
  const router = useRouter();
  const { id } = params;
  const { user } = useUser();
  const [showWishlistSelector, setShowWishlistSelector] = useState(false);
  const [destination, setDestination] = useState<Destination>();
  const [mainImage, setMainImage] = useState(destination?.images?.[0] ?? "/images/mainImage.png");
  const [comments, setComments] = useState<CommentU[]>(destination?.comments??[]);
  const [similarVisions, setSimilarVisions] = useState<Destination[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [newComment, setNewComment] = useState({ rating: 5, desc: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishlists, setWishlists] = useState<WishList[]>([]);

  useEffect(() => {
    async function fetchWishlists() {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/plans/${user.id}`);
        const data: WishList[] = await res.json();
        setWishlists(data);
      } catch (err) {
        console.error("Failed to fetch wishlists", err);
      }
    }
  
    fetchWishlists();
  }, [user]);

  const addDestinationToWishlist = async (wishlistId: number) => {
    try {
      const res = await fetch(`/api/plans/${wishlistId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationId: destination?.id }),
      });
  
      if (res.ok) {
        setIsWishlisted(true);
        setShowWishlistSelector(false);
      } else {
        alert("Нэмэхэд алдаа гарлаа.");
      }
    } catch (err) {
      console.error("Failed to add to wishlist", err);
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/destination');
        const data: Destination[] = await res.json();

        const dest = data.find(d => d.id === Number(id)) ?? data[0]; // id-р шүүж авах
        setDestination(dest);

        // comments, image, wish list
        setComments(dest.comments ?? []);
        setMainImage(dest.images?.[0] ?? "/images/mainImage.png");
        setThumbnails([
          dest.images?.[1] ?? "/images/similar1.jpg",
          dest.images?.[2] ?? "/images/similar1.jpg",
          dest.images?.[3] ?? "/images/similar1.jpg",
          dest.images?.[4] ?? "/images/similar1.jpg",
        ]);
        setIsWishlisted(dest.isWishListed ?? true);

        const similar = data.filter(s =>
          s.id !== dest.id &&
          s.category.some((cat: Category) =>
            dest.category.some((dCat: Category) => dCat.id === cat.id)
          )
        );
        
        
        setSimilarVisions(similar);
        
      } catch (err) {
        console.error('Error fetching destination:', err);
      }
    }

    fetchData();
  }, [id]);

  const handleWishlistToggle = async () => {
    if (!user) return;
  
    if (wishlists.length === 1) {
      // Зөвхөн 1 wishlist байгаа тул шууд нэмнэ
      await addDestinationToWishlist(wishlists[0].id);
    } else if (wishlists.length > 1) {
      // 2 буюу түүнээс олон байвал хэрэглэгчээс аль нэгийг нь сонгуулах modal/select харуулна
      setShowWishlistSelector(true);
    } else {
      alert("Та эхлээд wishlist үүсгээрэй.");
    }
  };
  
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }

    if (!newComment.desc.trim()) {
      alert('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/destination/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });

      if (res.ok) {
        const addedComment = await res.json();
        setComments(prev => [...prev, addedComment]);
        setNewComment({ rating: 5, desc: '' });
      } else {
        console.error('Failed to add comment');
        alert('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>{destination?.title}, {destination?.province.name} {id}</h1>
        
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
              onClick={handleWishlistToggle}
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
              </div>
            ))}
          </div>
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <div className={styles.ratingInput}>
              <label>Rating:</label>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= newComment.rating ? styles.starFilled : styles.star}
                    onClick={() => setNewComment(prev => ({ ...prev, rating: star }))}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <textarea
              value={newComment.desc}
              onChange={(e) => setNewComment(prev => ({ ...prev, desc: e.target.value }))}
              placeholder="Write your comment here..."
              className={styles.commentInput}
              rows={4}
            />
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        </section>

        <section className={styles.overview}>
          <h2>Overview</h2>
          <p>
            {destination?.overview}
          </p>
        </section>

        <section className={styles.similarVisions}>
          <h2>Similar visions</h2>
          <div className={styles.similarGrid}>
            {similarVisions.slice(0, 5).map((vision, index) => (
              <div key={vision.id} className={styles.similarCard} onClick={() => router.push(`/destination/${vision.id}`)}>
                <div className={styles.similarImageContainer}>
                  <Image
                    src={vision.images[0]}
                    alt={vision.title}
                    width={400}
                    height={300}
                    className={styles.similarImage}
                  />
                  <span className={styles.visionTitle} >{vision.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}