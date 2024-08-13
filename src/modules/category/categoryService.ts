import Category, { ICategory } from './categoryModel';

export const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
  const category = await Category.create(categoryData);
  return category;
};

export const getCategories = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
  filterType: 'primary' | 'secondary' | 'tertiary' | '' = ''
): Promise<{ categories: ICategory[]; total: number }> => {
  const query = {
    ...(search && { name: new RegExp(search, 'i') }),
    ...(filterType && { type: filterType }),
  };

  const categories = await Category.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Category.countDocuments(query);

  return { categories, total };
};

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
  return await Category.findById(id);
};

export const updateCategory = async (
  id: string,
  data: Partial<ICategory>
): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  return await Category.findByIdAndDelete(id);
};
