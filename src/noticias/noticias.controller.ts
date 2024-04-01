import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notícias')
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto);
  }

  @Get('buscarTodas')
  findAll() {
    return this.noticiasService.buscarTodasNoticias;
  }

  @Get('buscarPor:id')
  findOne(@Param('id') id: string) {
    return this.noticiasService.buscarNoticiaPorId(+id);
  }

  @Patch('atualizar:id')
  update(@Param('id') id: string, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiasService.atualizarNoticia(+id, updateNoticiaDto);
  }

  @Delete('excluir:id')
  remove(@Param('id') id: string) {
    return this.noticiasService.excluirNoticia(+id);
  }
}
