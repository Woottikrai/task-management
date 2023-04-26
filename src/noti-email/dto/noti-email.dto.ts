import { ApiProperty } from '@nestjs/swagger';

export class NotiEmailDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  date: string;
}
