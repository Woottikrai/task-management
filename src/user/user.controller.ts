import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { QueryByPosition, QueryUser } from './dto/query-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async findUserAll() {
    return await this.userService.findUserAll();
  }

  @Get('search')
  async query(@Query() body: QueryUser) {
    return await this.userService.queryUser(body);
  }

  @Get('query-by-position')
  async queryByPosition(@Query() filter: QueryByPosition) {
    try {
      const [data, count] = await this.userService.queryByPosition(filter);
      return {
        data: data,
        count: count,
      };
    } catch (error) {
      throw error;
    }
  }

  // @Get(':id')
  // async findUserOne(@Param('id', ParseIntPipe) id: number) {
  //   return await this.userService.findUserOne(id);
  // }

  @Patch('update:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUser);
  }

  @Delete('remove:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.removeUser(id);
  }
}
