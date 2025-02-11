import { Router } from 'express';

import {
  createApartment,
  deleteAllApartments,
  deleteApartment,
  getApartment,
  getApartments,
  updateApartment,
} from '../controllers/apartment.controller';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getApartments);
router.get('/:id', getApartment);

router.post('/', upload.array('photos', 10), createApartment);

router.put('/:id', upload.array('photos', 10), updateApartment);

router.delete('/deleteAll', deleteAllApartments);
router.delete('/:id', deleteApartment);

export const apartmentRouter = router;
