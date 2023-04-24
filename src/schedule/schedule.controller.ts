import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('create')
  async create(@Body() createSchedule: CreateScheduleDto) {
    return await this.scheduleService.Create(createSchedule);
  }

  @Get('findAll')
  async findAll() {
    return await this.scheduleService.findSchedule();
  }

  @Get('test')
  async test() {
    return await this.scheduleService.random();
  }
}
