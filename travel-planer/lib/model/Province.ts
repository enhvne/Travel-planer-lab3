// models/Province.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProvince extends Document {
  name: string;
  image: string;
}

const ProvinceSchema = new Schema<IProvince>({
  name: { type: String, required: true },
  image: { type: String, required: true }
});

export const ProvinceModel = mongoose.model<IProvince>("Province", ProvinceSchema);
