export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  rooms: number;
  photos?: string[];
}

export interface ApiApartment {
  _id: string;
  title: string;
  description: string;
  price: number;
  rooms: number;
  photos?: string[];
}

export interface ApartmentState {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
}

export interface FormDataState {
  title: string;
  description: string;
  price: number;
  rooms: number;
  photos: File[];
  photoPreviews: string[];
}
