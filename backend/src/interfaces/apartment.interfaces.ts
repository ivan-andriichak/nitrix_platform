export interface IApartment {
  _id?: string;
  title: string;
  description: string[];
  price: number;
  rooms: number;
  photos?: string[];
}

export interface IApartmentFilters {
  priceMin?: number;
  priceMax?: number;
  rooms?: number;
}

export interface IApartmentResponse extends Pick<IApartment, 'title' | 'description' | 'price' | 'rooms' | 'photos'> {}
