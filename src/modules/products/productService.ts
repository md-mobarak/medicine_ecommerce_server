import Product, { IProduct } from './productModel';

export const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const product = await Product.create(productData);
  return product;
};

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
  filterStatus: 'active' | 'inactive' | '' = '',
  category: string = ''
): Promise<{ products: IProduct[]; total: number }> => {
  const query = {
    ...(search && { name: new RegExp(search, 'i') }),
    ...(filterStatus && { status: filterStatus }),
    ...(category && { categories: category }),
  };

  const products = await Product.find(query)
    .populate('categories')
    .populate('variants')
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(query);

  return { products, total };
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate('categories').populate('variants');
};

export const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate('categories').populate('variants');
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};
