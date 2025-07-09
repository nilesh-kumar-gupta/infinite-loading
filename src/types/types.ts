interface IListing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    country: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  hotel: {
    name: string;
    starRating: number;
    amenities: string[];
  };
  rooms: {
    id: number;
    type: string;
    capacity: number;
    pricePerNight: number;
    available: boolean;
  }[];
  media: {
    images: string[];
    videos: string[];
  };
}

interface IAPIResponse<T> {
  success: boolean;
  data: T;
}

export type {IListing, IAPIResponse}