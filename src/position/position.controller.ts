import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RolesGuard } from 'src/authentication/guard/role.guard';
import { Roles } from 'src/authentication/decorator/roles.decorator';

@ApiTags('Position')
@Controller('position')
// @UseGuards(AuthGuard, RolesGuard)
// @ApiBearerAuth()
@Roles('Project Manager')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('create')
  async createPosition(@Body() body: CreatePositionDto) {
    return await this.positionService.createPosition(body);
  }
  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
  @Get('findAll')
  async findAllPosition() {
    return await this.positionService.findAllPosition();
  }
  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
  @Get('findOne:id')
  async findOnePosition(@Param('id', ParseIntPipe) id: number) {
    return await this.positionService.findOnePosition(id);
  }
  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
  @Patch('update:id')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePositionDto,
  ) {
    return await this.positionService.updatePosition(id, body);
  }

  @Delete('remove:id')
  async removePosition(@Param('id', ParseIntPipe) id: number) {
    return await this.positionService.removePosition(id);
  }
}
