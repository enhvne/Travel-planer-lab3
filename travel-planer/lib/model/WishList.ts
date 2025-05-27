// models/WishList.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IWishList extends Document {
  name: string;
  destinations?: mongoose.Types.ObjectId[];
  user?: mongoose.Types.ObjectId;
}

const WishListSchema = new Schema<IWishList>({
  name: { type: String, required: true },
  destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

export const WishListModel = mongoose.model<IWishList>("WishList", WishListSchema);