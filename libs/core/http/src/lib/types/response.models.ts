export interface ResponseError {
  code: string;
  message: string;
  traceId: string;
  payload: unknown;
}
