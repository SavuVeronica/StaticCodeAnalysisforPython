import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewProjectDto } from 'src/dtos/new-project.dto';
import { ProjectDto } from 'src/dtos/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  // constructor(private readonly projectService: ProjectService) {}

  // @Get()
  // findAll() {
  //   return this.projectService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id): Promise<ProjectDto> {
  //   return this.projectService.find(Number(id));
  // }

  // @Get('user/:id')
  // findUserProjects(@Param('id') id): Promise<ProjectDto[]> {
  //   return this.projectService.findUserProject(Number(id));
  // }

  // @Post()
  // async create(@Body() project: ProjectDto) {
  //   return this.projectService.create(project);
  // }

  // @Post('new')
  // async newProject(@Body() project: NewProjectDto){
  //   return this.projectService.newProject(project);
  // }

  // @Put(':id')
  // async update(@Param('id') id, @Body() project: ProjectDto) {
  //   const updatedProject = await this.projectService.update(
  //     Number(id),
  //     project,
  //   );
  //   return updatedProject;
  // }

  // @Delete(':id')
  // async delete(@Param('id') id) {
  //   const deletedProject = await this.projectService.delete(Number(id));
  //   return deletedProject;
  // }
}
