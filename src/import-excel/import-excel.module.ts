import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ImportExcelService } from './import-excel.service';
import { ImportExcelController } from './import-excel.controller';
import { TestUser } from 'src/entities/test-user.entity';
import { ImportExcelService } from './import-excel.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestUser])],
  controllers: [ImportExcelController],
  providers: [ImportExcelService],
  exports: [ImportExcelModule],
})
export class ImportExcelModule {}
