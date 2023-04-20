import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { Repository, getConnection } from 'typeorm';
import { CreateScheduleDto } from './dto/create.dto';
import { Calendar } from 'src/entities/calendar.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CalendarService } from 'src/calendar/calendar.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private userService: UserService,
    private calendarService: CalendarService,
  ) {}

  async Create(body: CreateScheduleDto) {
    try {
      const { user, calendar } = body;
      const findUser = await this.userService.findUserOne(user);
      const findCalendar = await this.calendarService.findOne(calendar);

      // const findCalendar = await getConnection()
      //   .getRepository(Calendar)
      //   .findOne({ where: { id: body?.calendar } });

      // const findUser = await getConnection()
      //   .getRepository(User)
      //   .findOne({ where: { id: body?.user } });

      await this.scheduleRepository.save({
        calendar: findCalendar,
        user: findUser,
      });
    } catch (error) {
      throw error;
    }
  }
}
