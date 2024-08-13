import { RequestHandler } from 'express';
import { createVariant, getVariants, getVariantById, updateVariant, deleteVariant } from './variantService';

export const createVariantController: RequestHandler = async (req, res) => {
  try {
    const variant = await createVariant(req.body);
    res.status(201).json({ success: true, data: variant });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create variant.' });
  }
};

export const getVariantsController: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const { variants, total } = await getVariants(Number(page), Number(limit), search.toString());
    res.status(200).json({ success: true, data: variants, total });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch variants.' });
  }
};

export const getVariantByIdController: RequestHandler = async (req, res) => {
  try {
    const variant = await getVariantById(req.params.id);
    if (!variant) {
      res.status(404).json({ success: false, message: 'Variant not found' });
      return;
    }
    res.status(200).json({ success: true, data: variant });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch variant.' });
  }
};

export const updateVariantController: RequestHandler = async (req, res) => {
  try {
    const variant = await updateVariant(req.params.id, req.body);
    if (!variant) {
      res.status(404).json({ success: false, message: 'Variant not found' });
      return;
    }
    res.status(200).json({ success: true, data: variant });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update variant.' });
  }
};

export const deleteVariantController: RequestHandler = async (req, res) => {
  try {
    const variant = await deleteVariant(req.params.id);
    if (!variant) {
      res.status(404).json({ success: false, message: 'Variant not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Variant deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete variant.' });
  }
};
