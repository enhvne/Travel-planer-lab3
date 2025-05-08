 'use client';

 import Image from 'next/image'
 import { useRouter } from 'next/navigation';
 import { useEffect, useState } from "react";
 
 interface visions{
  id: number,
  name: string,
  image: string,
 }
 export default function TopVisions(){
    const router = useRouter()
    /// useState<visions[]>([]) ene int
    const [topVisions, setTopVisions] = useState<visions[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
      const fetchVisions = async () => {
        try{
          const response = await fetch('api/topVision');
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
                    onClick={() => router.push(`/searching`)}
                  >
                    <Image
                      src={vision.image}
                      alt={vision.name}
                      width={800}
                      height={450}
                      className="card-image"
                    />
                    <div className="card-content">
                      <h3>{vision.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
    )
}

//  const topVisions = [
//     { id: 1, name: "Altai Tavan Bogd", image: "/images/visions/tavanBogd.jpg" },
//     { id: 2, name: "Hovd River", image: "/images/visions/hovdgol.jpg" },
//     { id: 3, name: "Tsambagarav", image: "/images/visions/tsambagarav.jpg" },
//     { id: 4, name: "Horidol saridag", image: "/images/visions/horidol.jpg" },
//     { id: 5, name: "Tsagaan lake", image: "/images/visions/tsagaan.jpg" },
//     { id: 6, name: "Khuvsgul lake", image: "/images/visions/khuvsgul.jpg" },
//     { id: 7, name: "Uvs lake", image: "/images/visions/uvs.jpg" },
//     { id: 8, name: "Khetsuu rock", image: "/images/visions/khetsuu.jpg" }
//   ];
  