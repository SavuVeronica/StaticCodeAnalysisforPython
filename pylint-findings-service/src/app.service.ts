import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { captureRejections } from 'events';
// import { execSync } from 'child_process';
import { Model } from 'mongoose';
import { NewProjectDto } from './dtos/new-project.dto';
import { NewPylintFindingDto } from './dtos/new-pylint-finding.dto';
import { NewReportDto } from './dtos/new-report.dto';
import { NewSonarFindingDto } from './dtos/new-sonar-findings.dto';
import { ProjectUpdateDto } from './dtos/project-update.dto';
import { ProjectDto } from './dtos/project.dto';
import { PylintRun } from './dtos/pylint-run.dto';
import { PylintFindingDto } from './dtos/pylintFinding.dto';
import { ReportDataDto } from './dtos/report-data.dto';
import { ReportDto } from './dtos/report.dto';
import { SonarFindingDto } from './dtos/sonarFinding.dto';
import { IProject } from './interfaces/project.interface';
import { IPylintFinding } from './interfaces/pylintFinding.interface';
import { IReport } from './interfaces/report.interface';
import { ISonarFinding } from './interfaces/sonarFinding.interface';
// const { exec } = require("child_process");
const execSync = require('child_process').execSync;
// const http = require('http');
const request = require('request');

@Injectable()
export class AppService {

  constructor(@InjectModel('Report') private readonly reportModel: Model<IReport>,
    @InjectModel('Project') private readonly projectModel: Model<IProject>,
    @InjectModel('PylintFinding') private readonly pylintFindingModel: Model<IPylintFinding>,
    @InjectModel('SonarFinding') private readonly sonarFindingModel: Model<ISonarFinding>,) { }

  async findAllProjects(): Promise<ProjectDto[]> {
    return await this.projectModel.find().exec();
  }

  async findProject(id: number): Promise<ProjectDto> {
    return await this.projectModel.findOne({ id: id }).exec();
  }

  async findProjectRuns(id: number): Promise<ReportDto[]> {
    return await this.reportModel.find({ projectId: id }).exec();
  }

  async findUserProject(id: number): Promise<ProjectDto[]> {
    return await this.projectModel.find({ userId: id }).exec();
  }

  async createProject(project: ProjectDto): Promise<ProjectDto> {
    const newProject = await new this.projectModel(project);
    return newProject.save();
  }

  async newProject(project: NewProjectDto): Promise<ProjectDto> {
    const lastProject = await (await this.findAllProjects()).sort((project1, project2) => {
      return (project1.id < project2.id) ? 1 : -1;
    });
    var newid;
    if (lastProject.length === 0) {
      newid = 1;
    } else {
      newid = lastProject[0].id + 1;
    }
    const newProject = { id: newid, userId: project.userId, name: project.name, localpath: project.localpath };
    return this.createProject(newProject);
  }

  async updateProject(id: number, project: ProjectUpdateDto): Promise<ProjectDto> {
    return await this.projectModel
      .findOneAndUpdate({ id: id }, project, { new: true })
      .exec();
  }

  async deleteProject(id: number): Promise<ProjectDto> {
    const deletedProject = await this.projectModel.findOneAndRemove({ id: id }).exec();
    (await this.findProjectRuns(id)).forEach(run => {
      this.deleteRun(run.id);
    })
    return deletedProject;
  }

  async findAllReports(): Promise<ReportDto[]> {
    return await this.reportModel.find().exec();
  }

  async findReport(id: number): Promise<ReportDto> {
    return await this.reportModel.findOne({ id: id }).exec();
  }

  async findUserReports(id: number): Promise<ReportDto[]> {
    return await this.reportModel.find({ userId: id }).exec();
  }

  async pylintDeleteAll() {
    return await this.pylintFindingModel.deleteMany();
  }

  async newPylintRun(reportId: number, pylintRun: PylintRun) {
    const command = "pylint " + "--output-format=json \"" + pylintRun.localpath + "\"";
    // run pylint command
    var result;
    try {
      result = execSync(command);
    }
    catch (error) {
      result = error.stdout.toString();
    }

    const findings = JSON.parse(result);

    for (const finding of findings) {
      const newFinding = {
        reportId: reportId,
        filename: (String)(finding.module),
        line: Number.parseInt(finding.line),
        rule: (String)(finding.symbol),
        message: (String)(finding.message),
        category: (String)(finding.type)
      };
      const find = await this.newPylintFinding(newFinding);
    }
    return "ok";
  }

  async newSonarQubeRun(runId: number, sonarData: string) {
    // parse sonarqube data
    if(sonarData === "")
      return;

    const result = JSON.parse(sonarData);
    const issues = result.issues;

    // add each sonar finding in db
    for (const issue of issues) {
      if(issue.status === 'CLOSED')
        continue;

      const find = await this.newSonarFinding({
        reportId: runId,
        filename: issue.component,
        line: issue.line,
        rule: issue.rule,
        message: issue.message,
        category: issue.severity,
        effortToSolve: issue.effort,
        Type: issue.type
      })
    }
    return "ok";
  }

  async newRunProject(newRun: NewReportDto) {

    const project = await this.findProject(newRun.projectId);

    // create new report in db
    const newReport = await this.newReport(newRun);

    // new pylint run
    const result = await this.newPylintRun(newReport.id, { localpath: project.localpath });
    // new sonarqube run
    const result2 = await this.newSonarQubeRun(newReport.id, newRun.sonarData);

    return newReport;
  }

