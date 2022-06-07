import { Module } from '@nestjs/common';
import { SonarFindingService } from './sonar-finding.service';
import { SonarFindingController } from './sonar-finding.controller';
import { SonarFindingSchema } from 'src/schemas/SonarFinding.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: 'SonarFinding',
    //     schema: SonarFindingSchema,
    //   },
    // ]),
  ],
  providers: [SonarFindingService],
  controllers: [SonarFindingController],
})
export class SonarFindingModule {}
