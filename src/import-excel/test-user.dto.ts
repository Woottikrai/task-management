import { ApiProperty } from '@nestjs/swagger';

export class TestUserDto {
  @ApiProperty({ type: 'file' })
  file?: any;
}

export class TestUser {
  name: string;
  email: string;
}
