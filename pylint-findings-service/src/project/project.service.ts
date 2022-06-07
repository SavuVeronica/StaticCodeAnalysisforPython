import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewProjectDto } from 'src/dtos/new-project.dto';
import { ProjectDto } from 'src/dtos/project.dto';
import { IProject } from 'src/interfaces/project.interface';

@Injectable()
export class ProjectService {
  // constructor(
  //   @InjectModel('Project') private readonly projectModel: Model<IProject>,
  // ) {}

  // async findAll(): Promise<ProjectDto[]> {
  //   return await this.projectModel.find().exec();
  // }

  // async find(id: number): Promise<ProjectDto> {
  //   return await this.projectModel.findOne({ id: id }).exec();
  // }

  // async findUserProject(id: number): Promise<ProjectDto[]> {
  //   return await this.projectModel.find({userId: id}).exec();
  // }

  // async create(project: ProjectDto): Promise<ProjectDto> {
  //   const newProject = await new this.projectModel(project);
  //   return newProject.save();
  // }

  // async newProject(project: NewProjectDto): Promise<ProjectDto> {
  //   const lastProject = await (await this.findAll()).sort((project1, project2) => { 
  //     return (project1.id < project2.id) ? 1 : -1; 
  //   });
  //   var newid;
  //   if (lastProject.length === 0) {
  //     newid = 1;
  //   } else {
  //     newid = lastProject[0].id + 1;
  //   }
  //   const newProject = {id: newid, userId: project.userId, name: project.name, localpath: project.localpath};
  //   return this.create(newProject);
  // }

  // async update(id: number, project: ProjectDto): Promise<ProjectDto> {
  //   return await this.projectModel
  //     .findOneAndUpdate({ id: id }, project, { new: true })
  //     .exec();
  // }

  // async delete(id: number): Promise<ProjectDto> {
  //   return await this.projectModel.findOneAndRemove({ id: id }).exec();
  // }
}
