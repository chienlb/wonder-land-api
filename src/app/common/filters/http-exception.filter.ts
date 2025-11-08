import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { error } from '../response/api-response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Lỗi máy chủ nội bộ';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        const responseMessage = (res as Record<string, unknown>).message;
        message =
          typeof responseMessage === 'string' ? responseMessage : message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Ghi log chi tiết cho dev
    this.logger.error(
      `${message}`,
      (exception as Error)?.stack ?? 'no stack trace',
    );

    response.status(status).json(
      error(message, status, {
        timestamp: new Date().toISOString(),
      }),
    );
  }
}
