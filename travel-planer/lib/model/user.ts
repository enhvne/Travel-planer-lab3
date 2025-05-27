import mongoose, { Schema, Document } from "mongoose";

// TypeScript Interface
export interface IUser extends Document {
  name: string;
  image: string;
  token: string;
  role: string;
  username: string;
  email: string;
  password: string;
  wishLists: mongoose.Types.ObjectId[] | null;
  comments: mongoose.Types.ObjectId[] | null;
  isPro: boolean;
  recently: mongoose.Types.ObjectId[] | null;
  messages: string[] | null;
  savedTours?: number;
  completedTours?: number;
  settings?: {
    emailNotifications: boolean;
    language: string;
    currency: string;
  };
  activity?: {
    id: number;
    desc: string;
    date: string;
  }[];
}

// Mongoose Schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  image: { type: String },
  token: { type: String },
  role: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  wishLists: [{ type: Schema.Types.ObjectId, ref: "WishList" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "CommentU" }],
  isPro: { type: Boolean, default: false },
  recently: [{ type: Schema.Types.ObjectId, ref: "Destination" }],
  messages: [{ type: String }],
  savedTours: { type: Number },
  completedTours: { type: Number },
  settings: {
    emailNotifications: Boolean,
    language: String,
    currency: String,
  },
  activity: [
    {
      id: Number,
      desc: String,
      date: String,
    },
  ],
});

// Model үүсгэх
// export const UserModel = mongoose.model<IUser>("User", UserSchema);
export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
