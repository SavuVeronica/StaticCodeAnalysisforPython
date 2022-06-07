import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { UserPasswordDto } from 'src/dtos/user-password.dto';
import { UserDto } from 'src/dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  async checkLogin(@Body() user: UserLoginDto) {
    return this.userService.loginUser(user);
  }

  @Post('signup')
  async signUpUser(@Body() user: UserLoginDto) {
    return this.userService.signUpUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<UserDto> {
    return this.userService.find(Number(id));
  }

  @Post()
  async create(@Body() user: UserDto) {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Body() user: UserPasswordDto, @Param('id') id) {
    return this.userService.update(Number(id), user);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return this.userService.delete(Number(id));
  }
}
