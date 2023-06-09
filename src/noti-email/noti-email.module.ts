import { Module } from '@nestjs/common';
import { NotiEmailService } from './noti-email.service';
import { NotiEmailController } from './noti-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Schedule } from 'src/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  exports: [NotiEmailService],
  controllers: [NotiEmailController],
  providers: [NotiEmailService],
})
export class NotiEmailModule {}
