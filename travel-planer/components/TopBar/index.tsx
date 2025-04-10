import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TopBar = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            Logo
          </Link>

          <div className="nav-right">
            <Link href="/wishlist" className="wishlist-link">
              <Image src="/icons/heart.svg" alt="Wishlist" width={20} height={20} />
              <span>Wishlist</span>
            </Link>

            <button className="user-button">
              <Image src="/icons/user.svg" alt="User menu" width={24} height={24} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopBar; 