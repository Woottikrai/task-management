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
import { CalendarService } from './calendar.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateCalendarDto,
  UpdateCalendarDto,
} from 'src/calendar/dto/calendar.dto';
import { RolesGuard } from 'src/authentication/guard/role.guard';
import { Roles } from 'src/authentication/decorator/roles.decorator';
import { AuthGuard } from 'src/authentication/auth.guard';
import * as dayjs from 'dayjs';

@ApiTags('calendar')
@Controller('calendar')
// @UseGuards(AuthGuard, RolesGuard)
// @ApiBearerAuth()
@Roles('Project Manager')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('create')
  async create(@Body() createDto: CreateCalendarDto) {
    return await this.calendarService.createCalendar(createDto);
  }

  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
  @Get('findAll')
  async findAll() {
    return await this.calendarService.findAll();
  }
  @Roles('Backend Developer', 'Frontend Developer', 'Tester')
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
