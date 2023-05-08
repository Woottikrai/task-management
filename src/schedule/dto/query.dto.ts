import { Query } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { query } from 'express';

export class PayOften {}

export class filterUserSelect {
  @ApiProperty()
  @IsOptional()
  date: string;
}
