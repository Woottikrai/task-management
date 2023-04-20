import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('user')
  async findUserAll() {
    return await this.userService.findUserAll();
  }

  @Get('user:id')
  async findUserOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUserOne(id);
  }

  @Patch('user:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUser);
  }

  @Delete('user:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.removeUser(id);
  }
}
