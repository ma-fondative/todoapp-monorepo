import { apiClient } from '@/lib/api-client';
import type { LoginReqBody, LoginResponse } from '@todoapp/api/types/auth';
import type { UserResponse } from '@todoapp/api/types/users';

export function login(data: LoginReqBody) {
  return apiClient.post<unknown, LoginResponse>('/login', data);
}

export function me() {
  return apiClient.get<unknown, UserResponse>('/me');
}
