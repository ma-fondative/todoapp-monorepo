import { STATUS_CODES } from "./status-code.js";

export const userErrors = {
  user_already_exists: {
    statusCode: STATUS_CODES.bad_request,
    message: 'User already exists'
  }
};
