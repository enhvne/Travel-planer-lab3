'use client';

import { Province } from "@/models/FrontEnd/model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function FamousProvince(){
    const router = useRouter();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProvinces = async () => {
          try {
            const response = await fetch('/api/famousProvince'); // ✔ зөв зам
            const data = await response.json();
            setProvinces(data);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Error occurred');
          } finally {
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
                            onClick={() => router.push(`/searching/${province.name}`)}
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