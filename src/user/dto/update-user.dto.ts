import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  img?: string;

  @ApiProperty()
  tel?: string;

  @ApiProperty()
  position?: number;
}

export class UpdatePasswordDto {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  password: string;
}
