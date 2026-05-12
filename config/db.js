import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// safer global cache for Vercel
const globalWithMongoose = global;

if (!globalWithMongoose._mongoose) {
  globalWithMongoose._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (globalWithMongoose._mongoose.conn) {
    return globalWithMongoose._mongoose.conn;
  }

  if (!globalWithMongoose._mongoose.promise) {
    globalWithMongoose._mongoose.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  globalWithMongoose._mongoose.conn =
    await globalWithMongoose._mongoose.promise;

  return globalWithMongoose._mongoose.conn;
}