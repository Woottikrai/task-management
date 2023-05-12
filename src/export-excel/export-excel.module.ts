import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportExcelService } from './export-excel.service';
import { User } from 'src/entities/user.entity';
import { ExcelController } from './export-excel.controller';
import { Schedule } from 'src/entities/schedule.entity';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Schedule]),
    ScheduleModule,
    UserModule,
  ],
  controllers: [ExcelController],
  providers: [ExportExcelService],
  exports: [ExportExcelModule],
})
export class ExportExcelModule {}
