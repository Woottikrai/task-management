import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entities/position.entity';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async createPosition(body: CreatePositionDto) {
    try {
      const newPosition = await this.positionRepository.save(body);
      return newPosition;
    } catch (error) {
      throw error;
    }
  }

  async updatePosition(id: number, body: UpdatePositionDto) {
    try {
      const updatePosition = await this.positionRepository.update(id, body);
      return updatePosition;
    } catch (error) {
      throw error;
    }
  }

  async findOnePosition(id: number) {
    try {
      const findOnePosition = await this.positionRepository.findOneBy({
        id: id,
      });
      return findOnePosition;
    } catch (error) {
      throw error;
    }
  }

  async findAllPosition() {
    try {
      const findAllPosition = await this.positionRepository.find({
        relations: ['user', 'user.position'],
      });
      return findAllPosition;
    } catch (error) {
      throw error;
    }
  }

  async removePosition(id: number) {
    try {
      const removePosition = await this.positionRepository.softRemove({
        id: id,
      });
      return removePosition;
    } catch (error) {
      throw error;
    }
  }
}
