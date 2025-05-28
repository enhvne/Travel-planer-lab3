// models/Destination.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IDestination extends Document {
  title: string;
  overview: string;
  category: mongoose.Types.ObjectId[];
  province: mongoose.Types.ObjectId;
  images: string[];
  location: { lat: number; lng: number };
  sum?: string;
  rating: number;
  filters: string[];
  comments: mongoose.Types.ObjectId[];
  hotels: mongoose.Types.ObjectId[];
  isWishListed: boolean;
}

const DestinationSchema = new Schema<IDestination>({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  province: { type: Schema.Types.ObjectId, ref: "Province" },
  images: [String],
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  sum: { type: String },
  rating: { type: Number, required: true },
  filters: [String],
  comments: [{ type: Schema.Types.ObjectId, ref: "CommentU" }],
  hotels: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
  isWishListed: { type: Boolean, default: false }
});

export const DestinationModel =
  mongoose.models.Destination || mongoose.model<IDestination>("Destination", DestinationSchema);