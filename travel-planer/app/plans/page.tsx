'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import styles from './style.module.css';
import { mapStyles, retroStyle } from './mapStyles';
import { useUser } from '@/context/UserContext';

interface Location {
  id: number;
  name: string;
  description: string;
  isCurrentLocation?: boolean;
  image?: string;
  position: {
    lat: number;
    lng: number;
  };
  hotels?: {
    name: string;
    distance: string;
    price: string;
    location: string;
    rating: number;
  }[];
}

const locations: Location[] = [
  {
    id: 1,
    name: 'Chandmani (location you are)',
    description: '',
    isCurrentLocation: true,
    position: {
      lat: 47.8445,
      lng: 92.7236
    }
  },
  {
    id: 2,
    name: 'Erdenekhairhan',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
    image: '',
    position: {
      lat: 47.3833,
      lng: 92.4667
    },
    hotels: [
      {
        name: 'Erdene Guesthouse',
        distance: '500m from center',
        price: '$30/night',
        location: 'fsf',
        rating: 5,
      },
      {
        name: 'Khairkhan Hotel',
        distance: '700m from center',
        price: '$45/night',
        location: 'fsf',
        rating: 5,
      },
      {
        name: 'Khairkhan Hotel',
        distance: '700m from center',
        price: '$45/night',
        location: 'fsf',
        rating: 5,
      },
      {
        name: 'Khairkhan Hotel',
        distance: '700m from center',
        price: '$45/night',
        location: 'fsf',
        rating: 5,
      },
      
    ]
  },
  {
    id: 3,
    name: 'Buga',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
    position: {
      lat: 47.2167,
      lng: 92.3000
    }
  },
  {
    id: 4,
    name: 'Zavhanmandal',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
    position: {
      lat: 47.1500,
      lng: 92.2500
    }
  },
  {
    id: 5,
    name: 'Santmargats',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
    position: {
      lat: 47.0833,
      lng: 92.1667
    }
  },
  {
    id: 6,
    name: 'Tsetsen-Uul',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
    position: {
      lat: 47.0167,
      lng: 92.0833
    }
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 47.4306,
  lng: 92.4028
};

const mapOptions = {
  mapTypeId: 'terrain',
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyles,
};

export default function WishList() {
  const [markerIcons, setMarkerIcons] = useState<{ [key: string]: any }>({});
  const path = locations.map(location => location.position);
  const {user} = useUser();

  const onLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(location => bounds.extend(location.position));
    map.fitBounds(bounds);

    const icons = {
      current: {
        url: '/icons/blue-marker.svg',
        scaledSize: new window.google.maps.Size(24, 36),
        anchor: new window.google.maps.Point(12, 36)
      },
      default: {
        url: '/icons/red-marker.svg',
        scaledSize: new window.google.maps.Size(24, 36),
        anchor: new window.google.maps.Point(12, 36)
      }
    };
    setMarkerIcons(icons);
  }, []);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.routeContainer}>
          <div className={styles.mapSection}>
            <div className={styles.mapHeader}>
              <h1>Your Travel Route {user?.id}-aar nevtersen</h1>
              <div className={styles.sortBy}>
                <span>Lists:</span>
                <select>
                  <option value="date">Date</option>
                  <option value="distance">Distance</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>
            <div className={styles.mapContainer}>
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={8}
                  center={center}
                  onLoad={onLoad}
                  options={mapOptions}
                >
                  {locations.map((location) => (
                    <Marker
                      key={location.id}
                      position={location.position}
                      icon={markerIcons[location.isCurrentLocation ? 'current' : 'default']}
                    />
                  ))}
                  <Polyline
                    path={path}
                    options={{
                      strokeColor: '#E5E7EB',
                      strokeOpacity: 1,
                      strokeWeight: 2,
                    }}
                  />
                </GoogleMap>
              </LoadScript>
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
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  {location.hotels && location.hotels.length > 0 && (
                    <div className={styles.hotelInfo}>
                      <h4>Nearby Hotels</h4>
                      <div className={styles.hotels}>
                        {location.hotels.map((hotel, i) => (
                          <div key={i} className={styles.hotel}>
                            <div className={styles.hotelImage}>
                              <span>buudliin zurag</span>
                            </div>
                            <div className={styles.hotelDetails}>
                              <p><strong>Zochil buudel</strong></p>
                              <p>location {hotel.location}</p>
                              <p>{hotel.price} per night</p>
                              <div className={styles.stars}>
                                🌟 {hotel.rating} stars
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}