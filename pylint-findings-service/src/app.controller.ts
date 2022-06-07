import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { NewProjectDto } from './dtos/new-project.dto';
import { NewReportDto } from './dtos/new-report.dto';
import { NewSonarFindingDto } from './dtos/new-sonar-findings.dto';
import { NewSonarDto } from './dtos/new-sonar.dto';
import { ProjectUpdateDto } from './dtos/project-update.dto';
import { ProjectDto } from './dtos/project.dto';
import { PylintRun } from './dtos/pylint-run.dto';
import { PylintFindingDto } from './dtos/pylintFinding.dto';
import { ReportEffortDto } from './dtos/report-effort.dto';
import { ReportDto } from './dtos/report.dto';
import { SonarFindingDto } from './dtos/sonarFinding.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('project')
  async findAll() {
    return await this.appService.findAllProjects();
  }

  @Get('project/:id')
  async findOne(@Param('id') id): Promise<ProjectDto> {
    return await this.appService.findProject(Number(id));
  }

  @Get('project/user/:id')
  async findUserProjects(@Param('id') id): Promise<ProjectDto[]> {
    return await this.appService.findUserProject(Number(id));
  }

  @Post('project')
  async create(@Body() project: ProjectDto) {
    return await this.appService.createProject(project);
  }

  @Post('project/new')
  async newProject(@Body() project: NewProjectDto) {
    return await this.appService.newProject(project);
  }

  @Put('project/:id')
  async update(@Param('id') id, @Body() project: ProjectUpdateDto) {
    return await this.appService.updateProject(
      Number(id),
      project,
    );
  }

  @Delete('project/:id')
  async delete(@Param('id') id) {
    return await this.appService.deleteProject(Number(id));
  }

  @Get('report')
  async findAllReports() {
    return await this.appService.findAllReports();
  }

  @Delete('run/:id') 
  async deleteRun(@Param('id') id: number){
    return await this.appService.deleteRun(id);
  }

  @Get('report-data/:id')
  async getReportWithData(@Param('id') id: number){
    return await this.appService.findAllReportsWithData(id);
  } 

  @Get('report/project/:id')
  async getProjectRuns(@Param('id') id) {
    return await this.appService.findProjectRuns(id);
  }

  @Post('report/new-run')
  async newRunProject(@Body() newRun: NewReportDto) {
    return await this.appService.newRunProject(newRun);
  }

  @Post('report/new-pylint')
  async newPylintRun(@Body() pylintRun: PylintRun) {
    this.appService.newPylintRun(1,pylintRun);
  }

  @Get('report/user/:id')
  async findUserProjectsReport(@Param('id') id): Promise<ReportDto[]> {
    return await this.appService.findUserReports(Number(id));
  }

  @Get('report/:id')
  async findOneReport(@Param('id') id): Promise<ReportDto> {
    return await this.appService.findReport(Number(id));
  }

  @Post('report')
  async createReport(@Body() report: ReportDto) {
    return await this.appService.createReport(report);
  }

  @Put('report/:id')
  async updateReport(@Param('id') id, @Body() report: ReportDto) {
    return await this.appService.updateReport(Number(id), report);
  }

  @Delete('report/:id')
  async deleteReport(@Param('id') id) {
    return await this.appService.deleteReport(Number(id));
  }

  @Get('run-count/project/:id')
  async getRunCountOfProject(@Param('id') id) {
    return await this.appService.getRunsCountOfProject(id);
  }

  @Get('pylint')
  async findAllPylintFindings() {
    return await this.appService.findAllPylintFindings();
  }

  @Get('pylint/:id')
  async findOnePylintFinding(@Param('id') id): Promise<PylintFindingDto> {
    return await this.appService.findPylintFinding(Number(id));
  }

  @Get('/run/pylint/:id')
  async getPylintFindingsOfRun(@Param('id') id: number): Promise<PylintFindingDto[]>{
    return await this.appService.getPylintFindingsOfRun(id);
  } 

  @Post('pylint')
  async createPylintFinding(@Body() pylintFinding: PylintFindingDto) {
    return await this.appService.createPylintFinding(pylintFinding);
  }

  @Delete('pylint/all')
  async deleteAllPylintFindings(){
    return await this.appService.pylintDeleteAll();
  }

  @Put('pylint')
  async updatePylintFinding(@Body() pylintFinding: PylintFindingDto) {
    return await this.appService.updatePylintFinding(
      pylintFinding,
    );
  }

  @Delete('pylint/:id')
  async deletePylintFinding(@Param('id') id) {
    return await this.appService.deletePylintFinding(Number(id));
  }

  @Get('sonar-finding')
  findAllSonarFindings() {
    return this.appService.findAllSonarFindings();
  }

  @Get('sonar-finding/:id')
  findOneSonarFinding(@Param('id') id): Promise<SonarFindingDto> {
    return this.appService.findSonarFinding(Number(id));
  }

  @Post('sonar-finding')
  async createSonarFinding(@Body() sonarFinding: NewSonarFindingDto) {
    const newFinding = await this.appService.newSonarFinding(sonarFinding);
    return newFinding;
  }

  @Post('sonar-finding/run/:id')
  async createNewSonarRun(@Param('id') id: number, @Body() data: NewSonarDto){
    return await this.appService.newSonarQubeRun(id, data.data);
  }

  @Get('/run/sonar/:id')
  async getSonarFindingsOfRun(@Param('id') id: number): Promise<SonarFindingDto[]>{
    return await this.appService.getSonarFindingsOfRun(id);
  } 

  @Delete('sonar-finding/all')
  async deleteAllSonarFindings(){
    return await this.appService.sonarDeleteAll();
  }

  @Put('sonar-finding/:id')
  async updateSonarFinding(@Param('id') id, @Body() sonarFinding: SonarFindingDto) {
    const updatedFinding = await this.appService.updateSonarFinding(
      Number(id),
      sonarFinding,
    );
    return updatedFinding;
  }

  @Delete('sonar-finding/:id')
  async deleteSonarFinding(@Param('id') id) {
    const deletedFinding = await this.appService.deleteSonarFinding(Number(id));
    return deletedFinding;
  }
}
