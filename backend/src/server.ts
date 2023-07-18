import express from 'express';
import { apiRouter } from './router';
import cors from 'cors'

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


const useMiddlewares = (server: express.Application) => {
  server.use(cors(options));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
};

const createServer = () => {
  const server = express();
  useMiddlewares(server);
  server.use('/', apiRouter);
  return server;
};

export const app = createServer();
