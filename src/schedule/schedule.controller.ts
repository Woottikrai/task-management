import { Body, Controller, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create.dto';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('schedule')
  create(@Body() createSchedule: CreateScheduleDto) {
    return this.scheduleService.Create(createSchedule);
  }
}
