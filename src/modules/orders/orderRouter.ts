import { Router } from 'express';
import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
} from './orderController';
import auth from '../../middleWare/authMiddleware';
// import auth from '../../middleware/authMiddleware';

const router = Router();

router.post('/orders', auth, createOrderController);
router.get('/orders', auth, getOrdersController);
router.get('/orders/:id', auth, getOrderByIdController);
router.put('/orders/:id', auth, updateOrderController);
router.delete('/orders/:id', auth, deleteOrderController);

export const orderRouter = router;
