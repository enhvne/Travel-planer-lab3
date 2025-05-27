// models/Hotel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IHotel extends Document {
  name: string;
  image: string;
  distance: number | null;
  price: number;
  rating: number;
  link: string;
}

const HotelSchema = new Schema<IHotel>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  distance: { type: Number },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  link: { type: String, required: true }
});

export const HotelModel = mongoose.model<IHotel>("Hotel", HotelSchema);