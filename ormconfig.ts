import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import config from "./src/config";
export default {
  name: 'default',
  type: config.database.engine,
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: ["src/**/*.entity{.ts,.js}"],
  
} as PostgresConnectionOptions;
