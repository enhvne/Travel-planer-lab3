'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import styles from './style.module.css';
import { mapStyles, retroStyle } from './mapStyles';
import { useUser } from '@/context/UserContext';
import type { WishList } from '@/models/model';

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

export default function Plans() {
  const [markerIcons, setMarkerIcons] = useState<{ [key: string]: any }>({});
  const [wishlists, setWishlists] = useState<WishList[]>([]);
  const [selectedWishListId, setSelectedWishListId] = useState<number|null>(null);
  
  
  const { user } = useUser();

  useEffect(()=>{
    async function fetchData(){
      try{
        const res = await fetch(`/api/plans/2`);//${user?.id}
        const data: WishList[] = await res.json();
        setWishlists(data);

        if (data.length > 0) {
          setSelectedWishListId(data[0].id)
        }
      } catch(err){

      }
    }
    fetchData();
  }, []);

  const selectedList = wishlists.find(w => w.id === selectedWishListId);

  const path = selectedList?.destinations?.map(dest=> dest.location)||[]

  const onLoad = useCallback((map: any) => {
    if (!selectedList?.destinations || selectedList.destinations.length === 0) return;
  
    const bounds = new window.google.maps.LatLngBounds();
    selectedList.destinations.forEach(dest => {
      if (dest.location) {
        bounds.extend(dest.location);
      }
    });
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
  }, [selectedList]);
  

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.routeContainer}>
          <div className={styles.mapSection}>
            <div className={styles.mapHeader}>
              <h1>Your Travel Route {user?.id}-aar nevtersen</h1>
              <div className={styles.sortBy}>
                <span>Lists:</span>
                <select
                  id="wishlist-select"
                  value={selectedWishListId ?? ""}
                  onChange={(e) => setSelectedWishListId(Number(e.target.value))}
                >
                  {wishlists.map(wish => (
                    <option key={wish.id} value={wish.id}>
                      {wish.name}
                    </option>
                  ))}
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
                  {selectedList?.destinations?.map((dest) => (
                    <Marker
                      key={dest.id}
                      position={dest.location}
                      icon={markerIcons[dest.isWishListed ? 'current' : 'default']}//bainga true
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
            {selectedList?.destinations?.map((location, index) => (
              <div key={location.id} className={styles.locationItem}>
                <div className={styles.locationMarker}>
                  <div className={`${styles.marker} ${location.isWishListed ? styles.currentMarker : ''}`}>
                    {location.isWishListed ? (
                      <div className={styles.blueMarker} />
                    ) : (
                      <div className={styles.redMarker} />
                    )}
                  </div>
                  {index < (selectedList?.destinations?.length ?? 0) - 1 && (
                    <div className={styles.markerLine} />
                  )}

                </div>
                <div className={styles.locationContent}>
                  <h3>{location.title}</h3>
                  {location.overview && <p>{location.overview}</p>}
                  {/* {location.image && (
                    <div className={styles.locationImage}>
                      <Image
                        src={location.image}
                        alt={location.name}
                        width={400}
                        height={200}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )} */}
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
                              <p>location {hotel.distance}</p>
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
