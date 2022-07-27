import * as dotenv from 'dotenv';

dotenv.config();

export const GlobalConfig = {
  port: process.env.PORT,
  basicAuthApi: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
  },
  postgresConn: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  secretKey: process.env.SECRET_KEY,
};
