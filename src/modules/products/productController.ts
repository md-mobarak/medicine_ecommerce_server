import { RequestHandler } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from './productService';

// Type for product status
type ProductStatus = '' | 'active' | 'inactive';

// Type guard function to check if a string is a valid ProductStatus
const isProductStatus = (value: string): value is ProductStatus => {
  return ['', 'active', 'inactive'].includes(value);
};

export const createProductController: RequestHandler = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create product.' });
  }
};

export const getProductsController: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', category = '' } = req.query;

    // Use the type guard to ensure the status is valid
    const productStatus: ProductStatus | undefined = isProductStatus(status.toString()) ? status.toString() as ProductStatus : undefined;

    const { products, total } = await getProducts(
      Number(page),
      Number(limit),
      search.toString(),
      productStatus,
      category.toString()
    );

    res.status(200).json({ success: true, data: products, total });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch products.' });
  }
};

export const getProductByIdController: RequestHandler = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch product.' });
  }
};

export const updateProductController: RequestHandler = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update product.' });
  }
};

export const deleteProductController: RequestHandler = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete product.' });
  }
};
