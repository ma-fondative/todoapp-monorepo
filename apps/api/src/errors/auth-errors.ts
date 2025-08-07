import { STATUS_CODES } from "./status-code.js";

export const authErrors = {
  token_expired: {
    statusCode: STATUS_CODES.unauthorized,
    message: 'Token expired'
  },
  missing_authorization: {
    statusCode: STATUS_CODES.unauthorized,
    message: 'Missing Authorization header'
  },
  missing_bearer_prefix: {
    statusCode: STATUS_CODES.unauthorized,
    message: 'Missing Bearer prefix'
  },
  invalid_credentials: {
    statusCode: STATUS_CODES.unauthorized,
    message: 'Invalid credentials'
  }
};
