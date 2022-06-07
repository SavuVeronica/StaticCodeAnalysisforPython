import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SonarFindingDto } from 'src/dtos/sonarFinding.dto';
import { ISonarFinding } from 'src/interfaces/sonarFinding.interface';

@Injectable()
export class SonarFindingService {
  constructor(
    // @InjectModel('SonarFinding')
    // private readonly sonarFindingModel: Model<ISonarFinding>,
  ) {}

  // async findAll(): Promise<SonarFindingDto[]> {
  //   return await this.sonarFindingModel.find().exec();
  // }

  // async find(id: number): Promise<SonarFindingDto> {
  //   return await this.sonarFindingModel.findOne({ id: id }).exec();
  // }

  // async create(sonarFinding: SonarFindingDto): Promise<SonarFindingDto> {
  //   const newsonarFinding = await new this.sonarFindingModel(sonarFinding);
  //   return newsonarFinding.save();
  // }

  // async update(
  //   id: number,
  //   sonarFinding: SonarFindingDto,
  // ): Promise<SonarFindingDto> {
  //   return await this.sonarFindingModel
  //     .findOneAndUpdate({ id: id }, sonarFinding, { new: true })
  //     .exec();
  // }

  // async delete(id: number): Promise<SonarFindingDto> {
  //   return await this.sonarFindingModel.findOneAndRemove({ id: id }).exec();
  // }
}
