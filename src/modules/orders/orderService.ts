import Order, { IOrder } from './orderModel';

export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  const order = await Order.create(orderData);
  return order;
};

export const getOrders = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | '' = '',
  dateRange?: { startDate: Date; endDate: Date }
): Promise<{ orders: IOrder[]; total: number }> => {
  const query: any = {
    ...(search && { 'products.product': search }),
    ...(status && { status }),
  };

  if (dateRange) {
    query.createdAt = { $gte: dateRange.startDate, $lte: dateRange.endDate };
  }

  const orders = await Order.find(query)
    .populate('products.product')
    .populate('shippingAddress')
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Order.countDocuments(query);

  return { orders, total };
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id)
    .populate('products.product')
    .populate('shippingAddress');
};

export const updateOrder = async (
  id: string,
  data: Partial<IOrder>
): Promise<IOrder | null> => {
  return await Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate('products.product')
    .populate('shippingAddress');
};

export const deleteOrder = async (id: string): Promise<IOrder | null> => {
  return await Order.findByIdAndDelete(id);
};
