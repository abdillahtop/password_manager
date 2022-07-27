import { Controller, Get, HttpCode } from '@nestjs/common';
import { DateHelper } from 'src/helpers/date.helper';

@Controller('')
export class HealthController {
  @Get()
  @HttpCode(200)
  checkHealth(): any {
    return {
      message: 'Health OK, start for testing!',
      status: 'OK',
      time: DateHelper.formatDateTimeCommon(new Date()),
    };
  }
}
