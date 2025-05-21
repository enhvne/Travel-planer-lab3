'use client'

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import type { WishList } from '@/models/model';
import { useUser } from '@/context/UserContext';

export default function WishList() {
    const router = useRouter()
    const [wishlists, setWishlists] = useState<WishList[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const { user } = useUser();

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
        if (user) {
            const name = window.prompt("Enter wishlist name:");
                if (!name || !name.trim()) return;
                const newList: WishList = {
                    id: Date.now(),
                    name: name.trim()
                };
                setWishlists([...wishlists, newList]);
            };
            
        }
        

    const deleteWishlist = (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // prevent navigation
        setWishlists(wishlists.filter(wish => wish.id !== id));
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
                                <Image
                                    src="/images/add-icon.png"
                                    alt= {wish.name}
                                    width={200}
                                    height={200}
                                    className= {styles.card_image}
                                />
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
                            {Array.from({ length: 30 }).map((_, i) => (
                            <p key={i} >
                                {wishlists.find(w => w.id === selectedId)?.name ?? 'No name'}
                            </p>
                            ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div> 
    );
}
