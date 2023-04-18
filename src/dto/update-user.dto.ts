import { ApiProperty } from '@nestjs/swagger';

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
  position?: string;
}
