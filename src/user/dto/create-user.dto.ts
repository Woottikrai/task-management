import { Query } from '@nestjs/common';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  tel: string;

  @ApiProperty()
  @IsIn([Role.Admin, Role.User])
  position: string;

  @ApiQuery({ name: 'position', enum: Role })
  async filterByRole(@Query('position') position: Role = Role.User) {}
}
