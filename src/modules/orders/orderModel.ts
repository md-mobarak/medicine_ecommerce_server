import mongoose, { Document, Schema, Model } from 'mongoose';
import { IProduct } from '../products/productModel';
import { IShippingAddress } from '../shipping/shippingAddressModel';


export interface IOrder extends Document {
  products: { product: IProduct['_id']; quantity: number }[];
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: IShippingAddress['_id'];
  user: mongoose.Schema.Types.ObjectId;
}

const OrderSchema: Schema<IOrder> = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: { type: Schema.Types.ObjectId, ref: 'ShippingAddress', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
