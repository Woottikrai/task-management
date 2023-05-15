import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Injectable,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TestUserDto } from './test-user.dto';
import xlsx from 'node-xlsx';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { TestUser } from 'src/entities/test-user.entity';
import { Repository } from 'typeorm';
import { Test } from 'supertest';
import { ImportExcelService } from './import-excel.service';
@ApiTags('import')
@Controller('import')
export class ImportExcelController {
  constructor(private readonly testuserService: ImportExcelService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_: Request, file: Express.Multer.File, cb: any) => {
        if (
          file.mimetype.match(
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          )
        ) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadFileAndPassValidation(
    @Body() body: TestUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    const worksheet = xlsx.parse(file.buffer, {
      type: 'buffer',
      raw: true,
      cellText: true,
    });
    const jsonObj = worksheet[0].data as Record<string, string | number>[][]; //data here

    const data = await this.testuserService.testCreate(jsonObj);
  }
}
