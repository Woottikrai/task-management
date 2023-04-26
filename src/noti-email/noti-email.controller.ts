import { Body, Controller, Post } from '@nestjs/common';
import { NotiEmailService } from './noti-email.service';
import { NotiEmailDto } from './dto/noti-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('noti-email')
@Controller('noti-email')
export class NotiEmailController {
  constructor(private readonly notiEmailService: NotiEmailService) {}

  @Post()
  async notiEmail(@Body() mail: string) {
    return await this.notiEmailService.sendMail(mail);
  }
}
