// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI!;
// const client = new MongoClient(uri);

// // Холболтын амлалтыг шууд үүсгэнэ
// const clientPromise = client.connect();

// export async function connectToDB() {
//   const connection = await clientPromise;
//   return connection.db('travel');
// }

// export default connectToDB;



import mongoose from 'mongoose';

const uri = 'mongodb+srv://erka344:Mathpizik12@cluster0.ro4rl2h.mongodb.net/travel?retryWrites=true&w=majority&appName=Cluster0'
// const uri = 'mongodb://localhost:27020/travel';

export async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectToDB;
