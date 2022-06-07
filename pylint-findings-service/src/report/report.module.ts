import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportSchema } from 'src/schemas/Report.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from 'src/schemas/Project.schema';
import { ProjectService } from 'src/project/project.service';
import { ProjectController } from 'src/project/project.controller';

@Module({
  imports: [],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
