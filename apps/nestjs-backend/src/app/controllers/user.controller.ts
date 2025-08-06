import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { 
  GetUserRequest, 
  GetUserResponse, 
  CreateUserRequest, 
  CreateUserResponse,
  GetUsersRequest,
  GetUsersResponse 
} from '../interfaces/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    return this.userService.getUser(request);
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.createUser(request);
  }

  @GrpcMethod('UserService', 'GetUsers')
  async getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
    return this.userService.getUsers(request);
  }
}
