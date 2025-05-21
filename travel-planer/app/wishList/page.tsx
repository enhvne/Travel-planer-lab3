'use client'

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import type { WishList, User } from '@/models/model';
import { useUser } from '@/context/UserContext';

export default function WishList() {
    const router = useRouter()
    const [wishlists, setWishlists] = useState<WishList[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const { user, setUser } = useUser();

    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [loginInput, setLoginInput] = useState({ username: '', password: '' });


    useEffect(() => {
        const fetchWishList = async () =>{
            try{
                const response = await fetch('/api/wishList');
                const data = await response.json();
                setWishlists(data);
            } catch (err){
                setError(err instanceof Error ? err.message : 'Error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchWishList();

    }, []);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setSelectedId(null);
            }
        };
    
        if (selectedId !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedId]);
    

    const clickBtn = (): void => {
        if (!user) {
            window.alert("Та энэхүү үйлдлийг хийхийн тулд нэвтэрсэн байх шаардлагатай.");
            return;
            // setShowLoginPrompt(true);
            // return;
        }

        const name = window.prompt("Enter wishlist name:");
        if (!name || !name.trim()) return;

        const newList: WishList = {
            id: Date.now(),
            name: name.trim(),
            destinations: [],
        };
        setWishlists([...wishlists, newList]);
        
    }
    const deleteWishlist = (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // prevent navigation
        setWishlists(wishlists.filter(wish => wish.id !== id));
    };
    const deleteDestinationFromWishlist = (wishlistId: number, destIdToDelete: number) => {
        setWishlists(prev => {
          const updated = prev
            .map(wishlist => {
              if (wishlist.id === wishlistId && wishlist.destinations) {
                const updatedDestinations = wishlist.destinations.filter(dest => dest.id !== destIdToDelete);
      
                // Хэрвээ destinations хоосон бол энэ wishlist-ийг устгана
                if (updatedDestinations.length === 0) {
                  return null; // түр хугацаанд null болгоно
                }
      
                    return {
                    ...wishlist,
                    destinations: updatedDestinations,
                    };
                }
                return wishlist;
            })
            .filter((w): w is WishList => w !== null); // TypeScript-д null биш гэдгийг заана
      
          return updated;
        });
    };
      
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <div className={styles.wishList}>
                <h1>WishList</h1>
                <div className={styles.container}>
                    {/* <div className={styles.main}> */}
                        <button 
                            className={styles.addBtn}
                            onClick={clickBtn}
                        >
                            <Image
                                src="/images/add-icon.png"
                                alt="add"
                                width={200}
                                height={200}
                                className= {styles.card_image}
                            />
                            <p>New wishlist</p>
                        </button>

                        {wishlists.map(wish => (
                            <button 
                                key={wish.id} 
                                className={styles.card}
                                onClick={() => setSelectedId(wish.id!)}
                            >
                                <div className={styles.imageBox}>
                                    {wish.destinations && wish.destinations.length > 0 ? (
                                        <Image
                                        src={wish.destinations[0].images?.[0] || "/images/default.jpg"}
                                        alt={wish.destinations[0].title}
                                        width={200}
                                        height={200}
                                        className={styles.card_image}
                                        />
                                    ) : (
                                        <Image
                                        src="/images/default.jpg"
                                        alt="default"
                                        width={200}
                                        height={200}
                                        className={styles.card_image}
                                        />
                                    )}
                                </div>
                                <p>{wish.name}</p>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={(e) => deleteWishlist(wish.id, e)}
                                >x</button>
                            </button>
                        ))}
                    {/* </div> */}
                    
                    {selectedId && (
                    <div className={styles.rightSidebar} ref={sidebarRef}>
                        <h2 className={styles.fixedHeader}>
                            {wishlists.find(w => w.id === selectedId)?.name ?? "Wishlist"}
                        </h2>
                        <div className={styles.scrollableContent}>
                            {wishlists.find(w => w.id === selectedId)?.destinations?.map((destId, i)=>(
                                <div className={styles.wishListItem} onClick={() => router.push(`/object/${destId.id}`)}>
                                    <Image
                                        src={destId.images[0]}
                                        alt= {destId.title}
                                        width={150}
                                        height={150}
                                        className={styles.wishListItemImage}
                                    />
                                    <p>{destId.title}</p>
                                    <p>{destId.province}</p>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteDestinationFromWishlist(selectedId, destId.id)}
                                    >x</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div> 
    );
}
