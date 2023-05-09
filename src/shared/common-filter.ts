import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Max, IsOptional } from 'class-validator';

export class CommonFilter {
  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @Max(100)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit: number = 10;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @Transform(({ value }) => String(value).toLocaleLowerCase() === 'true')
  pagination: boolean = true;

  getOffset(value: CommonFilter): number {
    return (value.page - 1) * value.limit;
  }

  getPageCount(limit: number, total: number) {
    return Math.ceil(total / limit);
  }
}
