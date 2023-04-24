import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
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
      const { user, calendar, date, ...other } = body;
      const findUser = await this.userService.findUserOne(user);
      const Calendar = await this.calendarService.findOne(calendar);
      const finddate = await this.calendarService.findDate(date);

      await this.scheduleRepository.save({
        calendar: Calendar,
        user: findUser,
        ...other,
      });
    } catch (error) {
      throw error;
    }
  }

  async findSchedule() {
    try {
      const findSchedule = await this.scheduleRepository.find({
        relations: ['user', 'user.schedule', 'calendar', 'calendar.schedule'],
      });
      return findSchedule;
    } catch (error) {
      throw error;
    }
  }

  // async random() {
  //   try {
  //     let arr = [];
  //     const users = await this.userService.findUserAll();
  //     const length = users.length;
  //     for (const u of users) {
  //       console.log(u);
  //     }
  //     console.log(length);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // const findCalendar = await getConnection()
  //   .getRepository(Calendar)
  //   .findOne({ where: { id: body?.calendar } });

  // const findUser = await getConnection()
  //   .getRepository(User)
  //   .findOne({ where: { id: body?.user } });
}
