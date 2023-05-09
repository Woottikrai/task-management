import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  FilterQueryUser,
  QueryByPosition,
  QueryUser,
} from './dto/query-user.dto';
import { EventGateway } from 'src/event/event.gateway';
import { NotiEmailService } from 'src/noti-email/noti-email.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventGateWay: EventGateway, // private notiEmail: NotiEmailService,
  ) {}

  async createUser(bodyUser: CreateUserDto): Promise<User> {
    try {
      const { name, email, password, img, tel, position } = bodyUser;
      const hashpassword = await this.hashPassWord(bodyUser.password);
      console.log(password);
      const newUser = this.userRepository.create({
        name: name,
        email: email,
        password: hashpassword,
        img: img,
        tel: tel,
        positionId: position,
      });
      const data = await this.userRepository.save(newUser);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findUserAll(filter: FilterQueryUser) {
    try {
      const { position, name, pagination, getOffset, limit } = filter;
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.schedule', 'schedule')
        .leftJoinAndSelect('user.position', 'position');

      if (position) {
        queryBuilder.andWhere('user.position = :position', {
          position: position,
        });
      }

      if (name) {
        queryBuilder.andWhere('user.name LIKE :name', {
          name: `%${name}%`,
        });
      }

      if (pagination) {
        queryBuilder.skip(getOffset(filter)).take(limit);
      }

      return await queryBuilder.getMany();
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
      const { name, email, img, tel, position } = bodyUser;
      const updateUser = await this.userRepository.update(id, {
        name: name,
        email: email,
        img: img,
        tel: tel,
        positionId: position,
      });
      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(id: number, body: UpdatePasswordDto) {
    try {
      const { password } = body;
      const updateHash = await this.hashPassWord(password);
      const updatePassword = await this.userRepository.update(id, {
        password: updateHash,
      });
      return updatePassword;
    } catch (error) {
      throw error;
    }
  }

  async removeUser(id: number) {
    try {
      const find = await this.userRepository.findOne({
        where: { id: id },
        relations: ['schedule'],
      });
      const userDelete = await this.userRepository.softDelete(find);
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
      const queryUser = await this.userRepository
        .createQueryBuilder('user') //user entity
        .where('user.name LIKE :name', { name: `%${body?.name}%` })
        .getMany();
      return queryUser;
    } catch (error) {
      throw error;
    }
  }

  async queryByPosition(filter: QueryByPosition) {
    try {
      const { position } = filter;
      const queryByPositionFrontend = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.position', 'position')
        .where('user.position = :position', {
          position: position,
        });

      return await queryByPositionFrontend.getManyAndCount();
    } catch (error) {
      throw error;
    }
  }
}
