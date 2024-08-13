import { Router } from 'express';
import {
  createShippingAddressController,
  getShippingAddressesController,
  getShippingAddressByIdController,
  updateShippingAddressController,
  deleteShippingAddressController,
} from './shippingAddressController';
import auth from '../../middleWare/authMiddleware';
// import auth from '../../middleware/authMiddleware';

const router = Router();

router.post('/shipping-addresses', auth, createShippingAddressController);
router.get('/shipping-addresses', getShippingAddressesController);
router.get('/shipping-addresses/:id', getShippingAddressByIdController);
router.put('/shipping-addresses/:id', auth, updateShippingAddressController);
router.delete('/shipping-addresses/:id', auth, deleteShippingAddressController);

export const shippingAddressRouter = router;
