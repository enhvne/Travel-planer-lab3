'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './style.module.css';

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.topbar}>
      <div className={styles.container}>
        <div className={styles.topbarContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src="icons/heart.svg"
              alt="Travel Planner"
              width={40}
              height={40}
            />
            <span>Travel Planner</span>
          </Link>

          {/* Navigation Menu */}
          <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/search" className={styles.navLink}>
              Destinations
            </Link>
            <Link href="/about" className={styles.navLink}>
              About Us
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className={styles.userActions}>
            <Link href="/wishlist" className={styles.actionButton}>
              <Image
                src="/icons/heart.svg"
                alt="Favorites"
                width={24}
                height={24}
              />
            </Link>
            <Link href="/profile" className={styles.actionButton}>
              <Image
                src="/icons/user.svg"
                alt="Profile"
                width={24}
                height={24}
              />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image
                src={isMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
                alt="Menu"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}