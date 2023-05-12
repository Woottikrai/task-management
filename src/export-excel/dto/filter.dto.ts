import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CommonFilter } from 'src/shared/common-filter';

export class FilterQueryUserExportExcel extends CommonFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  position: number;
}
