import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PylintFindingDto } from 'src/dtos/pylintFinding.dto';
import { PylintFindingService } from './pylint-finding.service';

@Controller('pylint-finding')
export class PylintFindingController {
  // constructor(private readonly pylintFindingService: PylintFindingService) {}

  // @Get()
  // findAll() {
  //   return this.pylintFindingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id): Promise<PylintFindingDto> {
  //   return this.pylintFindingService.find(Number(id));
  // }

  // @Post()
  // async create(@Body() pylintFinding: PylintFindingDto) {
  //   const newFinding = await this.pylintFindingService.create(pylintFinding);
  //   return newFinding;
  // }

  // @Put(':id')
  // async update(@Param('id') id, @Body() pylintFinding: PylintFindingDto) {
  //   const updatedFinding = await this.pylintFindingService.update(
  //     Number(id),
  //     pylintFinding,
  //   );
  //   return updatedFinding;
  // }

  // @Delete(':id')
  // async delete(@Param('id') id) {
  //   const deletedFinding = await this.pylintFindingService.delete(Number(id));
  //   return deletedFinding;
  // }
}
