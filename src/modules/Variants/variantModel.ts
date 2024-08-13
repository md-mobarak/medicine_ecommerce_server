import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IVariant extends Document {
  name: string;
  price: number;
}

const VariantSchema: Schema<IVariant> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Variant: Model<IVariant> = mongoose.model<IVariant>('Variant', VariantSchema);
export default Variant;
