import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authentication/auth.guard';
import { CalendarModule } from './calendar/calendar.module';
import { PositionModule } from './position/position.module';
import { NotiEmailModule } from './noti-email/noti-email.module';
import { EventModule } from './event/event.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleModule } from './schedule/schedule.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          autoLoadEntities: false,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    ConfigModule,
    UserModule,
    AuthenticationModule,
    CalendarModule,
    NestScheduleModule.forRoot(),
    ScheduleModule,
    PositionModule,
    NotiEmailModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
