import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Roles } from 'src/authentication/decorator/roles.decorator';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RolesGuard } from 'src/authentication/guard/role.guard';
import { filterUserSelect } from './dto/query.dto';

@ApiTags('schedule')
@Controller('schedule')
// @UseGuards(AuthGuard, RolesGuard)
// @ApiBearerAuth()
@Roles('Project Manager')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('create')
  async create(@Body() createSchedule: CreateScheduleDto) {
    return await this.scheduleService.Create(createSchedule);
  }

  @Post('random')
  async random() {
    try {
      return await this.scheduleService.random();
    } catch (error) {
      throw error;
    }
  }

  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
  @Get('findAll')
  async findAll() {
    return await this.scheduleService.findSchedule();
  }

  @Get('getOne/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.scheduleService.findOneSchedule(id);
    } catch (error) {
      throw error;
    }
  }

  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
  @Get('sumpay')
  async getSumPay() {
    return await this.scheduleService.sumPay();
  }
  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
  @Get('payoften')
  async payoften() {
    return this.scheduleService.payOften();
  }

  @Get('select')
  async selectUser(@Query() filter: filterUserSelect) {
    try {
      return await this.scheduleService.selectUser(filter);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update/:id')
  async updateSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateScheduleDto: UpdateScheduleDto,
  ) {
    console.log(UpdateScheduleDto);

    return await this.scheduleService.updateSchedule(id, UpdateScheduleDto);
  }

  @Delete('delete-task/:id')
  async deleteSchedule(@Param('id', ParseIntPipe) id: number) {
    return await this.scheduleService.deleteTask(id);
  }
}
