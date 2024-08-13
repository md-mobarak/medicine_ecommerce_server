import { Router } from 'express';
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from './categoryController';
import auth from '../../middleWare/authMiddleware';
// import auth from '../../middleware/authMiddleware';

const router = Router();

router.post('/categories', auth, createCategoryController);
router.get('/categories', getCategoriesController);
router.get('/categories/:id', getCategoryByIdController);
router.put('/categories/:id', auth, updateCategoryController);
router.delete('/categories/:id', auth, deleteCategoryController);

export const categoryRouter = router;
