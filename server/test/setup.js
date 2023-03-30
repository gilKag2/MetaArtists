import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo;
console.log("here");

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoose.connect(mongoUri);
  console.log('connection established');
});

beforeEach(async () => {
  // jest.clearAllMocks();
  if (mongoose.connection?.db?.collections) {

    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
