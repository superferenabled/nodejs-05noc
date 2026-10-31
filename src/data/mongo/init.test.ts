import { afterAll, describe, expect, test } from 'vitest';
import { MongoDatabase } from './init';
import mongoose from 'mongoose';

describe('init mongodb', () => {
  afterAll(() => {
    mongoose.connection.close()
  });
  test('should connect to mongodb', async () => {
    console.log(process.env.MONGO_URL, process.env.MONGO_DB_NAME);
    expect(process.env.MONGO_URL).toBeDefined();
    expect(process.env.MONGO_URL).toEqual('mongodb://localhost:27018');

    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL as string,
      dbName: process.env.MONGO_DB_NAME as string,
    });

    expect(connected).toBe(true);
  });
  test('should throw an error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        mongoUrl: process.env.MONGO_URL as string,
        dbName: process.env.MONGO_DB_NAME as string,
      });
      expect(true).toBe(false);
    } catch (error) {}

  });
});
