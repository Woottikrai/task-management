import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { QueryUser } from './dto/query-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(bodyUser: CreateUserDto) {
    try {
      const { position, ...other } = bodyUser;
      const password = await this.hashPassWord(bodyUser.password);
      console.log(password);
      const newUser = this.userRepository.create({
        ...other,
        positionId: position,
        password,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async findUserAll() {
    try {
      const findUserAll = await this.userRepository.find({
        relations: ['schedule', 'schedule.user', 'position', 'position.user'],
      });
      return findUserAll;
    } catch (error) {
      throw error;
    }
  }

  async findUserOne(id: number): Promise<User> {
    try {
      const findUserOne = await this.userRepository.findOneBy({ id: id });
      return findUserOne;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, bodyUser: UpdateUserDto) {
    try {
      const { position, ...other } = bodyUser;
      const updateHash = await this.hashPassWord(bodyUser.password);
      const updateUser = await this.userRepository.update(id, {
        ...other,
        positionId: position,
        password: updateHash,
      });
      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  async removeUser(id: number) {
    try {
      const userDelete = await this.userRepository.softDelete({ id: id });
      return userDelete;
    } catch (error) {
      throw error;
    }
  }

  async hashPassWord(password: string) {
    try {
      const SALT = bcrypt.genSaltSync();
      return bcrypt.hashSync(password, SALT);
    } catch (error) {
      throw error;
    }
  }

  async queryUser(body: QueryUser) {
    try {
      const queryUser = this.userRepository
        .createQueryBuilder('user') //user entity
        .where('user.name LIKE :name', { name: `%${body?.name}%` })
        .getMany();
      return queryUser;
    } catch (error) {
      throw error;
    }
  }
}
