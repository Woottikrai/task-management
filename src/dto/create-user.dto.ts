import { ApiProperty } from '@nestjs/swagger';

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
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}
