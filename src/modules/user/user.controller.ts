import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(
    @Param('id') id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
