import { ApiProperty } from '@nestjs/swagger';
import { Role } from './create-user.dto';
import { IsIn } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  img?: string;

  @ApiProperty()
  tel?: string;

  @ApiProperty()
  position?: number;
}
