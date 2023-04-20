import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCalendarDto,
  UpdateCalendarDto,
} from 'src/calendar/dto/calendar.dto';

@ApiTags('calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('calendar')
  async create(@Body() createDto: CreateCalendarDto) {
    return await this.calendarService.createCalendar(createDto);
  }

  @Get('calendar')
  async findAll() {
    return await this.calendarService.findAll();
  }

  @Get('calendar:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.calendarService.findOne(id);
  }

  @Patch('user:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateCalendarDto: UpdateCalendarDto,
  ) {
    return await this.calendarService.updateCalendar(id, UpdateCalendarDto);
  }
}
