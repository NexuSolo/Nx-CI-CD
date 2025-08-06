export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface GetUserRequest {
  id: number;
}

export interface GetUserResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface GetUsersRequest {
  page: number;
  limit: number;
}

export interface GetUsersResponse {
  users: GetUserResponse[];
  total: number;
}
