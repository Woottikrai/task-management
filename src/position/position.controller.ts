import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@ApiTags('Position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('create')
  async createPosition(@Body() body: CreatePositionDto) {
    return await this.positionService.createPosition(body);
  }

  @Get('findAll')
  async findAllPosition() {
    return await this.positionService.findAllPosition();
  }

  @Get('findOne:id')
  async findOnePosition(@Param('id', ParseIntPipe) id: number) {
    return await this.positionService.findOnePosition(id);
  }

  @Post('update:id')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePositionDto,
  ) {
    return await this.positionService.updatePosition(id, body);
  }

  @Get('remove:id')
  async removePosition(@Param('id', ParseIntPipe) id: number) {
    return await this.positionService.removePosition(id);
  }
}
