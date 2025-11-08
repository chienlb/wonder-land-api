export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, any>;
  statusCode: number;
}

export function ok<T>(
  data: T,
  message = 'Thành công',
  statusCode = 200,
  meta?: Record<string, any>,
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    meta,
    statusCode,
  };
}

export function error(
  message = 'Lỗi không xác định',
  statusCode = 500,
  meta?: Record<string, any>,
): ApiResponse<null> {
  return {
    success: false,
    message,
    statusCode,
    meta,
  };
}
