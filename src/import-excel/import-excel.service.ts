import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestUser } from 'src/entities/test-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImportExcelService {
  constructor(
    @InjectRepository(TestUser)
    private testuserRepo: Repository<TestUser>,
  ) {}

  async testCreate(body: any) {
    try {
      let users = [];
      for (const data of body) {
        const create = this.testuserRepo.create({
          name: data[0],
          email: data[1],
        });
        users = [...users, create];
      }
      return await this.testuserRepo.save(users, { chunk: 100 });
    } catch (error) {
      throw error;
    }
  }
}
