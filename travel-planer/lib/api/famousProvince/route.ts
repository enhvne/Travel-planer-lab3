

let provinces = [
    { id: 1, name: "Govi", image: "/images/provinces/govi.jpg" },
    { id: 2, name: "Zavkhan", image: "/images/provinces/zavkhan.jpg" },
    { id: 3, name: "Khovsgol", image: "/images/provinces/khovsgol.jpg" },
    { id: 4, name: "Bayan Olgii", image: "/images/provinces/bayanOlgii.jpg" },
    { id: 5, name: "Arkhangai", image: "/images/provinces/arkhangai.jpg" },
    { id: 6, name: "Uvs", image: "/images/provinces/uvs.jpg" },
    { id: 7, name: "Dornod", image: "/images/provinces/dornod.jpg" },
    { id: 8, name: "Uvurkhangai", image: "/images/provinces/uvurkhangai.jpg" }
]

export default function get(req, res){

    if(req.method == 'GET'){
        res.status(200).json(provinces)

    } else if (req.method == 'POST'){
        const {name, image} = req.body;

        if (!name || !image) {
            return res.status(400).json({
                error: 'name and image required'
            });
        }
    } else{
        res.status(405).json({error: 'Method not allowed'})
    }
}