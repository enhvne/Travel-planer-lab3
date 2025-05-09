// Mock data for recently viewed items
let recentlyViewed = [
    {
        id: 1,
        image: "/images/image1.jpg",
        title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
        rating: "5.0",
        viewedAt: "2024-03-20T10:00:00Z"
    },
    {
        id: 2,
        image: "/images/image2.jpg",
        title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
        rating: "5.0",
        viewedAt: "2024-03-19T15:30:00Z"
    },
    {
        id: 3,
        image: "/images/image3.jpg",
        title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
        rating: "5.0",
        viewedAt: "2024-03-18T09:15:00Z"
    },
    {
        id: 4,
        image: "/images/image1.jpg",
        title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
        rating: "5.0",
        viewedAt: "2024-03-17T14:45:00Z"
    },
    {
        id: 5,
        image: "/images/image2.jpg",
        title: "Oтгoнтэнгэр уул, Завхан аймгийн Алдархаан сум",
        rating: "5.0",
        viewedAt: "2024-03-17T14:45:00Z"
    }
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Return recently viewed items sorted by viewedAt
        const sortedItems = [...recentlyViewed].sort((a, b) => 
            new Date(b.viewedAt) - new Date(a.viewedAt)
        );
        res.status(200).json(sortedItems);
    } 
    else if (req.method === 'POST') {
        try {
            const { image, title, rating } = req.body;

            // Validate required fields
            if (!image || !title || !rating) {
                return res.status(400).json({ 
                    error: 'Image, title, and rating are required' 
                });
            }

            // Create new recently viewed item
            const newItem = {
                id: recentlyViewed.length + 1,
                image,
                title,
                rating,
                viewedAt: new Date().toISOString()
            };

            // Add to beginning of array
            recentlyViewed.unshift(newItem);

            // Keep only last 10 items
            if (recentlyViewed.length > 10) {
                recentlyViewed = recentlyViewed.slice(0, 10);
            }

            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error adding recently viewed item:', error);
            res.status(500).json({ error: 'Failed to add recently viewed item' });
        }
    }
    else if (req.method === 'DELETE') {
        try {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'Item ID is required' });
            }

            // Remove item from array
            recentlyViewed = recentlyViewed.filter(item => item.id !== parseInt(id));

            res.status(200).json({ message: 'Item removed successfully' });
        } catch (error) {
            console.error('Error removing recently viewed item:', error);
            res.status(500).json({ error: 'Failed to remove recently viewed item' });
        }
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
