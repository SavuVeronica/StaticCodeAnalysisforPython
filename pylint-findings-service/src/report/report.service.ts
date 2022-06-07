import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewReportDto } from 'src/dtos/new-report.dto';
import { ProjectDto } from 'src/dtos/project.dto';
import { ReportDto } from 'src/dtos/report.dto';
import { IProject } from 'src/interfaces/project.interface';
import { IReport } from 'src/interfaces/report.interface';
const { exec } = require("child_process");
const axios = require('axios').default;
const https = require('https');

@Injectable()
export class ReportService {
  // constructor(
  //   @InjectModel('Report') private readonly reportModel: Model<IReport>,
  //   @InjectModel('Project') private readonly projectModel: Model<IProject>
  // ) { }

  // async findAll(): Promise<ReportDto[]> {
  //   return await this.reportModel.find().exec();
  // }

  // async find(id: number): Promise<ReportDto> {
  //   return await this.reportModel.findOne({ id: id }).exec();
  // }

  // async findUserReports(id: number): Promise<ReportDto[]> {
  //   return await this.reportModel.find({ userId: id }).exec();
  // }

  // async newPylintRun(localpath: String) {
  //   const command = "pylint --output=result2.txt --output-format=json \"" + localpath + "\"";
  //   exec(command, (error, stdout, stderr) => {
  //     if (error) {
  //       console.log(`error: ${error.message}`);
  //       return;
  //     }
  //     if (stderr) {
  //       console.log(`stderr: ${stderr}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //   });
  // }

  // async newSonarQubeRun(projectName: String) {

  // }

  // async getProject(projectId: Number): Promise<ProjectDto> {
  //   const project = await this.projectModel.findById(projectId);
  //   console.log(project);
  //   return project;
  //   // const agentOptions = {
  //   //   rejectUnauthorized: false
  //   // };
    
  //   // const agent = new https.Agent(agentOptions);

  //   // return https.get({
  //   //   URL: 'http://localhost:4000/project/' + projectId,
  //   //   method: 'GET',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   agent: agent,
  //   // }, (response) => {
  //   //   return response.json();
  //   // })
  //   // .on("error", (err) => {
  //   //   console.log("Error: " + err.message);
  //   // });
  //   // return axios
  //   //   .get('https://localhost:4000/project/' + projectId)
  //   //   .then(res => {
  //   //     console.log(`statusCode: ${res.status}`)
  //   //     console.log(res)
  //   //     return res;
  //   //   })
  //   //   .catch(error => {
  //   //     console.error(error)
  //   //     return error;
  //   //   });
  // }

  // async newRunProject(newRun: NewReportDto) {

  //   const project = await this.getProject(newRun.projectId);
  //   // new pylint run
  //   this.newPylintRun(project.localpath);
  //   // new sonarqube run
  //   this.newSonarQubeRun(project.name);
  //   // create new report in db
  //   this.newReport(newRun);
  // }

  // async newReport(newReport: NewReportDto) {
  //   const lastReport = await (await this.findAll()).sort((report1, report2) => {
  //     return (report1.id < report2.id) ? 1 : -1;
  //   });
  //   var newid: number;
  //   if (lastReport.length === 0) {
  //     newid = 1;
  //   } else {
  //     newid = lastReport[0].id + 1;
  //   }
  //   var currentDate = new Date();
  //   const newRun = { id: newid, userId: newReport.userId, projectId: newReport.projectId, dateTime: currentDate };
  //   return this.create(newRun);
  // }

  // async create(report: ReportDto): Promise<ReportDto> {
  //   const newReport = await new this.reportModel(report);
  //   return newReport.save();
  // }

  // async update(id: number, report: ReportDto): Promise<ReportDto> {
  //   return await this.reportModel
  //     .findOneAndUpdate({ id: id }, report, { new: true })
  //     .exec();
  // }

  // async delete(id: number): Promise<ReportDto> {
  //   return await this.reportModel.findOneAndRemove({ id: id }).exec();
  // }
}
