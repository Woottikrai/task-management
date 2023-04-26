import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotiEmailService {
  constructor() {}

  private transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: { user: 'phakphumninart@gmail.com', pass: 'yoxwmueyqtkleoiw' },
  });

  async sendMail(email: string) {
    try {
      await this.transport.sendMail({
        to: `${email}`, //Email User
        from: 'phakphumninart@gmail.com',
        subject: 'ทำเวร',
        text: 'วันนี้เป็นเวรของคุณ',
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
