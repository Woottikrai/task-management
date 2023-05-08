import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { UserModule } from 'src/user/user.module';
import { Calendar } from 'src/entities/calendar.entity';
import { CalendarModule } from 'src/calendar/calendar.module';
import { EventGateway } from 'src/event/event.gateway';
import { EventModule } from 'src/event/event.module';
import { NotiEmailModule } from 'src/noti-email/noti-email.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, User]),
    CalendarModule,
    UserModule,
    EventGateway,
    EventModule,
    NotiEmailModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
