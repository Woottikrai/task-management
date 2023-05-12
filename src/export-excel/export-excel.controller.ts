import { Controller, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportExcelService } from './export-excel.service';
import { FilterQueryUserExportExcel } from './dto/filter.dto';

@ApiTags('excel')
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExportExcelService) {}

  @Post('user')
  async exportUser(@Res() res: Response) {
    try {
      return await this.excelService.exportUser(res);
    } catch (error) {
      throw error;
    }
  }

  @Post('schedule')
  async exportschedule(@Res() res: Response) {
    try {
      return await this.excelService.exportSchedule(res);
    } catch (error) {
      throw error;
    }
  }

  @Post('userQuery')
  async exportUserQuery(
    @Res() res: Response,
    @Query() qs: FilterQueryUserExportExcel,
  ) {
    try {
      return await this.excelService.exportQuery(res, qs);
    } catch (error) {
      throw error;
    }
  }
}
