import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';
import { PylintFindingModule } from './pylintFinding/pylint-finding.module';
import { ReportModule } from './report/report.module';
import { ReportService } from './report/report.service';
import { ProjectSchema } from './schemas/Project.schema';
import { PylintFindingSchema } from './schemas/PylintFinding.schema';
import { ReportSchema } from './schemas/Report.schema';
import { SonarFindingSchema } from './schemas/SonarFinding.schema';
import { SonarFindingModule } from './sonarFinding/sonar-finding.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ReportModule,
    ProjectModule,
    PylintFindingModule,
    SonarFindingModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@clusterdizertatie.pnich.mongodb.net/findings?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      {
        name: 'Report',
        schema: ReportSchema,
      },
    ]),
    MongooseModule.forFeature([
        {
          name: 'Project',
          schema: ProjectSchema,
        },
    ]),
    MongooseModule.forFeature([
      {
        name: 'PylintFinding',
        schema: PylintFindingSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'SonarFinding',
        schema: SonarFindingSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
