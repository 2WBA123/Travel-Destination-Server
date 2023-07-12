import 'reflect-metadata';
import { Connection, createConnection, getConnection } from 'typeorm';
// tslint:disable-next-line:no-submodule-imports
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import ormconfig from '../../../ormconfig';
import config from '../../config';
// Those first two require are very important - without them the typescript migrations did not work for me.
// See https://github.com/facebook/jest/issues/10178

// tslint:disable-next-line:no-var-requires no-submodule-imports
require('ts-node/register');
// tslint:disable-next-line:no-var-requires no-submodule-imports
require('tsconfig-paths/register');

/*
 * This file is executed by Jest before running any tests.
 * We drop the database and re-create it from migrations every time.
 */
export default async () => {
  // Force dropping the schema so that test run clean every time.
  // Note that we are not cleaning *between* tests.
  const testOrmConfig: PostgresConnectionOptions = {
    ...(config.database as unknown as PostgresConnectionOptions),
    dropSchema: true,
  };

  const t0 = Date.now();
  const connection = await createConnection(testOrmConfig);
  const connectTime = Date.now();
  await connection.runMigrations();
  const migrationTime = Date.now();
  console.log(
    ` 👩‍🔬 Connected in ${connectTime - t0}ms - Executed migrations in ${migrationTime - connectTime
    }ms.`
  );
};

export class TestConnection {
  static instance: TestConnection = null;
  
  connection: Connection;
  constructor() {
    if (!TestConnection.instance) {
      TestConnection.instance = this;
    }
    return TestConnection.instance;
  }

  async create() {
    await createConnection({
      synchronize: true,
      dropSchema: true,
      ...ormconfig,
    });
  }

  async close() {
    await getConnection().close();
  }

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

     entities.map(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  }
}
