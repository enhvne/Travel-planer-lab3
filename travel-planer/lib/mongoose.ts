import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI!;
// //MongoDB-ийн client объект үүсгэж байна.
// const client = new MongoClient(uri);

// async function connectToDB() {
//   // client.connect()-г хэд хэдэн удаа дуудах нь аюулгүй,
//   // учир нь энэ функц холболт байгаа бол дахин холболт үүсгэхгүй.
//   await client.connect();
//   return client.db("test"); // хүссэн database нэрээ оруулж болно
// }

export default connectToDB;

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function connectToDB() {
  await client.connect();
  return client.db("test");
}

