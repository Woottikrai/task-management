import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

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

  @Get('sumpay')
  async getSumPay() {
    return await this.scheduleService.sumPay();
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
