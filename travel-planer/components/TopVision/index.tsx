 'use client';

import { Destination } from '@/models/FrontEnd/model';
 import Image from 'next/image'
 import { useRouter } from 'next/navigation';
 import { useEffect, useState } from "react";
 
 export default function TopVisions(){
    const router = useRouter();
    const [topVisions, setTopVisions] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
      const fetchVisions = async () => {
        try{
          const response = await fetch(`api/topVision`);
          const data = await response.json();
          // json-oor irsen ogogdliig data-d ogj tuuniigee setTopVisions-aar damjuulan topVisions-d hiin
          setTopVisions(data);

        } catch (err){
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchVisions();
    }, []); 
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return(
        <div>
          <section className="section">
            <div className="container">
              <h2 className="section-title">Top Visions</h2>
              <div className="grid grid-cols-4">
                {topVisions.map((vision, index) => (
                  <div 
                    key={index} 
                    className="card"
                    onClick={() => router.push(`/destination/${vision.id}`)}
                  >
                    <Image
                      src={vision.images[0]}
                      alt={vision.title}
                      width={800}
                      height={450}
                      className="card-image"
                    />
                    <div className="card-content">
                      <h3>{vision.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
    )
}