import { RequestHandler } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from './categoryService';

// Type for category type
type CategoryType = 'primary' | 'secondary' | 'tertiary';

// Type guard function to check if a string is a valid CategoryType
const isCategoryType = (value: string): value is CategoryType => {
  return ['primary', 'secondary', 'tertiary'].includes(value);
};

export const createCategoryController: RequestHandler = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create category.' });
  }
};

export const getCategoriesController: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', type = '' } = req.query;

    // Use the type guard to ensure the type is valid
    const categoryType: CategoryType | undefined = isCategoryType(type.toString()) ? type.toString() as CategoryType : undefined;

    const { categories, total } = await getCategories(
      Number(page),
      Number(limit),
      search.toString(),
      categoryType
    );

    res.status(200).json({ success: true, data: categories, total });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch categories.' });
  }
};

export const getCategoryByIdController: RequestHandler = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch category.' });
  }
};

export const updateCategoryController: RequestHandler = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update category.' });
  }
};

export const deleteCategoryController: RequestHandler = async (req, res) => {
  try {
    const category = await deleteCategory(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete category.' });
  }
};
