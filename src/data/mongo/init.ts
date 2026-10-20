import mongoose from 'mongoose';
import { envs } from '../../config/plugins/env.plugin';

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { dbName, mongoUrl } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
        user: envs.MONGO_USER,
        pass: envs.MONGO_PASS,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('mongo connection error');
      throw error;
    }
  }
}
