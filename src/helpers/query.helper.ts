export class QueryHelper {
  public static insertData = (tableName: string, insertBody: object) => {
    const columnNames = Object.keys(insertBody).join(', ');
    const values = Object.values(insertBody)
      .map((dt) => {
        if (dt == null) {
          return 'NULL';
        }

        if (typeof dt == 'string') {
          return `'${dt}'`;
        }

        return dt;
      })
      .join(',');

    const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${values});`;
    return query;
  };

  public static updateData = (
    tableName: string,
    updateBody: object,
    conditions: object,
  ) => {
    if (!conditions) {
      throw `Update condition is needed!`;
    }

    const updateValues = Object.keys(updateBody)
      .map((dt) => {
        if (updateBody[dt] == null) {
          return `${dt} = NULL`;
        }

        if (typeof updateBody[dt] == 'string') {
          return `${dt} = '${updateBody[dt]}'`;
        }

        return `${dt} = ${updateBody[dt]}`;
      })
      .join(', ');

    const whereConditions = Object.keys(conditions)
      .map((dt) => {
        if (conditions[dt] == null) {
          return `${dt} IS NULL`;
        }

        if (typeof conditions[dt] == 'string') {
          if (conditions[dt][0] == '!') {
            return `${dt} != '${conditions[dt].substring(1)}' `;
          }

          return `${dt} = '${conditions[dt]}'`;
        }

        return `${dt} = ${conditions[dt]}`;
      })
      .join(' AND ');

    const query = `UPDATE ${tableName} SET ${updateValues} WHERE ${whereConditions};`;
    return query;
  };
}
