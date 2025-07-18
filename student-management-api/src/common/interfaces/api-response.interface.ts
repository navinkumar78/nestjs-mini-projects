export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
  path: string;
  method: string;
  statusCode: number;
  executionTime?: number;
}
