import { resolve } from 'path';
import dotenv from 'dotenv';
import { getEnvironmentPath } from './utils';

const { env } = process;
dotenv.config({
  path: resolve(process.cwd(), `.env${getEnvironmentPath(env)}`),
});

export default {
  environment: env.NODE_ENV || 'development',
  server: {
    port: env.port || 3000,
  },
  database: {
    host: `${env.DB_HOST}` || 'localhost',
    name: `${env.DB_NAME}` || 'database',
    user: `${env.DB_USER}` || '',
    password: `${env.DB_PASS}` || '',
    engine: `${env.DB_ENGINE}` || 'psql',
    port: env.DB_PORT || (5432 as number),
  },
};
