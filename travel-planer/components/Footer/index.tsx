import React from 'react';
import Image from 'next/image';
import styles from './style.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Social Media Links */}
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Image src="/icons/pinterest.svg" alt="Pinterest" width={24} height={24} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
            </a>
            <a href="#" className={styles.socialLink}>
              <Image src="/icons/tiktok.svg" alt="TikTok" width={24} height={24} />
            </a>
          </div>

          {/* Trustpilot Rating */}
          <div className={styles.trustpilot}>
            <Image src="/icons/trustpilot.svg" alt="Trustpilot" width={100} height={24} />
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src="/icons/star.svg"
                  alt="Star"
                  width={16}
                  height={16}
                />
              ))}
            </div>
            <span className={styles.ratingText}>4.3 rating | 247,020 reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 