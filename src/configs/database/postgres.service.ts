import { Pool } from 'pg';
import { GlobalConfig } from '../app.config';

export class PostgresService {
  public static getConnectionPool = async () => {
    const pool = new Pool(GlobalConfig.postgresConn);
    return pool;
  };
}
