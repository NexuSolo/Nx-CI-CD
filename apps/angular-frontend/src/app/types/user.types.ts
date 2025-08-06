export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}
