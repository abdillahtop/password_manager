import { PostgresService } from './database/postgres.service';

export abstract class DatabaseConfig {
  public static QueryToMariaDb = async (inputQuery: any) =>
    new Promise(async (resolve, reject) => {
      const connection = await PostgresService.getConnectionPool();

      let client;

      try {
        client = await connection.connect();
        if (Array.isArray(inputQuery)) {
          for (const iq of inputQuery) {
            await client.query(iq);
          }
        } else {
          await client.query(inputQuery);
        }

        return resolve('OK');
      } catch (error) {
        return reject(error.message);
      } finally {
        if (client) await client.release();
      }
    });

  public static getQueryToMariaDb = (inputQuery: any) =>
    new Promise(async (resolve, reject) => {
      const connection = await PostgresService.getConnectionPool();

      let client;

      try {
        client = await connection.connect();
        const resultQuery = await client.query(inputQuery);

        return resolve(resultQuery.rows);
      } catch (error) {
        return reject(error.message);
      } finally {
        if (client) await client.release();
      }
    });
}
