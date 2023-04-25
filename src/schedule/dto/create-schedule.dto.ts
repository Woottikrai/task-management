import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export enum Status {
  Pay = 'Pay',
  Do = 'Do',
}

export class CreateScheduleDto {
  @ApiProperty()
  calendar: number;

  @ApiProperty()
  user: number;

  @ApiProperty()
  @IsIn([Status.Do, Status.Pay])
  dopay: string;

  @ApiProperty()
  howmuch: number;
}
