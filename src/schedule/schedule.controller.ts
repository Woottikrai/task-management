import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create.dto';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('schedule')
  async create(@Body() createSchedule: CreateScheduleDto) {
    return await this.scheduleService.Create(createSchedule);
  }

  @Get('schedule')
  async findAll() {
    return await this.scheduleService.findSchedule();
  }

  @Get('test')
  async test() {
    return await this.scheduleService.random();
  }
}
