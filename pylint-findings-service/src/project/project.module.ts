import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectSchema } from 'src/schemas/Project.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
