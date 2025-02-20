import { existsSync } from 'node:fs';

import { NextFunction, Request, Response } from 'express';
import { unlink } from 'fs';
import { promisify } from 'util';

import { IApartment, MulterFile } from '../interfaces/apartment.interfaces';
import { Apartment } from '../models/apartment.model';
import path from 'path';

const unlinkAsync = promisify(unlink);

class ApartmentController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, price, rooms } = req.body as IApartment;
      const files = req.files as MulterFile[] | MulterFile | undefined;

      let photos: string[] = [];
      if (files) {
        photos = Array.isArray(files)
          ? files.map((file) => `/uploads/${file.filename}`)
          : [`/uploads/${files.filename}`];
      }

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
    } catch (e) {
      next(e);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        priceMin,
        priceMax,
        rooms,
      }: { priceMin?: number; priceMax?: number; rooms?: number } = req.query;

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
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const apartment = await Apartment.findById(id);

      if (!apartment) {
        res.status(404).json({ message: 'Apartment not found' });
        return;
      }

      res.json(apartment);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const files = req.files as MulterFile[] | MulterFile | undefined;

      let newPhotos: string[] = [];
      if (files) {
        newPhotos = Array.isArray(files)
          ? files.map((file) => `/uploads/${file.filename}`)
          : [`/uploads/${files.filename}`];
      }

      let photosToRemove: string[] = [];
      if (req.body.photosToRemove) {
        try {
          photosToRemove =
            typeof req.body.photosToRemove === 'string'
              ? JSON.parse(req.body.photosToRemove)
              : req.body.photosToRemove;
        } catch (e) {
          res.status(400).json({
            message: 'Invalid photosToRemove format',
            error: e.message,
          });
          return;
        }
      }

      const apartment = await Apartment.findById(id);
      if (!apartment) {
        res.status(404).json({ message: 'Apartment not found' });
        return;
      }

      // Видалення фотографій з файлової системи, якщо вони більше не потрібні
      for (const photo of photosToRemove) {
        const filePath = photo.replace('/uploads', 'uploads'); // Шлях до файлу в файловій системі
        try {
          await unlinkAsync(filePath);
        } catch (error) {
          console.error(error);
        }
      }

      // Оновлення фотографій
      Object.assign(apartment, updates);
      apartment.photos = apartment.photos.filter((photo) => !photosToRemove.includes(photo));
      apartment.photos.push(...newPhotos);

      const updatedApartment = await apartment.save();
      res.json(updatedApartment);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const apartment = await Apartment.findById(id);

      if (!apartment) {
        res.status(404).json({ message: 'Apartment not found' });
        return;
      }

      // Видалення фотографій з файлової системи
      for (const photo of apartment.photos) {
        const filePath = path.join(__dirname, '..', photo.replace('/uploads', 'uploads')); // Коректний шлях
        if (existsSync(filePath)) {
          try {
            await unlinkAsync(filePath);
          } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error);
          }
        } else {
          console.warn(`File not found for deletion: ${filePath}`);
        }
      }

      await Apartment.findByIdAndDelete(id);

      res.status(200).json({ message: 'Apartment deleted successfully' });
    } catch (e) {
      next(e);
    }
  }

  public async deleteAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await Apartment.deleteMany({});
      res.status(200).json({ message: 'All apartments deleted successfully' });
    } catch (e) {
      next(e);
    }
  }
}

export const apartmentController = new ApartmentController();
