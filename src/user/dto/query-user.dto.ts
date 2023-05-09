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

export class FilterQueryUser {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  position: number;
}
