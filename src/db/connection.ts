import { createConnection, Connection } from "typeorm";
import ormconfig from "../../ormconfig";
import config from "../config";

const {
  database: { ...rest },
} = config;
export const connection: Promise<Connection> = createConnection({synchronize: true, ...(ormconfig)});
