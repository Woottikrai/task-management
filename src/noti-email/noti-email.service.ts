import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotiEmailService {
  constructor() {}

  private transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: { user: 'woottikraij2@gmail.com', pass: 'lwzynwcqwnmdmmvp' },
  });

  async sendMail(email: string) {
    try {
      await this.transport.sendMail({
        to: `${email}`, //Email User
        from: 'woottikraij2@gmail.com',
        subject: 'ทำเวร',
        text: 'คุณทำเวรวันนี้',
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
