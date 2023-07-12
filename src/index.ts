
import 'reflect-metadata';
import { connection } from './db/connection';
import { app } from './server';
import http from 'http';


(async () => {
  await connection;
  const httpServer = http.createServer(app);
  
  httpServer.listen(process.env.PORT, () => {
    console.info(`Server started on port: ${process.env.PORT}`);
  });
})();
