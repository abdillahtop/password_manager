import moment = require('moment');

export abstract class DateHelper {
  public static formatDateTime(date, format): string {
    if (!date) return null as any;
    const d = moment(date);
    return d.isValid() ? d.format(format) : (null as any);
  }

  public static formatDateCommon(date): string {
    return this.formatDateTime(date, 'YYYY-MM-DD');
  }

  public static formatDateTimeCommon(date): string {
    return this.formatDateTime(date, 'YYYY-MM-DD HH:mm:ss');
  }
}
