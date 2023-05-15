import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as xl from 'excel4node';
import { Response, query } from 'express';
import { Schedule } from 'src/entities/schedule.entity';
import * as dayjs from 'dayjs';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UserService } from 'src/user/user.service';
import { FilterQueryUserExportExcel } from './dto/filter.dto';
import { create } from 'domain';
@Injectable()
export class ExportExcelService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private scheduleservice: ScheduleService,
    private userService: UserService,
  ) {}

  async queryUserExport(filter: FilterQueryUserExportExcel) {
    const { position, startDate, endDate, limit } = filter;
    try {
      const user = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.position', 'userposition');

      if (position) {
        user.andWhere('user.position = :position', {
          position: position,
        });
      }

      if (startDate && endDate) {
        user.andWhere('user.createAt BETWEEN :startDate AND :endDate', {
          startDate: dayjs(startDate).startOf('day').toISOString(),
          endDate: dayjs(endDate).endOf('day').toISOString(),
        });
      }
      user.limit(limit);
      return await user.getMany();
    } catch (error) {
      throw error;
    }
  }

  async exportQuery(res: Response, filter: FilterQueryUserExportExcel) {
    try {
      const ws = new xl.Workbook();
      const sheet = ws.addWorksheet('sheet');
      const user = await this.queryUserExport(filter);
      const cellStyle = this.styleWh();
      const header = ['ชื่อ', 'อีเมลล์', 'ตำแหน่ง'];
      sheet.cell(1, 3, 1, 5, true).string(`รายชื่อพนักงาน`).style(cellStyle);

      for (let i = 0; i < header.length; i++) {
        sheet
          .cell(5, i + 3)
          .string(header[i])
          .style(cellStyle);
        sheet.column(i + 3).setWidth(20);
      }
      let _row = 6;
      for (const u of user) {
        sheet
          .cell(_row, 3)
          .string(`${u.name || '-'}`)
          .style(cellStyle);
        sheet
          .cell(_row, 4)
          .string(`${u.email || '-'}`)
          .style(cellStyle);
        sheet
          .cell(_row, 5)
          .string(`${u?.position?.position || '-'}`)
          .style(cellStyle);
        sheet
          .cell(_row, 6)
          .string(`${dayjs(u.createAt).format('YYYY-MM-DD') || '-'}`)
          .style(cellStyle);
        _row++;
      }

      ws.write('Query.xlsx', res);
    } catch (error) {
      throw error;
    }
  }

  async exportUser(res: Response) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.position', 'userposition')
        .getMany();
      const ws = new xl.Workbook();
      const sheet = ws.addWorksheet('sheet');

      const cellStyle = await this.style();
      const wh = await this.styleWh();
      const header = ['ชื่อ', 'อีเมลล์', 'ตำแหน่ง', 'เบอร์โทรศัพท์', 'รูปภาพ'];
      let _row = 2;
      const width = 10;
      const height = width * 4;

      for (let i = 0; i < header.length; i++) {
        sheet
          .cell(1, i + 1)
          .string(header[i])
          .style(cellStyle);
        sheet.column(i + 1).setWidth(width);
      }

      for (const u of user) {
        const newImg = u?.img.replace(/^data:([A-Za-z-+\/]+);base64,/, '');
        const imageBuffer = Buffer.from(newImg, 'base64');

        if (imageBuffer) {
          sheet.addImage({
            image: imageBuffer,
            name: 'image',
            type: 'picture',
            position: {
              type: 'twoCellAnchor',
              from: {
                col: 5,
                colOff: 0,
                row: _row,
                rowOff: 0,
              },
              to: {
                col: 5 + 1,
                colOff: 0,
                row: _row + 1,
                rowOff: 0,
              },
            },
          });
        }
        sheet.row(_row).setHeight(height);
        sheet
          .cell(_row, 1)
          .string(`${u?.name || '-'}`)
          .style(wh);
        sheet
          .cell(_row, 2)
          .string(`${u?.email || '-'} `)
          .style(wh);
        sheet
          .cell(_row, 3)
          .string(`${u?.position?.position || '-'}`)
          .style(wh);
        sheet
          .cell(_row, 4)
          .string(`${u?.tel || '-'}`)
          .style(wh);

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
      const sheet2 = ws.addWorksheet('addWorksheet');
      const cellStyle = await this.style();
      const wh = await this.styleWh();

      const header = ['ชื่อ', 'วันที่ทำเวร', 'ทำหรือจ่าย', 'จำนวนเงินที่จ่าย'];
      for (let i = 0; i < header.length; i++) {
        sheet
          .cell(1, i + 1)
          .string(header[i])
          .style(cellStyle);
        sheet.column(i + 1).setWidth(20);
      }

      let _row = 2;

      for (const u of scheduleData) {
        sheet
          .cell(_row, 1)
          .string(`${u?.user?.name || '-'}`)
          .style(wh);
        sheet
          .cell(_row, 2)
          .string(
            `${
              u?.calendar?.date
                ? dayjs(u?.calendar?.date).format('YYYY-MM-DD')
                : '-'
            }`,
          )
          .style(wh);
        sheet
          .cell(_row, 3)
          .string(`${u?.dopay || '-'}`)
          .style(wh);
        sheet
          .cell(_row, 4)
          .string(`${u?.howmuch || '-'}`)
          .style(wh);
        _row++;
      }

      sheet.cell(1, 7).string('เงินรวมที่เก็บได้').style(wh);
      sheet.cell(2, 7).string(`${sumpay.sum}`).style(wh);

      const header2 = ['ชื่อ', 'วันที่ทำเวร', 'ทำหรือจ่าย', 'จำนวนเงินที่จ่าย'];
      for (let i = 0; i < header.length; i++) {
        sheet2
          .cell(1, i + 1)
          .string(header[i])
          .style(cellStyle);
        sheet2.column(i + 1).setWidth(20);

        ws.write('Schedule.xlsx', res);
      }
    } catch (error) {
      throw error;
    }
  }

  async style() {
    const ws = new xl.Workbook();

    let cellStyle = ws.createStyle({
      font: {
        color: 'FF0000', // สีตัวอักษรเป็นสีแดง
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center',
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: 'DCEBFF', //
      },
      border: {
        left: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
        right: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
        top: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
        bottom: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
      },
    });
    return cellStyle;
  }

  styleWh() {
    const ws = new xl.Workbook();
    const wh = ws.createStyle({
      font: {
        color: '000000', // สีตัวอักษรเป็นสีแดง
      },
      alignment: {
        shrinkToFit: true,
        wrapText: true,
        horizontal: 'center',
        vertical: 'center',
      },
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: 'DCEBFF', //
      },
      border: {
        left: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
        right: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
        top: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
        bottom: {
          style: 'thin',
          color: '000000', // สีเส้นขอบเป็นสีดำ
        },
      },
    });
    return wh;
  }
}
