import type { Request, Response } from 'express';

import { IApartment } from '../interfaces/apartment.interfaces';
import { Apartment } from '../models/apartment.model';

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

export const createApartment = async (req: Request, res: Response): Promise<void> => {
  const { title, description, price, rooms } = req.body as IApartment;

  const files = req.files as unknown as MulterFile[] | MulterFile | undefined;

  let photos: string[] = [];
  if (files) {
    photos = Array.isArray(files) ? files.map((file) => `/uploads/${file.filename}`) : [`/uploads/${files.filename}`];
  } else if (req.body.photos) {
    photos = Array.isArray(req.body.photos) ? req.body.photos : [req.body.photos];
  }

  try {
    if (!photos.length) {
      res.status(400).json({ message: 'No photos uploaded' });
      return;
    }

    const newApartment = new Apartment({
      title,
      description,
      price,
      rooms,
      photos,
    });

    const savedApartment = await newApartment.save();
    res.status(201).json(savedApartment);
  } catch (err: any) {
    res.status(500).json({ message: 'Error adding apartment', error: err.message });
  }
};

export const getApartments = async (req: Request, res: Response) => {
  const { priceMin, priceMax, rooms }: { priceMin?: number; priceMax?: number; rooms?: number } = req.query;

  try {
    const filters: any = {};
    if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.$gte = priceMin;
      if (priceMax) filters.price.$lte = priceMax;
    }
    if (rooms) {
      filters.rooms = rooms;
    }

    const apartments = await Apartment.find(filters);
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving apartments', error: err.message });
  }
};

export const getApartment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      res.status(404).json({ message: 'Apartment not found' });
    }
    res.json(apartment);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving apartment', error: err.message });
  }
};

export const updateApartment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body; // містить текстові поля (title, description, price, rooms, тощо)

  const files = req.files as unknown as MulterFile[] | MulterFile | undefined;
  let newPhotos: string[] = [];
  if (files) {
    newPhotos = Array.isArray(files)
      ? files.map((file) => `/uploads/${file.filename}`)
      : [`/uploads/${(files as MulterFile).filename}`];
  }

  let photosToRemove: string[] = [];
  if (req.body.photosToRemove) {
    try {
      photosToRemove =
        typeof req.body.photosToRemove === 'string' ? JSON.parse(req.body.photosToRemove) : req.body.photosToRemove;
    } catch (err) {
      photosToRemove = [req.body.photosToRemove];
      res.status(400).json({ message: 'Invalid photosToRemove format', error: err.message });
    }
  }

  try {
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      res.status(404).json({ message: 'Apartment not found' });
      return;
    }

    apartment.title = updates.title || apartment.title;
    apartment.description = updates.description || apartment.description;
    apartment.price = updates.price || apartment.price;
    apartment.rooms = updates.rooms || apartment.rooms;

    if (photosToRemove.length > 0) {
      apartment.photos = apartment.photos.filter((photo) => !photosToRemove.includes(photo));
    }

    if (newPhotos.length > 0) {
      apartment.photos = apartment.photos.concat(newPhotos);
    }

    const updatedApartment = await apartment.save();
    res.json(updatedApartment);
  } catch (err: any) {
    res.status(500).json({ message: 'Error updating apartment', error: err.message });
  }
};

export const deleteApartment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedApartment = await Apartment.findByIdAndDelete(id);
    if (!deletedApartment) {
      res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting apartment', error: err.message });
  }
};

export const deleteAllApartments = async (req: Request, res: Response): Promise<void> => {
  try {
    await Apartment.deleteMany({});
    res.status(200).json({ message: 'All apartments deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Error deleting all apartments', error: err.message });
  }
};
