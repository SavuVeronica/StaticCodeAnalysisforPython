import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewReportDto } from 'src/dtos/new-report.dto';
import { ReportDto } from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  // constructor(private readonly reportService: ReportService) {}

  // @Get()
  // findAll() {
  //   return this.reportService.findAll();
  // }

  // @Get('project:id')
  // getProjectById(@Param('id') id)
  // {
  //   return this.reportService.getProject(id);
  // }

  // @Post('new-run')
  // newRunProject(@Body() newRun: NewReportDto) {
  //   return this.reportService.newRunProject(newRun);
  // }

  // @Post('new-pylint:path')
  // newPylintRun(@Param("path") path: String) {
  //   this.reportService.newPylintRun(path);
  // }
  
  // @Get('user/:id')
  // findUserProjects(@Param('id') id): Promise<ReportDto[]> {
  //   return this.reportService.findUserReports(Number(id));
  // }

  // @Get(':id')
  // findOne(@Param('id') id): Promise<ReportDto> {
  //   return this.reportService.find(Number(id));
  // }

  // @Post()
  // async create(@Body() report: ReportDto) {
  //   const newReport = await this.reportService.create(report);
  //   return newReport;
  // }

  // @Put(':id')
  // async update(@Param('id') id, @Body() report: ReportDto) {
  //   const updatedReport = await this.reportService.update(Number(id), report);
  //   return updatedReport;
  // }

  // @Delete(':id')
  // async delete(@Param('id') id) {
  //   const deletedReport = await this.reportService.delete(Number(id));
  //   return deletedReport;
  // }
}
