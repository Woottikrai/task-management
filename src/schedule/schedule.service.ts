import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UserService } from 'src/user/user.service';
import { CalendarService } from 'src/calendar/calendar.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { EventGateway } from 'src/event/event.gateway';
import { NotiEmailService } from 'src/noti-email/noti-email.service';
import * as dayjs from 'dayjs';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { log } from 'console';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private userService: UserService,
    private calendarService: CalendarService,
    private eventGateWay: EventGateway,
    private notiService: NotiEmailService,
  ) {}

  async Create(body: CreateScheduleDto) {
    try {
      const { user, calendar, ...other } = body;
      const findUser = await this.userService.findUserOne(user);
      const Calendar = await this.calendarService.findOne(calendar);
      await this.scheduleRepository.save({
        calendar: Calendar,
        user: findUser,
        ...other,
      });
      // await this.notiService.sendMail(findUser?.email, Calendar?.date);
      // this.eventGateWay.emit('on-create', body.user);
    } catch (error) {
      throw error;
    }
  }

  //cron not working is this
  // @Cron(CronExpression.EVERY_10_SECONDS)
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
      const schedule = await this.scheduleRepository.findOne({
        where: { id: id },
      });

      if (!schedule) {
        throw new BadRequestException('schedule not found');
      }

      const merge = this.scheduleRepository.merge(schedule, {
        dopay: doPay,
        howmuch: howMuch,
        calendarId: calendar,
        userId: user,
      });

      return await this.scheduleRepository.save(merge);
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
        .orderBy({ 'user.id': 'ASC' })
        .getRawMany();
      return payOften;
    } catch (error) {
      throw error;
    }
  }

  async findOneSchedule(id: number) {
    try {
      const findOneSchedule = await this.scheduleRepository.findOneBy({
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

  async random() {
    try {
    } catch (error) {
      throw error;
    }
  }

  // const findCalendar = await getConnection()
  //   .getRepository(Calendar)
  //   .findOne({ where: { id: body?.calendar } });

  // const findUser = await getConnection()
  //   .getRepository(User)
  //   .findOne({ where: { id: body?.user } });
}
