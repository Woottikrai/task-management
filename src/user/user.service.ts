import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(bodyUser: CreateUserDto): Promise<User> {
    try {
      const password = this.hashPassWord(bodyUser.password);
      console.log(password);
      const newUser = this.userRepository.create({ ...bodyUser, password });
      return this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async findUserAll() {
    try {
      const findUserAll = await this.userRepository.find();
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
      const updateUser = await this.userRepository.update(id, bodyUser);
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

  hashPassWord(password: string) {
    try {
      const SALT = bcrypt.genSaltSync();
      return bcrypt.hashSync(password, SALT);
    } catch (error) {
      throw error;
    }
  }
}
