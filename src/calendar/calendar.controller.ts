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

  @Post('create')
  async create(@Body() createDto: CreateCalendarDto) {
    return await this.calendarService.createCalendar(createDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.calendarService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.calendarService.findCalendarOne(id);
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateCalendarDto: UpdateCalendarDto,
  ) {
    return await this.calendarService.updateCalendar(id, UpdateCalendarDto);
  }

  @Delete('delete/:id')
  async deleteCalendar(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.calendarService.deleteCalendar(id);
    } catch (error) {
      throw error;
    }
  }
}