  async newReport(newReport: NewReportDto) {
    const lastReport = await (await this.findAllReports()).sort((report1, report2) => {
      return (report1.id < report2.id) ? 1 : -1;
    });
    var newid: number;
    if (lastReport.length === 0) {
      newid = 1;
    } else {
      newid = lastReport[0].id + 1;
    }
    var currentDate = new Date();
    const newRun = { id: newid, userId: newReport.userId, projectId: newReport.projectId, dateTime: currentDate, effortToSolve: 0 };
    return this.createReport(newRun);
  }

  async createReport(report: ReportDto): Promise<ReportDto> {
    const newReport = await new this.reportModel(report);
    return newReport.save();
  }

  async updateReport(id: number, report: ReportDto): Promise<ReportDto> {
    return await this.reportModel
      .findOneAndUpdate({ id: id }, report, { new: true })
      .exec();
  }

  async deleteReport(id: number): Promise<ReportDto> {
    return await this.reportModel.findOneAndRemove({ id: id }).exec();
  }

  async findAllReportsWithData(userId: number): Promise<ReportDataDto[]> {
    const reports = await this.findUserReports(userId);
    var reportsData = [];
    for (const report of reports) {
      const project = await this.findProject(report.projectId);

      reportsData.push({
        id: report.id,
        userId: report.userId,
        projectId: report.projectId,
        projectName: project.name,
        dateTime: report.dateTime
      });
    }
    return reportsData;
  }

  async getRunsCountOfProject(projectId: number) {
    const runs = await this.reportModel.find({ projectId: projectId });
    var result = [];
    for (const run of runs) {
      const findings = await this.getPylintFindingsOfRun(run.id);
      const sonarFindings = await this.getSonarFindingsOfRun(run.id);
      result.push({ id: run.id, projectId: run.projectId, dateTime: run.dateTime, noFindings: findings.length + sonarFindings.length });
    }
    return result;
  }

  async deleteRun(id: number) {
    const deletedRun = await this.deleteReport(id);
    await this.pylintFindingModel.deleteMany({ reportId: id });
    await this.sonarFindingModel.deleteMany({ reportId: id});
    return deletedRun;
  }

  async findAllPylintFindings(): Promise<PylintFindingDto[]> {
    return await this.pylintFindingModel.find().exec();
  }

  async getPylintFindingsOfRun(id: number): Promise<PylintFindingDto[]> {
    return await this.pylintFindingModel.find({ reportId: id }).exec();
  }

  async findPylintFinding(id: number): Promise<PylintFindingDto> {
    return await this.pylintFindingModel.findOne({ id: id }).exec();
  }

  async createPylintFinding(pylintFinding: PylintFindingDto): Promise<PylintFindingDto> {
    const newpylintFinding = await new this.pylintFindingModel(pylintFinding);
    return newpylintFinding.save();
  }

  async newPylintFinding(newFinding: NewPylintFindingDto) {
    const lastFinding = (await this.findAllPylintFindings()).sort((find1, find2) => {
      return (find1.id < find2.id) ? 1 : -1;
    });
    var newid: number;
    if (lastFinding.length === 0) {
      newid = 1;
    } else {
      newid = lastFinding[0].id + 1;
    }
    const newFindingPylint = {
      id: newid,
      reportId: newFinding.reportId,
      filename: newFinding.filename,
      line: newFinding.line,
      rule: newFinding.rule,
      message: newFinding.message,
      category: newFinding.category
    };
    return this.createPylintFinding(newFindingPylint);
  }

  async updatePylintFinding(
    pylintFinding: PylintFindingDto,
  ): Promise<PylintFindingDto> {
    return await this.pylintFindingModel
      .findOneAndUpdate({ id: pylintFinding.id }, pylintFinding, { new: true })
      .exec();
  }

  async deletePylintFinding(id: number): Promise<PylintFindingDto> {
    return await this.pylintFindingModel.findOneAndRemove({ id: id }).exec();
  }

  async findAllSonarFindings(): Promise<SonarFindingDto[]> {
    return await this.sonarFindingModel.find().exec();
  }

  async findSonarFinding(id: number): Promise<SonarFindingDto> {
    return await this.sonarFindingModel.findOne({ id: id }).exec();
  }

  async createSonarFinding(sonarFinding: SonarFindingDto): Promise<SonarFindingDto> {
    const newsonarFinding = await new this.sonarFindingModel(sonarFinding);
    return newsonarFinding.save();
  }

  async newSonarFinding(newFinding: NewSonarFindingDto) {
    const lastFinding = (await this.findAllSonarFindings()).sort((find1, find2) => {
      return (find1.id < find2.id) ? 1 : -1;
    });
    var newid: number;
    if (lastFinding.length === 0) {
      newid = 1;
    } else {
      newid = lastFinding[0].id + 1;
    }
    const newFindingSonar = {
      id: newid,
      reportId: newFinding.reportId,
      filename: newFinding.filename,
      line: newFinding.line,
      rule: newFinding.rule,
      message: newFinding.message,
      category: newFinding.category,
      effortToSolve: newFinding.effortToSolve,
      Type: newFinding.Type
    };
    return this.createSonarFinding(newFindingSonar);
  }

  async updateSonarFinding(
    id: number,
    sonarFinding: SonarFindingDto,
  ): Promise<SonarFindingDto> {
    return await this.sonarFindingModel
      .findOneAndUpdate({ id: id }, sonarFinding, { new: true })
      .exec();
  }

  async deleteSonarFinding(id: number): Promise<SonarFindingDto> {
    return await this.sonarFindingModel.findOneAndRemove({ id: id }).exec();
  }

  async getSonarFindingsOfRun(id: number): Promise<SonarFindingDto[]> {
    return await this.sonarFindingModel.find({ reportId: id }).exec();
  }

  async sonarDeleteAll() {
    return await this.sonarFindingModel.deleteMany();
  }
}
