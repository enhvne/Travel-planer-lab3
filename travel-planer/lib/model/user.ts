import mongoose from 'mongoose';

const users = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
      }
})