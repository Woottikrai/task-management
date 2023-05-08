import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find, scheduled } from 'rxjs';
import {
  CreateCalendarDto,
  UpdateCalendarDto,
} from 'src/calendar/dto/calendar.dto';
// import { CreateCalendarDto } from 'src/dto/calendar.dto';
import { Calendar } from 'src/entities/calendar.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as dayjs from 'dayjs';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
    private userService: UserService,
  ) {}

  //create onedate
  async createCalendar(body: CreateCalendarDto) {
    try {
      const findCalendar = await this.calendarRepository
        .createQueryBuilder('calendar')
        .where('calendar.date =:date', { date: body.date })
        .getOne();
      if (!findCalendar) {
        await this.calendarRepository.save({
          date: dayjs(body.date).format('YYYY-MM-DD'),
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async findDate(date: string) {
    try {
      const find = this.calendarRepository
        .createQueryBuilder('calendar')
        .where('calendar.date =:date ', { date: date })
        .getOne();
      console.log(find);
      return await find;
    } catch (error) {
      throw error;
    }
  }

  async findCalendarOne(id: number) {
    try {
      const findOne = await this.calendarRepository.findOneBy({ id: id });
      return findOne;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const findCalendarAll = await this.calendarRepository.find({
        relations: ['schedule', 'schedule.calendar'],
      });
      return findCalendarAll;
    } catch (error) {
      throw error;
    }
  }

  async findCalendarMohth() {
    try {
      const findCalendarMohth = this.calendarRepository
        .createQueryBuilder('calendar')
        .leftJoinAndSelect('calendar.schedule', 'calendar')
        .select('calendar')
        .where('calendar.date Between :startDate and :endDate', {
          startDate: dayjs().startOf('month').toISOString(),
          endDate: dayjs().endOf('month').toISOString(),
        });
      return findCalendarMohth;
    } catch (error) {
      throw error;
    }
  }

  async updateCalendar(id: number, body: UpdateCalendarDto) {
    try {
      const updaterCalendar = await this.calendarRepository.update(id, body);
      return updaterCalendar;
    } catch (error) {
      throw error;
    }
  }

  async getid() {
    try {
      const cid = await this.calendarRepository
        .createQueryBuilder('calendar')
        .select('calendar.id', 'calendar.id')
        .where('calendar.date =:date', { date: 'date' })
        .getOne();
      return cid;
    } catch (error) {
      throw error;
    }
  }

  async findChdek() {
    try {
      const calendar = await this.calendarRepository
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.calendar', 'calendar')
        .where('schedule.date Between :startDate and :endDate', {
          startDate: dayjs().startOf('week').toISOString(),
          endDate: dayjs().endOf('week').toISOString(),
        })
        .getOne();
      return calendar;
    } catch (error) {
      throw error;
    }
  }

  async findThatWk() {
    try {
      const findThatWk = await this.calendarRepository
        .createQueryBuilder('calendar')
        .select('calendar')
        .where('calendar.createAt Between :startDate and :endDate', {
          startDate: dayjs().startOf('week').toISOString(),
          endDate: dayjs().endOf('week').toISOString(),
        })
        .getMany();
      return findThatWk;
    } catch (error) {
      throw error;
    }
  }

  async deleteCalendar(id: number) {
    try {
      const calendar = await this.calendarRepository.softDelete(id);
      return calendar;
    } catch (error) {
      throw error;
    }
  }

  // generate date--------------------------------------------------------------------------------
  // @Cron(CronExpression.EVERY_WEEK)
  // @Timeout(100) //test
  // async createDates() {
  //   try {
  //     const findThatWk = await this.calendarRepository
  //       .createQueryBuilder('calendar')
  //       .select('calendar')
  //       .where('calendar.createAt Between :startDate and :endDate', {
  //         startDate: dayjs().startOf('week').toISOString(),
  //         endDate: dayjs().endOf('week').toISOString(),
  //       })
  //       .getOne();
  //     if (!findThatWk) {
  //       let isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
  //       dayjs.extend(isSameOrBefore);
  //       const startDate = dayjs().startOf('week').add(1, 'day'); // Monday of current week
  //       const endDate = dayjs().startOf('week').add(5, 'day'); // Friday of current week '2023-04-17'
  //       const daysOfWeek = [];

  //       for (
  //         let date = startDate;
  //         date.isSameOrBefore(endDate);
  //         date = date.add(1, 'day')
  //       ) {
  //         daysOfWeek.push({
  //           date: date.format('YYYY-MM-DD'),
  //         });
  //       }

  //       for (let d of daysOfWeek) {
  //         await this.calendarRepository.save({
  //           ...this.calendarRepository,
  //           date: dayjs(d.date).format('YYYY-MM-DD'),
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // ---------------------------------------------------------------------------------------
}
