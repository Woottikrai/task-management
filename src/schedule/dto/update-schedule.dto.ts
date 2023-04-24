import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { DoPay } from './create-schedule.dto';
export class UpdateScheduleDto {
  @ApiProperty()
  calendar: number;

  @ApiProperty()
  user: number;

  @ApiProperty()
  @IsIn([DoPay.Do, DoPay.Pay])
  do_pay: string;

  @ApiProperty()
  how_much: number;
}
