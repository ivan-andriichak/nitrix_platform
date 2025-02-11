import mongoose from 'mongoose';

import { IApartment } from '../interfaces/apartment.interfaces';

const apartmentSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 90 },
  description: { type: String, required: true, maxlength: 335 },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true, enum: [1, 2, 3] },
  photos: { type: [String], default: [] },
});
export const Apartment = mongoose.model<IApartment>('Apartment', apartmentSchema);
