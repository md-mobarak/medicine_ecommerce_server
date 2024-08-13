import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  thumbnail: string;
  type: 'primary' | 'secondary' | 'tertiary';
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  type: { type: String, enum: ['primary', 'secondary', 'tertiary'], required: true },
});

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
