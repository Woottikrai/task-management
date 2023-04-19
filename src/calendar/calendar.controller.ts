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
import { CreateCalendarDto, UpdateCalendarDto } from 'src/dto/calendar.dto';

@ApiTags('calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('calendar')
  create(@Body() createDto: CreateCalendarDto) {
    return this.calendarService.createCalendar(createDto);
  }

  @Get('calendar')
  findAll() {
    return this.calendarService.findAll();
  }

  @Get('calendar:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.calendarService.findOne(id);
  }

  @Patch('user:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateCalendarDto: UpdateCalendarDto,
  ) {
    return this.calendarService.updateCalendar(id, UpdateCalendarDto);
  }
}
