import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as xl from 'excel4node';
import { Response, query } from 'express';
import { Schedule } from 'src/entities/schedule.entity';
import * as dayjs from 'dayjs';
import { ScheduleService } from 'src/schedule/schedule.service';
@Injectable()
export class ExportExcelService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private scheduleservice: ScheduleService,
  ) {}

  async exportUser(res: Response) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.position', 'userposition')
        .getMany();

      const ws = new xl.Workbook();
      const sheet = ws.addWorksheet('sheet');

      const header = ['ชื่อ', 'อีเมลล์', 'ตำแหน่ง', 'เบอร์โทรศัพท์'];
      let _row = 2;

      for (let i = 0; i < header.length; i++) {
        sheet.cell(1, i + 1).string(header[i]);
      }

      for (const u of user) {
        sheet.cell(_row, 1).string(`${u?.name || '-'}`);
        sheet.cell(_row, 2).string(`${u?.email || '-'} `);
        sheet.cell(_row, 3).string(`${u?.position?.position || '-'}`);
        sheet.cell(_row, 4).string(`${u?.tel || '-'}`);
        _row++;
      }
      ws.write('ExcelFile.xlsx', res);
    } catch (error) {
      throw error;
    }
  }

  async exportSchedule(res: Response) {
    try {
      const sumpay = await this.scheduleservice.sumPay();
      const scheduleData = await this.scheduleRepository
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.user', 'su')
        .leftJoinAndSelect('schedule.calendar', 'sc')
        .getMany();
      const ws = new xl.Workbook();
      const sheet = ws.addWorksheet('sheet');

      const header = ['ชื่อ', 'วันที่ทำเวร', 'ทำหรือจ่าย', 'จำนวนเงินที่จ่าย'];
      for (let i = 0; i < header.length; i++) {
        sheet.cell(1, i + 1).string(header[i]);
      }

      let _row = 2;
      for (const u of scheduleData) {
        sheet.cell(_row, 1).string(`${u?.user?.name || '-'}`);
        sheet
          .cell(_row, 2)
          .string(
            `${
              u?.calendar?.date
                ? dayjs(u?.calendar?.date).format('YYYY-MM-DD')
                : '-'
            }`,
          );
        sheet.cell(_row, 3).string(`${u?.dopay || '-'}`);
        sheet.cell(_row, 4).string(`${u?.howmuch || '-'}`);
        _row++;
      }
      console.log(sumpay);
      sheet.cell(1, 7).string('เงินรวมที่เก็บได้');
      sheet.cell(2, 7).string(`จ่ายเงินด้วยค้าบบบ${sumpay.sum}`);
      ws.write('Schedule.xlsx', res);
    } catch (error) {
      throw error;
    }
  }
}
