import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryUser {
  @ApiProperty()
  @IsOptional()
  name: string;
}
