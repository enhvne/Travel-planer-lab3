export interface User {
    id: number,
    name: string,
    image: string,
    role: string,
    username: string,
    email: string,
    password: string,
    wishList: Destination[] | null,
    comments: Comment[] | null,
    isPro: boolean,
    recently: Destination[] | null,
}

export interface Comment {
    id: number,
    rating: number,
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
    filters: string[],//extreme, horror
    comments: Comment[] | null,
    // similars: Destination[] | null,
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
    image: string,
    distance: number | null,
    price: number,
    rating: number,
}

export interface Province{
    id: number,
    name: string,
}