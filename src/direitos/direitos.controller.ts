import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DireitosService } from './direitos.service';
import { CreateDireitoDto } from './dto/create-direito.dto';
import { UpdateDireitoDto } from './dto/update-direito.dto';

@Controller('direitos')
export class DireitosController {
  constructor(private readonly direitosService: DireitosService) {}

  @Post()
  create(@Body() createDireitoDto: CreateDireitoDto) {
    return this.direitosService.create(createDireitoDto);
  }

  @Get()
  findAll() {
    return this.direitosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.direitosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDireitoDto: UpdateDireitoDto) {
    return this.direitosService.update(+id, updateDireitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.direitosService.remove(+id);
  }
}
