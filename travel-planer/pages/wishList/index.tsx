'use client';

import React from 'react';
import Image from 'next/image';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import styles from './style.module.css';

interface Location {
  id: number;
  name: string;
  description: string;
  isCurrentLocation?: boolean;
  image?: string;
}

const locations: Location[] = [
  {
    id: 1,
    name: 'Chandmani (location you are)',
    description: '',
    isCurrentLocation: true
  },
  {
    id: 2,
    name: 'Erdenekhairhan',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
    image: '/images/route1.jpg'
  },
  {
    id: 3,
    name: 'Buga',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?'
  },
  {
    id: 4,
    name: 'Zavhanmandal',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?'
  },
  {
    id: 5,
    name: 'Santmargats',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?'
  },
  {
    id: 6,
    name: 'Tsetsen-Uul',
    description: ''
  }
];

export default function WishList() {
  return (
    <div>
      <TopBar />
      <main className={styles.main}>
        <div className={styles.routeContainer}>
          <div className={styles.mapSection}>
            <div className={styles.mapHeader}>
              <h1>Your Travel Route</h1>
              <div className={styles.sortBy}>
                <span>Sort by:</span>
                <select>
                  <option value="date">Date</option>
                  <option value="distance">Distance</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>
            <div className={styles.mapContainer}>
              <Image
                src="/images/route-map.jpg"
                alt="Travel route map"
                width={800}
                height={600}
                className={styles.mapImage}
              />
            </div>
          </div>

          <div className={styles.locationsList}>
            {locations.map((location, index) => (
              <div key={location.id} className={styles.locationItem}>
                <div className={styles.locationMarker}>
                  <div className={`${styles.marker} ${location.isCurrentLocation ? styles.currentMarker : ''}`}>
                    {location.isCurrentLocation ? (
                      <div className={styles.blueMarker} />
                    ) : (
                      <div className={styles.redMarker} />
                    )}
                  </div>
                  {index < locations.length - 1 && <div className={styles.markerLine} />}
                </div>
                <div className={styles.locationContent}>
                  <h3>{location.name}</h3>
                  {location.description && <p>{location.description}</p>}
                  {location.image && (
                    <div className={styles.locationImage}>
                      <Image
                        src={location.image}
                        alt={location.name}
                        width={400}
                        height={200}
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}