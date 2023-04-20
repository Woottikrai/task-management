import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty()
  calendar: number;

  @ApiProperty()
  user: number;
}
