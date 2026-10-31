import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';
import { defineConfig as viteDefineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(
  viteDefineConfig({
    test: {
      environment: 'node',
      clearMocks: true,
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
      env: {
        ...config({ path: '.env.test' }).parsed,
      },
    },
    plugins: [tsconfigPaths()]
  }),
);
