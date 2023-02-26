import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = status === 401 ? '토큰이 만료되었습니다.' : exception.message;
    if (status !== 200) console.error(exception);

    response.status(status).json({
      result: false,
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      detailMessage: exception.response ? exception.response.message : '',
    });
  }
}
