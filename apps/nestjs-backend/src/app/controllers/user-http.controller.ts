import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserRequest } from '../interfaces/user.interface';

@Controller('users')
export class UserHttpController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser({ id: parseInt(id) });
  }

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }

  @Get()
  async getUsers(
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.userService.getUsers({ 
      page: parseInt(page), 
      limit: parseInt(limit) 
    });
  }
}
