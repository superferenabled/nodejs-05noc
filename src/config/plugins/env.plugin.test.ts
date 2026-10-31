import { describe, expect, test, vi } from 'vitest';
import { envs } from './env.plugin';

describe('env.plugin', () => {
  test('should load environment variables', () => {
    console.log(envs);
    expect(envs).toBeDefined();
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'superferenabled@gmail.com',
      MAILER_SECRET_KEY: 'hgtkwkcfpyxygija',
      PROD: true,
      MONGO_URL: 'mongodb://localhost:27018',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'fernando',
      MONGO_PASS: '123456789',
      POSTGRES_URL: 'postgresql://postgres:123456@localhost:5432/noc',
      POSTGRES_USER: 'postgres',
      POSTGRES_DB: 'noc-test',
      POSTGRES_PASSWORD: '123456789',
    });
  });
  test('should return error if not found env', async () => {
    vi.resetModules();
    process.env.PORT = 'abc';
    try {
      await import('./env.plugin');
      expect(true).toBe(false);
    } catch (e) {
      expect(`${e}`).toContain('"PORT" should be a valid integer');
    }
  });
});
