export interface ITour {
  id: string;
  categoryId: {
    _id: string;
    name: string;
  };
  userId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  duration: number;
  available_dates: Date;
  itinerary: string;
  images: string[];
  userIds: string[];
  reviewIds: [
    {
      _id: string;
      userId: string;
      tourId: string;
      rating: number;
      review: string;
    }
  ];
  number_of_people: number;
  max_group_size: number;
  min_group_size: number;
  tour_guide: {
    id: string;
    name: string;
    bio: string;
    languages_spoken: string[];
    rating: number;
  };
  rating?: number;
  reviews?: number;
  averageRating?: number;
}
