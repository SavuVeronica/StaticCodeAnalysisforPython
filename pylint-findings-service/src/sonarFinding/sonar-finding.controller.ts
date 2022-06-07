import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SonarFindingDto } from 'src/dtos/sonarFinding.dto';
import { SonarFindingService } from './sonar-finding.service';

@Controller('sonar-finding')
export class SonarFindingController {
  constructor(private readonly sonarFindingService: SonarFindingService) {}

  // @Get()
  // findAll() {
  //   return this.sonarFindingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id): Promise<SonarFindingDto> {
  //   return this.sonarFindingService.find(Number(id));
  // }

  // @Post()
  // async create(@Body() sonarFinding: SonarFindingDto) {
  //   const newFinding = await this.sonarFindingService.create(sonarFinding);
  //   return newFinding;
  // }

  // @Put(':id')
  // async update(@Param('id') id, @Body() sonarFinding: SonarFindingDto) {
  //   const updatedFinding = await this.sonarFindingService.update(
  //     Number(id),
  //     sonarFinding,
  //   );
  //   return updatedFinding;
  // }

  // @Delete(':id')
  // async delete(@Param('id') id) {
  //   const deletedFinding = await this.sonarFindingService.delete(Number(id));
  //   return deletedFinding;
  // }
}
