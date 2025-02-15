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

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface IApartmentResponse
  extends Pick<
    IApartment,
    'title' | 'description' | 'price' | 'rooms' | 'photos'
  > {}
