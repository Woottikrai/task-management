import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { Status } from './create-schedule.dto';
export class UpdateScheduleDto {
  @ApiProperty()
  calendar: string;

  @ApiProperty()
  user: number;

  @ApiProperty()
  @IsIn([Status.Do, Status.Pay])
  doPay: string;

  @ApiProperty()
  howMuch: number;
}
