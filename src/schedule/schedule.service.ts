import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UserService } from 'src/user/user.service';
import { CalendarService } from 'src/calendar/calendar.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { NotiEmailService } from 'src/noti-email/noti-email.service';
import * as dayjs from 'dayjs';
import { filterUserSelect } from './dto/query.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private calendarService: CalendarService,
    private notiService: NotiEmailService,
  ) {}

  async Create(body: CreateScheduleDto) {
    try {
      const { user, calendar, dopay, howmuch } = body;
      await this.calendarService.createCalendar({
        date: calendar,
      });
      const findCalendar = await this.calendarService.findDate(calendar);

      for (const u of user) {
        const findUser = await this.userService.findUserOne(u);
        const findcheck = await this.scheduleRepository.findOne({
          where: { user: findUser, calendar: findCalendar },
        });
        console.log(findcheck);
        if (!findcheck) {
          await this.scheduleRepository.save({
            calendar: findCalendar,
            user: findUser,
            dopay: dopay,
            howmuch: howmuch,
          });
        }
      }
      // await this.notiService.sendMail(findUser?.email, Calendar?.date);
      // this.eventGateWay.emit('on-create', body.user);
    } catch (error) {
      throw error;
    }
  }

  async selectUser(filter: filterUserSelect) {
    try {
      const { date } = filter;
      const findCalendar = await this.calendarService.findDate(date);

      const selectUser = await this.scheduleRepository
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.user', 'su')
        .leftJoinAndSelect('schedule.calendar', 'sc')
        .where('sc.id = :id', { id: findCalendar.id })
        .getMany();

      const u = selectUser.map((value) => {
        return value.user.id;
      });

      if (u?.length === 0) {
        u.push(0);
      }

      const check = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id NOT IN (:...id)', { id: u })
        .getMany();
      return check;
    } catch (error) {
      throw error;
    }
  }

  async findCheck() {
    try {
      const findCheck = this.scheduleRepository
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.user', 'user')
        .leftJoinAndSelect('schedule.calendar', 'calendar')
        .where('schedule.calendarId =:calendarId', { calendarId: 'calendar' })
        .getOne();
      return findCheck;
    } catch (error) {
      throw error;
    }
  }

  //cron not working is this
  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  // @Timeout(100)
  async checkDateAndSendEmail() {
    try {
      console.log('Hello Test');
      const now = dayjs().format('YYYY-MM-DD');
      const findAll = await this.scheduleRepository
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.user', 'user')
        .leftJoinAndSelect('schedule.calendar', 'calendar')
        .where('schedule.createAt Between :startDate and :endDate', {
          startDate: dayjs().startOf('week').toISOString(),
          endDate: dayjs().endOf('week').toISOString(),
        })
        .getMany();

      if (findAll?.length > 0) {
        for (const data of findAll) {
          const user = data?.user;
          const calendar = data?.calendar;
          console.log(calendar.date);
          if (now === String(calendar?.date)) {
            console.log('Hello');
            await this.notiService.sendMail(user?.email);
          }
        }
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateSchedule(id: number, body: UpdateScheduleDto) {
    try {
      console.log(id);
      const { user, calendar, doPay, howMuch } = body;
      const findUser = await this.userService.findUserOne(user);
      const findCalendar = await this.calendarService.findDate(calendar);
      const schedule = await this.scheduleRepository.findOne({
        where: { id: id },
      });
      const findcCalendar = await this.calendarService.findDate(calendar);
      if (!schedule) {
        throw new BadRequestException('schedule not found');
      }
      const findcheck = await this.scheduleRepository.findOne({
        where: { user: findUser, calendar: findCalendar },
      });
      if (!findcheck) {
        const merge = this.scheduleRepository.merge(schedule, {
          dopay: doPay,
          howmuch: howMuch,
          calendar: findcCalendar,
          userId: user,
        });
        return await this.scheduleRepository.save(merge);
      }
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

  //Sum Monney
  async sumPay() {
    try {
      const sumPay = this.scheduleRepository
        .createQueryBuilder('schedule')
        .select('SUM(schedule.howmuch)')
        .getRawOne();
      return await sumPay;
    } catch (error) {
      throw error;
    }
  }

  async payOften() {
    try {
      const payOften = this.scheduleRepository
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.user', 'user')
        .select(['COUNT(schedule.user)', 'user.name'])
        .where('schedule.dopay =:dopay', { dopay: 'Pay' })
        .groupBy('user.id')
        .orderBy({ 'user.id': 'ASC' || 'DESC' })
        .getRawMany();
      return payOften;
    } catch (error) {
      throw error;
    }
  }

  async findOneSchedule(id: number) {
    try {
      const findOneSchedule = await this.scheduleRepository.findOne({
        id: id,
      });
      return findOneSchedule;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id: number) {
    try {
      const deleteTask = await this.scheduleRepository.softRemove({ id: id });
      return deleteTask;
    } catch (error) {
      throw error;
    }
  }

  // async random() {
  //   try {
  //     const wk = await this.calendarService.findThatWk();
  //     const user = await this.userService.findUserAll();
  //     const round = Math.ceil(user?.length / wk?.length);
  //     const ids = user?.map((value) => value?.id);

  //     if (wk.length > 0) {
  //       for (const calendar of wk) {
  //         for (let i = 1; i <= round; i++) {
  //           const randomIndex = Math.floor(Math.random() * ids.length);
  //           const randomNum = ids.splice(randomIndex, 1)[0];

  //           const findInDays = await this.scheduleRepository.findOne({
  //             where: { userId: randomNum },
  //             relations: ['calendar', 'user'],
  //           });

  //           if (findInDays?.calendar?.id !== calendar?.id && ids?.length > 0) {
  //             const create = this.scheduleRepository.create({
  //               userId: randomNum,
  //               calendarId: calendar?.id,
  //               howmuch: 0,
  //               dopay: 'Do',
  //             });

  //             await this.scheduleRepository.save(create);
  //           }
  //         }
  //       }
  //     }
  //     return wk;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
