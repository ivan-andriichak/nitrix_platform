import { Router } from 'express';

import { apartmentController } from '../controllers/apartment.controller';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', apartmentController.getAll);

router.get('/:id', apartmentController.getById);

router.post('/', upload.array('photos', 10), apartmentController.create);

router.put('/:id', upload.array('photos', 10), apartmentController.update);

router.delete('/deleteAll', apartmentController.deleteAll);

router.delete('/:id', apartmentController.delete);

export const apartmentRouter = router;
