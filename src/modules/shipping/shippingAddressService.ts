import ShippingAddress, { IShippingAddress } from './shippingAddressModel';

export const createShippingAddress = async (addressData: IShippingAddress): Promise<IShippingAddress> => {
  const address = await ShippingAddress.create(addressData);
  return address;
};

export const getShippingAddresses = async (
  page: number = 1,
  limit: number = 10
): Promise<{ addresses: IShippingAddress[]; total: number }> => {
  const addresses = await ShippingAddress.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await ShippingAddress.countDocuments();

  return { addresses, total };
};

export const getShippingAddressById = async (id: string): Promise<IShippingAddress | null> => {
  return await ShippingAddress.findById(id);
};

export const updateShippingAddress = async (
  id: string,
  data: Partial<IShippingAddress>
): Promise<IShippingAddress | null> => {
  return await ShippingAddress.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteShippingAddress = async (id: string): Promise<IShippingAddress | null> => {
  return await ShippingAddress.findByIdAndDelete(id);
};
