import { Injectable } from '@nestjs/common';
import { 
  User, 
  GetUserRequest, 
  GetUserResponse, 
  CreateUserRequest, 
  CreateUserResponse,
  GetUsersRequest,
  GetUsersResponse 
} from '../interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      created_at: new Date().toISOString() 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      created_at: new Date().toISOString() 
    },
  ];
  private nextId = 3;

  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const user = this.users.find(u => u.id === request.id);
    if (!user) {
      throw new Error(`User with ID ${request.id} not found`);
    }
    return user;
  }

  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    const newUser: User = {
      id: this.nextId++,
      name: request.name,
      email: request.email,
      created_at: new Date().toISOString(),
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
    const { page = 1, limit = 10 } = request;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedUsers = this.users.slice(startIndex, endIndex);
    
    return {
      users: paginatedUsers,
      total: this.users.length,
    };
  }
}
