import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryUser {
  @ApiProperty()
  @IsOptional()
  name: string;
}

export class QueryByPosition {
  @ApiProperty()
  @IsOptional()
  position: number;
}
