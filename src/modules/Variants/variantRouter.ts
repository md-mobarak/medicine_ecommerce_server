import { Router } from 'express';
import {
  createVariantController,
  getVariantsController,
  getVariantByIdController,
  updateVariantController,
  deleteVariantController,
} from './variantController';
import auth from '../../middleWare/authMiddleware';
// import auth from '../../middleware/authMiddleware';

const router = Router();

router.post('/variants', auth, createVariantController);
router.get('/variants', getVariantsController);
router.get('/variants/:id', getVariantByIdController);
router.put('/variants/:id', auth, updateVariantController);
router.delete('/variants/:id', auth, deleteVariantController);

export const variantRouter = router;
