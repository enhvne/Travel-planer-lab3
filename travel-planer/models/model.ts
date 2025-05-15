export interface User {
    id: number,
    name: string,
    image: string,
    username: string,
    email: string,
    password: string,
    destination: Destination[] | null,
    comments: Comment[] | null,
}

export interface Comment {
    id: number,
    date: Date | string,
    desc: string,
    author: User,
}

export interface Destination { //object
    id: number,
    title: string,
    overview: string,
    category: Category[], // hiking, biking, climbing, chillig
    province: string,
    image: string,
    location: {lat: number, lng: number},
    sum: string | null,
    rating: number,
    comments: Comment[] | null,
    similars: Destination[] | null,
    hotels: Hotel[] | null,
    iswishListed: boolean,
}

export interface Category {
    id: number,
    name: string,

}

export interface Hotel {
    id: number,
    name: string,
    distance: number,
    price: number,
    rating: number,
}
