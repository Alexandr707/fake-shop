export type Rating = {
  rate: number;
  count: number;
};

export type ProductData = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};
