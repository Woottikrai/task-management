import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export enum Status {
  Pay = 'Pay',
  Do = 'Do',
}

export class CreateScheduleDto {
  @ApiProperty()
  calendar: string;

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  user: number[];

  @ApiProperty()
  @IsIn([Status.Do, Status.Pay])
  dopay: string;

  @ApiProperty()
  howmuch: number;
}
