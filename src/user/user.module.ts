import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EventModule } from 'src/event/event.module';
import { NotiEmailService } from 'src/noti-email/noti-email.service';
import { NotiEmailModule } from 'src/noti-email/noti-email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EventModule, NotiEmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, UserModule],
})
export class UserModule {}
