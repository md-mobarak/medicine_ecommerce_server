import { Router } from 'express';
import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from './productController';
import auth from '../../middleWare/authMiddleware';
// import auth from '../../middleware/authMiddleware';

const router = Router();

router.post('/products', auth, createProductController);
router.get('/products', getProductsController);
router.get('/products/:id', getProductByIdController);
router.put('/products/:id', auth, updateProductController);
router.delete('/products/:id', auth, deleteProductController);

export const productRouter = router;
