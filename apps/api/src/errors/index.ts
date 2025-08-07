import { STATUS_CODES } from './status-code.js';
import { authErrors } from './auth-errors.js';
import { userErrors } from './user-errors.js';

const errors = {
  ...authErrors,
  ...userErrors,
  invalid_request_data: {
    statusCode: STATUS_CODES.bad_request,
    message: 'Invalid request data'
  },
  not_found: {
    statusCode: STATUS_CODES.not_found,
    message: 'Not found'
  },
  internal_error: {
    statusCode: STATUS_CODES.internal_error,
    message: 'Internal error'
  }
};

export class AppError extends Error {
  public statusCode;

  constructor(
    public code: keyof typeof errors,
    public context = {},
    err?: Error
  ) {
    const error = errors[code];
    super(error.message, { cause: err });
    this.statusCode = error.statusCode;
  }

  toJson() {
    return { code: this.code, message: this.message };
  }
}
