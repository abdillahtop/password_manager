import { QueryHelper } from 'src/helpers/query.helper';

export class UsersQuery {
  public static insertUser = (data: object) => {
    const query = QueryHelper.insertData('users', data);
    return query;
  };

  public static insertPasswordUser = (data: object) => {
    const query = QueryHelper.insertData('password_users', data);
    return query;
  };

  public static updatePasswordUser = (data: object) => {
    const query = QueryHelper.updateData('password_users', data, {
      username: data['username'],
      is_deleted: false,
    });
    return query;
  };

  public static queryGetUsers = (data: object) => {
    let query = `select u.*,pu.password, pu.updated_at as updated_password_at from users u 
        left join password_users pu ON pu.username = u.username AND pu.is_deleted=false`;
    if (data['search']) query += ` WHERE u.username like '${data['search']}%'`;

    return query;
  };

  public static getUsers = (data: object) => {
    let query: string = this.queryGetUsers(data);
    const offset = (data['page'] - 1) * data['limit'];
    query += ` ORDER BY username ${data['sort']} LIMIT ${data['limit']} OFFSET ${offset}`;
    return query;
  };

  public static getCountUsers = (data: object) => {
    const query: string = this.queryGetUsers(data);
    const queryCount = `SELECT COUNT(1) as count FROM (${query}) as count`;
    return queryCount;
  };

  public static detailUser = (data: object) => {
    let query = `select u.*,pu.password, pu.updated_at as updated_password_at from users u 
        left join password_users pu ON pu.username = u.username AND pu.is_deleted=false `;
    if (data['username']) query += `where u.username='${data['username']}' `;

    return query;
  };

  public static getUser = (data: object) => {
    const query = `select * from users WHERE username ='${data['username']}'`;
    return query;
  };

  public static getPassword = (data: object) => {
    const query = `select * from password_users WHERE is_deleted=false and username='${data['username']}'`;
    return query;
  };
}
