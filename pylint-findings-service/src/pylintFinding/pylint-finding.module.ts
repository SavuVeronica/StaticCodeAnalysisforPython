import { Module } from '@nestjs/common';
import { PylintFindingService } from './pylint-finding.service';
import { PylintFindingController } from './pylint-finding.controller';
import { PylintFindingSchema } from 'src/schemas/PylintFinding.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  ],
  providers: [PylintFindingService],
  controllers: [PylintFindingController],
})
export class PylintFindingModule {}
