import { Body, Controller, Post } from '@nestjs/common';
import { NotiEmailService } from './noti-email.service';
import { NotiEmailDto } from './dto/noti-email.dto';

@Controller('noti-email')
export class NotiEmailController {
  constructor(private readonly notiEmailService: NotiEmailService) {}

  @Post()
  async notiEmail(@Body() body: NotiEmailDto) {
    return await this.notiEmailService.sendMail(body);
  }
}
