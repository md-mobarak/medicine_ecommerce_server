import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IShippingAddress extends Document {
  division: string;
  district: string;
  subDistrict: string;
  address: string;
  name: string;
  phone: string;
}

const ShippingAddressSchema: Schema<IShippingAddress> = new Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
  subDistrict: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const ShippingAddress: Model<IShippingAddress> = mongoose.model<IShippingAddress>('ShippingAddress', ShippingAddressSchema);
export default ShippingAddress;
