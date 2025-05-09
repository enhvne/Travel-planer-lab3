'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


interface province{
    id: number,
    name: string,
    image: string,
}
export default function FamousProvince(){
    const router = useRouter();
    const [provinces, setProvinces] = useState<province[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchProvinces = async ()=>{
            try{
                const response = await fetch('@/lib/api/famousProvince');
                const data = await response.json();
                setProvinces(data);
            } catch (err){
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally{
                setLoading(false);
            }
        };
        fetchProvinces();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
        
    
    return(
        <div>
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Famous provinces</h2>
                    <div className="grid grid-cols-4">
                        {provinces.map((province, index) => (
                        <div 
                            key={index} 
                            className="card"
                            onClick={() => router.push(`/searching`)}
                            >
                            <Image
                                src={province.image}
                                alt={province.name}
                                width={800}
                                height={450}
                                className="card-image"
                            />
                            <div className="card-content">
                            <h3>{province.name}</h3>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

// const provinces = [
//     { id: 1, name: "Govi", image: "/images/provinces/govi.jpg" },
//     { id: 2, name: "Zavkhan", image: "/images/provinces/zavkhan.jpg" },
//     { id: 3, name: "Khovsgol", image: "/images/provinces/khovsgol.jpg" },
//     { id: 4, name: "Bayan Olgii", image: "/images/provinces/bayanOlgii.jpg" },
//     { id: 5, name: "Arkhangai", image: "/images/provinces/arkhangai.jpg" },
//     { id: 6, name: "Uvs", image: "/images/provinces/uvs.jpg" },
//     { id: 7, name: "Dornod", image: "/images/provinces/dornod.jpg" },
//     { id: 8, name: "Uvurkhangai", image: "/images/provinces/uvurkhangai.jpg" }
// ];