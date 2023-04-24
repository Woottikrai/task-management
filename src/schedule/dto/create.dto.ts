import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export enum DoPay {
  Pay = 'Pay',
  Do = 'Do',
}

export class CreateScheduleDto {
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
