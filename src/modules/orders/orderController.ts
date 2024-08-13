import { RequestHandler } from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from './orderService';

// Type for order status
type OrderStatus = '' | 'pending' | 'shipped' | 'delivered' | 'cancelled';

// Type guard function to check if a string is a valid OrderStatus
const isOrderStatus = (value: string): value is OrderStatus => {
  return ['', 'pending', 'shipped', 'delivered', 'cancelled'].includes(value);
};

export const createOrderController: RequestHandler = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create order.' });
  }
};

export const getOrdersController: RequestHandler = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', startDate, endDate } = req.query;

    // Use the type guard to ensure the status is valid
    const orderStatus: OrderStatus | undefined = isOrderStatus(status.toString()) ? status.toString() as OrderStatus : undefined;

    const { orders, total } = await getOrders(
      Number(page),
      Number(limit),
      search.toString(),
      orderStatus,
      startDate && endDate ? { startDate: new Date(startDate.toString()), endDate: new Date(endDate.toString()) } : undefined
    );
    res.status(200).json({ success: true, data: orders, total });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch orders.' });
  }
};

export const getOrderByIdController: RequestHandler = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to fetch order.' });
  }
};

export const updateOrderController: RequestHandler = async (req, res) => {
  try {
    const order = await updateOrder(req.params.id, req.body);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update order.' });
  }
};

export const deleteOrderController: RequestHandler = async (req, res) => {
  try {
    const order = await deleteOrder(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete order.' });
  }
};
