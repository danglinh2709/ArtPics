export class ApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
