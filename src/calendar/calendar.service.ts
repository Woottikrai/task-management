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
import * as dayjs from 'dayjs';
@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
    private userService: UserService,
  ) {}

  async createCalendar(body: CreateCalendarDto) {
    try {
      const createCalendar = await this.calendarRepository.save(body);
      return createCalendar;
    } catch (error) {
      throw error;
    }
  }

  //   async createTask(calendarRepository: CreateCalendarDto) {
  //     try {
  //       const { userid, date } = calendarRepository;
  //       for (const u of userid) {
  //         const findUser = await this.userService.findUserOne(u);
  //         console.log(findUser);
  //         const task = await this.calendarRepository.save({
  //           user: findUser,
  //           date: date,
  //         });
  //       }
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async findOne(id: number) {
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

  async updateCalendar(id: number, body: UpdateCalendarDto) {
    try {
      const updaterCalendar = await this.calendarRepository.update(id, body);
      return updaterCalendar;
    } catch (error) {
      throw error;
    }
  }

  async removeCalendar(id: number) {
    try {
      const deleteCalendar = await this.calendarRepository.softRemove({
        id: id,
      });
      return deleteCalendar;
    } catch (error) {
      throw error;
    }
  }
}
