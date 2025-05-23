// models/Comment.ts
import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  rating: { type: Number, required: true },
  date: { type: Date, required: true },
  desc: { type: String, required: true },
  authorId: { type: Number, required: true },
});

export default mongoose.models.CommentU || mongoose.model('CommentU', CommentSchema);
