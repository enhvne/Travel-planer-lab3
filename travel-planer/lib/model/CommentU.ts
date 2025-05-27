// models/CommentU.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICommentU extends Document {
  rating: number;
  date: Date;
  desc: string;
  authorId: mongoose.Types.ObjectId;
}

const CommentUSchema = new Schema<ICommentU>({
  rating: { type: Number, required: true },
  date: { type: Date, required: true },
  desc: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export const CommentUModel = mongoose.model<ICommentU>("CommentU", CommentUSchema);
