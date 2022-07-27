import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalConfig } from 'src/configs/app.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    let authorization;
    if ((authorization = req.headers['authorization'])) {
      let basic = authorization.match(/^Basic (.+)$/);

      if (basic) {
        basic = basic[1];
        basic = Buffer.from(basic, 'base64').toString('utf8');

        if (
          basic ==
          `${GlobalConfig.basicAuthApi.username}:${GlobalConfig.basicAuthApi.password}`
        ) {
          return next();
        }
      }
    }

    throw new UnauthorizedException();
  }
}
