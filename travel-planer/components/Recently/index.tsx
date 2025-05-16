'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./style.module.css";

interface RecentlyViewedItem {
    id: number;
    image: string;
    title: string;
    rating: string;
    viewedAt: string;
}

export default function Recently() {
    const router = useRouter();
    const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecentlyViewed = async () => {
            try {
                const response = await fetch('/api/recently');
                if (!response.ok) {
                    throw new Error('Failed to fetch recently viewed items');
                }
                const data = await response.json();
                setRecentlyViewed(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRecentlyViewed();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (recentlyViewed.length === 0) return <div>No recently viewed items</div>;

    return (
        <div>
            <section className="section recently-viewed">
                <div className="container">
                    <h2 className="section-title">Recently viewed</h2>
                    <div className="grid">
                        {recentlyViewed.map((item) => (
                            <div 
                                key={item.id} 
                                className="card"
                                onClick={() => router.push(`/object`)}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={400}
                                    height={300}
                                    className="card-image"
                                />
                                <div className="card-content">
                                    <div className="rating">
                                        <Image src="/icons/star.svg" alt="Rating" width={16} height={16} />
                                        <span>{item.rating}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}