import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PylintFindingDto } from 'src/dtos/pylintFinding.dto';
import { IPylintFinding } from 'src/interfaces/pylintFinding.interface';

@Injectable()
export class PylintFindingService {
  // constructor(
  //   @InjectModel('PylintFinding')
  //   private readonly pylintFindingModel: Model<IPylintFinding>,
  // ) {}

  // async findAll(): Promise<PylintFindingDto[]> {
  //   return await this.pylintFindingModel.find().exec();
  // }

  // async find(id: number): Promise<PylintFindingDto> {
  //   return await this.pylintFindingModel.findOne({ id: id }).exec();
  // }

  // async create(pylintFinding: PylintFindingDto): Promise<PylintFindingDto> {
  //   const newpylintFinding = await new this.pylintFindingModel(pylintFinding);
  //   return newpylintFinding.save();
  // }

  // async update(
  //   id: number,
  //   pylintFinding: PylintFindingDto,
  // ): Promise<PylintFindingDto> {
  //   return await this.pylintFindingModel
  //     .findOneAndUpdate({ id: id }, pylintFinding, { new: true })
  //     .exec();
  // }

  // async delete(id: number): Promise<PylintFindingDto> {
  //   return await this.pylintFindingModel.findOneAndRemove({ id: id }).exec();
  // }
}
