import { Query } from '@nestjs/common';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

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

  @ApiProperty({ enum: ['Admin', 'User'] })
  position: Role;

  @ApiQuery({ name: 'position', enum: Role })
  async filterByRole(@Query('position') position: Role = Role.User) {}
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}
