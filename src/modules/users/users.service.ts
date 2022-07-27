import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseConfig } from 'src/configs/db.config';
import { AppHelper } from 'src/helpers/app.helper';
import { CryptoHelper } from 'src/helpers/crypto.helper';
import { DateHelper } from 'src/helpers/date.helper';
import { UsersQuery } from './users.query';

@Injectable()
export class UsersService {
  getUsers = async (data: object) =>
    new Promise(async (resolve, reject) => {
      const ctx = 'getUsers';
      const logger = new Logger();
      try {
        data['page'] = data['page'] || 1;
        data['limit'] = data['limit'] || 10;
        data['sort'] = data['sort'] || 'desc';

        const [getUsers, getCount] = await Promise.all([
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getUsers(data)),
          ),
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getCountUsers(data)),
          ),
        ]);

        if (getUsers.error) throw getUsers.error;
        if (getUsers.length <= 0)
          return resolve({
            data: [],
            pagination: {
              page: Number(data['page']),
              limit: Number(data['limit']),
              totalDataOnThisPage: 0,
              total: 0,
              totalPage: 1,
            },
          });

        if (data['secure'] == 'false' && data['secure'] != undefined)
          getUsers.map(
            (dt) => (dt['password'] = CryptoHelper.decrypt(dt['password'])),
          );

        const pagination = {
          page: Number(data['page']),
          limit: Number(data['limit']),
          totalDataOnThisPage: getUsers.length,
          total: getCount[0].count,
          totalPage: Math.ceil(getCount[0].count / Number(data['limit'])),
        };

        return resolve({ data: getUsers, pagination });
      } catch (err) {
        const error = err.message || err
        logger.error(ctx, error);
        return reject(error);
      }
    });

  getUser = async (data: object) =>
    new Promise(async (resolve, reject) => {
      const ctx = 'getUsers';
      const logger = new Logger();
      try {
        const result = await AppHelper.PromiseAsyncHelper(
          DatabaseConfig.getQueryToMariaDb(UsersQuery.detailUser(data)),
        );

        if (result.error) throw result.error;

        if (data['secure'] == 'false' && data['secure'] != undefined)
          result.map(
            (dt) => (dt['password'] = CryptoHelper.decrypt(dt['password'])),
          );

        return resolve({ data: result });
      } catch (err) {
        logger.error(ctx, err.message);
        return reject(err.message);
      }
    });

  insertUser = async (data: object) =>
    new Promise(async (resolve, reject) => {
      const ctx = 'insertUser';
      const logger = new Logger();
      try {
        const now = DateHelper.formatDateTimeCommon(new Date());

        data['updated_by'] = data['username'];
        data['created_at'] = now;
        data['updated_at'] = now;

        const result = await AppHelper.PromiseAsyncHelper(
          DatabaseConfig.QueryToMariaDb(UsersQuery.insertUser(data)),
        );

        if (result.error) throw result.error;

        return resolve(result);
      } catch (err) {
        const error = err.message || err
        logger.error(ctx, error);
        return reject(error);
      }
    });

  insertPasswordUser = async (data: object) =>
    new Promise(async (resolve, reject) => {
      const ctx = 'insertPasswordUser';
      const logger = new Logger();
      try {
        const [getUser, getPassword] = await Promise.all([
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getUser(data)),
          ),
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getPassword(data)),
          ),
        ]);

        if (getUser.error || getUser.length <= 0)
          throw new NotFoundException('User not found');
        if (getPassword.length > 0)
          throw new BadRequestException('User has Added Password');

        const now = DateHelper.formatDateTimeCommon(new Date());

        data['password'] = CryptoHelper.encrypt(data['password']);
        data['created_at'] = now;
        data['updated_at'] = now;

        const result = await AppHelper.PromiseAsyncHelper(
          DatabaseConfig.QueryToMariaDb(UsersQuery.insertPasswordUser(data)),
        );

        if (result.error) throw result.error;

        return resolve(result);
      } catch (err) {
        const error = err.message || err
        logger.error(ctx, error);
        return reject(error);
      }
    });

  UpdatePasswordUser = async (data: object) =>
    new Promise(async (resolve, reject) => {
      const ctx = 'updatePasswordUser';
      const logger = new Logger();
      try {
        const [getUser, getPassword] = await Promise.all([
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getUser(data)),
          ),
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getPassword(data)),
          ),
        ]);

        if (getUser.error || getUser.length <= 0)
          throw new NotFoundException('User not found');
        if (getPassword.error || getPassword.length <= 0)
          throw new NotFoundException('User Did not Add Password');

        const now = DateHelper.formatDateTimeCommon(new Date());
        data['password'] = CryptoHelper.encrypt(data['password']);
        data['updated_at'] = now;
        const result = await AppHelper.PromiseAsyncHelper(
          DatabaseConfig.QueryToMariaDb(UsersQuery.updatePasswordUser(data)),
        );
        if (result.error) throw result.error;
        return resolve(result);
      } catch (err) {
        const error = err.message || err
        logger.error(ctx, error);
        return reject(error);
      }
    });

  deletePasswordUser = async (data: object) =>
    new Promise(async (resolve, reject) => {
      const ctx = 'deletePasswordUser';
      const logger = new Logger();
      try {
        const [getUser, getPassword] = await Promise.all([
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getUser(data)),
          ),
          AppHelper.PromiseAsyncHelper(
            DatabaseConfig.getQueryToMariaDb(UsersQuery.getPassword(data)),
          ),
        ]);

        if (getUser.error || getUser.length <= 0)
          throw new NotFoundException('User not found');
        if (getPassword.error || getPassword.length <= 0)
          throw new NotFoundException('User Did not Add Password');

        const now = DateHelper.formatDateTimeCommon(new Date());
        data['is_deleted'] = true;
        data['updated_at'] = now;
        const result = await AppHelper.PromiseAsyncHelper(
          DatabaseConfig.QueryToMariaDb(UsersQuery.updatePasswordUser(data)),
        );
        if (result.error) throw result.error;
        return resolve(result);
      } catch (err) {
        const error = err.message || err
        logger.error(ctx, error);
        return reject(error);
      }
    });
}
