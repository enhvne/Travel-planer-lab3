export interface User {
    id: number,
    name: string,
    image: string,
    role: string,
    username: string,
    email: string,
    password: string,
    wishLists: WishList[] | null,
    comments: CommentU[] | null,
    isPro: boolean,
    recently: Destination[] | null,
    messages: string[] | null,
    savedTours?: number;
    completedTours?: number;
    settings?: Settings;
    activity?: ActivityItem[];
}

export interface CommentU {
    id: number,
    rating: number,
    date: Date | string,
    desc: string,
    author: User["name"],
}

export interface Destination { //object
    id: number,
    title: string,
    overview: string,
    category: Category["id"][], // hiking, biking, climbing, chillig
    province: Province["id"],
    images: string[],
    location: {lat: number, lng: number},
    sum: string | null,
    rating: number,
    filters: string[],       //extreme, horror
    comments: CommentU[] | null,
    // similars: Destination[] | null,
    hotels: Hotel[] | null,
    isWishListed: boolean,
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
    image: string,
}

export interface WishList{
    id: number,
    name: string,
    destinations?: Destination[],
    user?: User['id'], // shaardalagatai bolood null bolgov. (unendee null bish)
}

export interface Settings {
  emailNotifications: boolean;
  language: string;
  currency: string;
}

export interface ActivityItem {
  id: number;
  desc: string;
  date: string;
}