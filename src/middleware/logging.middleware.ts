import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  use(req: Request, res: Response, next: NextFunction): any {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    // API가 만료될 때 이벤트 실행
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `[${method}]${originalUrl}:${statusCode} - ${responseTime}ms`,
      );
    });
    next();
  }
}
