import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as xl from 'excel4node';
import { Response, query } from 'express';
import { Schedule } from 'src/entities/schedule.entity';
import * as dayjs from 'dayjs';
import { ScheduleService } from 'src/schedule/schedule.service';
import detector from 'node_modules/image-size/dist/detector';
import * as fs from 'fs';
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
        width: 20, // กำหนดความกว้างของเซลให้เป็น 20
        hight: 50,
      });

      const wh = ws.createStyle({
        font: {
          color: 'FF0000', // สีตัวอักษรเป็นสีแดง
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
      const header = ['ชื่อ', 'อีเมลล์', 'ตำแหน่ง', 'เบอร์โทรศัพท์', 'รูปภาพ'];
      let _row = 2;

      for (let i = 0; i < header.length; i++) {
        sheet
          .cell(1, i + 1)
          .string(header[i])
          .style(cellStyle);
        sheet.column(i + 1).setWidth(50);
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
        sheet.row(_row).setHeight(200);
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
        width: 50, // กำหนดความกว้างของเซลให้เป็น 20
        hight: 50,
      });

      const header = ['ชื่อ', 'วันที่ทำเวร', 'ทำหรือจ่าย', 'จำนวนเงินที่จ่าย'];
      for (let i = 0; i < header.length; i++) {
        sheet
          .cell(1, i + 1)
          .string(header[i])
          .style(cellStyle);
      }

      let _row = 2;
      for (const u of scheduleData) {
        sheet
          .cell(_row, 1)
          .string(`${u?.user?.name || '-'}`)
          .style({ width: 20 });
        sheet
          .cell(_row, 2)
          .string(
            `${
              u?.calendar?.date
                ? dayjs(u?.calendar?.date).format('YYYY-MM-DD')
                : '-'
            }`,
          )
          .style({ width: 20 });
        sheet
          .cell(_row, 3)
          .string(`${u?.dopay || '-'}`)
          .style({ width: 20 });
        sheet
          .cell(_row, 4)
          .string(`${u?.howmuch || '-'}`)
          .style({ width: 20 });
        _row++;
      }
      console.log(sumpay);
      sheet.cell(1, 7).string('เงินรวมที่เก็บได้').style(cellStyle);
      sheet.cell(2, 7).string(`${sumpay.sum}`);
      ws.write('Schedule.xlsx', res);
    } catch (error) {
      throw error;
    }
  }
}
