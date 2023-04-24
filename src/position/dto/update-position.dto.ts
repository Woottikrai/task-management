import { ApiProperty } from '@nestjs/swagger';

export class UpdatePositionDto {
  @ApiProperty()
  position?: string;
}
