import { RequestHandler } from 'express';
import { createShippingAddress, getShippingAddresses, getShippingAddressById, updateShippingAddress, deleteShippingAddress } from './shippingAddressService';

export const createShippingAddressController: RequestHandler = async (req, res) => {
  try {
    const address = await createShippingAddress(req.body);
    res.status(201).json({ success: true, data: address });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create shipping address.' });
  }
};

export const getShippingAddressesController: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { addresses, total } = await getShippingAddresses(Number(page), Number(limit));
    res.status(200).json({ success: true, data: addresses, total });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch shipping addresses.' });
  }
};

export const getShippingAddressByIdController: RequestHandler = async (req, res) => {
  try {
    const address = await getShippingAddressById(req.params.id);
    if (!address) {
      res.status(404).json({ success: false, message: 'Shipping address not found' });
      return;
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch shipping address.' });
  }
};

export const updateShippingAddressController: RequestHandler = async (req, res) => {
  try {
    const address = await updateShippingAddress(req.params.id, req.body);
    if (!address) {
      res.status(404).json({ success: false, message: 'Shipping address not found' });
      return;
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update shipping address.' });
  }
};

export const deleteShippingAddressController: RequestHandler = async (req, res) => {
  try {
    const address = await deleteShippingAddress(req.params.id);
    if (!address) {
      res.status(404).json({ success: false, message: 'Shipping address not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Shipping address deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete shipping address.' });
  }
};
