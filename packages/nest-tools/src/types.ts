export interface ErrorCode {
  NotFound: number;
  Forbidden: number;
  Unauthorized: number;
  Unprocessable: number;
  NotImplemented: number;
  BadGateway: number;
  InternalServerError: number;
}

export interface HttpCode {
  400: number;
  401: number;
  403: number;
  404: number;
  422: number;
  500: number;
  501: number;
  502: number;
  503: number;
}
