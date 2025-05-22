import { WishList } from "@/models/model";
import { NextRequest, NextResponse } from "next/server"

const wishlist1 = [
    {
      id: 1,
      title: 'Chandmani (location you are)',
      overview: '',
      isCurrentLocation: true,
      position: {
        lat: 47.8445,
        lng: 92.7236
      }
    },
    {
      id: 2,
      title: 'Erdenekhairhan',
      overview: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
      image: '',
      position: {
        lat: 47.3833,
        lng: 92.4667
      },
      hotels: [
        {
          name: 'Erdene Guesthouse',
          distance: '500m from center',
          price: '$30/night',
          location: 'fsf',
          rating: 5,
        },
        {
          name: 'Khairkhan Hotel',
          distance: '700m from center',
          price: '$45/night',
          location: 'fsf',
          rating: 5,
        },
        {
          name: 'Khairkhan Hotel',
          distance: '700m from center',
          price: '$45/night',
          location: 'fsf',
          rating: 5,
        },
        {
          name: 'Khairkhan Hotel',
          distance: '700m from center',
          price: '$45/night',
          location: 'fsf',
          rating: 5,
        },
        
      ]
    },
    {
      id: 3,
      title: 'Buga',
      overview: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
      position: {
        lat: 47.2167,
        lng: 92.3000
      }
    },
    {
      id: 4,
      title: 'Zavhanmandal',
      overview: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
      position: {
        lat: 47.1500,
        lng: 92.2500
      }
    },
    {
      id: 5,
      title: 'Santmargats',
      overview: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
      position: {
        lat: 47.0833,
        lng: 92.1667
      }
    },
    {
      id: 6,
      title: 'Tsetsen-Uul',
      overview: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
      position: {
        lat: 47.0167,
        lng: 92.0833
      }
    }
  ];

  const wishlist2 = [
    {
      id: 1,
      title: 'Chandmani (location you are)',
      overview: '',
      isCurrentLocation: true,
      position: {
        lat: 47.8445,
        lng: 92.7236
      }
    },
    {
      id: 2,
      title: 'Erdenekhairhan',
      overview: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ratione, laborum totam labore exercitationem cum maxime dolorem voluptatum molestiae eaque repellat error, accusamus consequuntur cumque at sunt sapiente nobis iusto et ipsam necessitatibus. Id, itaque?',
      image: '',
      position: {
        lat: 47.3833,
        lng: 92.4667
      },
      hotels: [
        {
          name: 'Erdene Guesthouse',
          distance: '500m from center',
          price: '$30/night',
          location: 'fsf',
          rating: 5,
        },
        {
          name: 'Khairkhan Hotel',
          distance: '700m from center',
          price: '$45/night',
          location: 'fsf',
          rating: 5,
        },
        {
          name: 'Khairkhan Hotel',
          distance: '700m from center',
          price: '$45/night',
          location: 'fsf',
          rating: 5,
        },
        {
          name: 'Khairkhan Hotel',
          distance: '700m from center',
          price: '$45/night',
          location: 'fsf',
          rating: 5,
        },
        
      ]
    }
];
  
let wishlists=[
    {id: 1, name: 'wishlist1-1', destinations: wishlist1, userId: 1},
    {id: 2, name: 'wishlist1-2', destinations: wishlist2, userId: 1},
    {id: 3, name: 'wishlist2-1', destinations: wishlist1, userId: 2}

]
export async function GET(
    request: Request,
    { params }: {params: {userid: number}}
){
    const UserId = params.userid;
    let filteredWisgList = wishlists;
    if (UserId) {
        filteredWisgList = wishlists.filter(item =>item.userId == UserId)
    }
    return NextResponse.json(filteredWisgList)
}