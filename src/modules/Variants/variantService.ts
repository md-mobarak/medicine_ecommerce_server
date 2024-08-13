import Variant, { IVariant } from './variantModel';

export const createVariant = async (variantData: IVariant): Promise<IVariant> => {
  const variant = await Variant.create(variantData);
  return variant;
};

export const getVariants = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<{ variants: IVariant[]; total: number }> => {
  const query = {
    ...(search && { name: new RegExp(search, 'i') }),
  };

  const variants = await Variant.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Variant.countDocuments(query);

  return { variants, total };
};

export const getVariantById = async (id: string): Promise<IVariant | null> => {
  return await Variant.findById(id);
};

export const updateVariant = async (
  id: string,
  data: Partial<IVariant>
): Promise<IVariant | null> => {
  return await Variant.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteVariant = async (id: string): Promise<IVariant | null> => {
  return await Variant.findByIdAndDelete(id);
};
