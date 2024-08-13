import mongoose, { Document, Schema, Model } from 'mongoose';
import { ICategory } from '../category/categoryModel';
import { IVariant } from '../Variants/variantModel';


export interface IProduct extends Document {
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount?: number;
  stockStatus: boolean;
  status: 'active' | 'inactive';
  categories: ICategory['_id'][];
  variants: IVariant['_id'][];
}

const ProductSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  photos: [{ type: String, required: true }],
  description: { type: String, required: true },
  metaKey: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  stockStatus: { type: Boolean, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
