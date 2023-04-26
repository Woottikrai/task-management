import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ScheduleService } from 'src/schedule/schedule.service';
import { NotiEmailDto } from './dto/noti-email.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class NotiEmailService {
  constructor() {}

  private transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: { user: 'phakphumninart@gmail.com', pass: 'yoxwmueyqtkleoiw' },
  });

  async sendMail(body: NotiEmailDto) {
    try {
      if (dayjs(body.date).format('YYYY-MM-DD')) {
        return await this.transport.sendMail({
          to: `${body.email}`, //Email User
          from: 'phakphumninart@gmail.com',
          subject: 'ทำเวร',
          text: 'วันนี้เป็นเวรของคุณ',
        });
      }
      // console.log(user);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
