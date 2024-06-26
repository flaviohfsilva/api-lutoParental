import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estados')
@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadosService.create(createEstadoDto);
  }

  @Get('buscarTodos')
  findAll() {
    return this.estadosService.buscarTodos();
  }

  @Get('buscarPor/:id')
  findOne(@Param('id') id: string) {
    return this.estadosService.buscarPorId(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
  //   return this.estadosService.update(+id, updateEstadoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.estadosService.remove(+id);
  // }
}
